import React, { useState, useEffect } from 'react'
import EnableInput from '../Functions/enableInputs'
import GoBack from '../Functions/goBack'
import Blank from '../Functions/blank'
import PersonalData from '../Functions/personalData'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import PersonalInfoAPI from './PersonalInfoAPI'
import axiosClient from '../config/axios'

function PersonalInfo(props) {

    window.onbeforeunload = function () {
        return "";
    };

    document.title = "Encontralo / Datos personales"

    var current_time = Date.now() / 1000;
    const token = localStorage.getItem("token")

    if (token !== null) {

        var decodedData = jwt_decode(token)

        if (decodedData.exp < current_time) {
            window.location.reload()
            localStorage.removeItem("token")
            Swal.fire({
                icon: 'warning',
                title: 'Ha expirado tu sesión',
                customClass: {
                    content: 'text_fontstyle'
                },
                text: 'Por cuestiones de seguridad, la sesión dura una hora. ¡Vuelve a iniciar si deseas!'
            })
        }
    }

    const [usuarios, guardarUsuarios] = useState([])

    useEffect(() => {

        if (token !== null) {
            const consultarAPI = () => {
                try {
                    const clienteConsulta = axiosClient.get('/usuarios', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                    guardarUsuarios(clienteConsulta.data)

                } catch (error) {
                    // Error con autorización
                    if (error.response.status = 500) {
                        props.history.push('/iniciarsesion')
                    }
                }

            }

            consultarAPI()
        }
        else {
            props.history.push('/iniciarsesion')
        }


    }, [usuarios])

    const eliminarUsuario = () => {
        if (token !== null) {
            try {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "No podrás volver a usar esta cuenta",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    customClass: {
                        content: 'text_fontstyle'
                    },
                    confirmButtonText: 'Borrar cuenta'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const eliminarUsuario = await axiosClient.delete(`/usuarios/${decodedData._id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })

                        if (eliminarUsuario.status === 200) {
                            Swal.fire({
                                title: 'Cuenta borrada',
                                text: '¡Hasta la próxima!',
                                icon: 'success',
                                customClass: {
                                    content: 'text_fontstyle'
                                },
                            })

                            setTimeout(() => {
                                localStorage.removeItem("token")
                                props.history.push('/iniciarsesion')
                            }, 1500);

                        } else {
                            Swal.fire({
                                title: 'Hubo un error',
                                text: 'Inténtalo de nuevo más tarde',
                                icon: 'error',
                                customClass: {
                                    content: 'text_fontstyle'
                                },
                            })
                        }
                    }
                })

            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: 'Hubo un error',
                    text: 'Inténtalo de nuevo más tarde',
                    icon: 'error',
                    customClass: {
                        content: 'text_fontstyle'
                    },
                })
            }
        }
    }


    return (
        <>

            <div className="loginANDsignup_background height_shared d-flex justify-content-center align-items-center">
                <div className="personaldata" id="personaldata">
                    <h1 className="subtitle_fontstyle text-center m-3">Datos personales</h1>
                    <p className="text_fontstyle text-center gray_color">
                        Ve tus datos personales o, actualízalos.
                        </p>

                    < PersonalInfoAPI />

                    <div className="personalinfo_buttons d-flex flex-column">

                        <button type="button" className="text_fontstyle m-5 cta_bottonsstyle cta_bottonsstyle-green" onClick={GoBack}>
                            Volver
                            </button>

                        <button type="button"
                            onClick={eliminarUsuario}
                            className="text_fontstyle m-5 cta_bottonsstyle cta_bottonstyle-red">
                            Borrar cuenta
                            </button>

                    </div>
                </div>
            </div>

        </>
    )

}

export default PersonalInfo


