import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import axiosClient from '../config/axios'
import { withRouter } from 'react-router-dom'

function PersonalInfoAPI(props) {

    window.onbeforeunload = function () {
        return "";
    };

    //mostrar datos personales si el usuario está logueado
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

    const [valor, setValor] = useState('')

    const nuevoValor = e => {
        setValor(e.target.value)
        console.log(valor)
    }

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


    const [usuario, datosUsuario] = useState({
        nickname: '',
        email: '',
        celular: ''
    })

    const consultaPorEdit = async () => {
        const consulta = await axiosClient.get(`/usuarios/${decodedData._id ? decodedData._id : ``}`)

        datosUsuario(consulta.data)
    }

    useEffect(() => {
        consultaPorEdit()
    }, [])

    const actualizarState = e => {
        datosUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        })
    }

    const actualizarUsuario = e => {
        e.preventDefault()


        axiosClient.put(`/usuarios/${decodedData._id ? decodedData._id : ``}`, usuario)
            .then(res => {


                Swal.fire({
                    title: '¿Estás seguro?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    customClass: {
                        content: 'text_fontstyle'
                    },
                    confirmButtonText: 'Actualizar'
                }).then((result) => {
                    if (result.isConfirmed) {

                        Swal.fire({
                            icon: 'success',
                            title: 'Datos actualizados correctamente',
                            customClass: {
                                content: 'text_fontstyle'
                            }
                        })

                        setTimeout(() => {
                            window.location.reload()
                        }, 1500);


                    }
                })

            })

    }

    return (
        <>

            <div className="text-center personaldata_item">
                <p className="text_fontstyle"><u>Nombre de usuario</u></p>
                <input
                    disabled
                    type="text"
                    name="nickname"
                    onChange={actualizarState}
                    id="username_personalinfo"
                    placeholder={usuario.nickname ? usuario.nickname : ``}
                    className="text_fontstyle" />
                <span id="usernameValid" className="text_font cellphoneValidStyles text-center"></span>
            </div>
            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Email</u></p>
                <input type="text"
                    name="email"
                    onChange={actualizarState}
                    id="email_personalinfo"
                    placeholder={usuario.email ? usuario.email : ``}
                    className="text_fontstyle"
                    disabled />
                <span id="emailValid_personalinfo" className="text_font cellphoneValidStyles text-center"></span>
            </div>
            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Contraseña</u></p>
                <input type="password" className="margin_closebutton" disabled />
                <a href="/contrasena">
                    <img src="./img/closed.png" alt="edit" className="modify_button" />
                </a>
            </div>

            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Número de celular</u></p>
                <input type="text"
                    onChange={actualizarState}
                    name="celular"
                    placeholder={usuario.celular ? usuario.celular : ``}
                    id="cellphone_personalinfo"
                    disabled
                    className="text_fontstyle" />
            </div>

            <div className="d-flex text-center mt-4 justify-content-center">
                <button type="button"
                    className="text_fontstyle m-5 cta_bottonsstyle"
                    onClick={actualizarUsuario}
                    id="savechanges_personalinfo">
                    Guardar cambios
                </button>
            </div>




        </>
    )
}

export default withRouter(PersonalInfoAPI)