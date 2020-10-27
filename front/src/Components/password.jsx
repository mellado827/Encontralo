import React, { useState, useEffect } from 'react'
import axiosClient from '../config/axios'
import GoBack from '../Functions/goBack'
import SeePasswordPage1 from '../Functions/seePasswordPage1'
import SeePasswordPage2 from '../Functions/seePasswordPage2'
import SeePasswordPage3 from '../Functions/seePasswordPage3'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import Quit from '../Functions/quit'
import bcrypt from 'bcryptjs'

function Password(props) {

    document.title = "Encontralo - Cambiar contraseña"
    Quit()

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

    const consultaPorEdit = async () => {
        const consulta = await axiosClient.get(`/usuarios/${decodedData._id != undefined ? decodedData._id : ``}`)
        datosUsuario(consulta.data)
    }

    useEffect(() => {
        consultaPorEdit()
    }, [])

    const [usuario, datosUsuario] = useState({})

    const [contrasenas, guardarContrasenas] = useState({
    })

    const actualizarState = e => {
        guardarContrasenas({
            ...contrasenas,
            [e.target.name]: e.target.value,
            contraseñaDelLogin: usuario.contrasena
        })
    }

    const contrasenaDB = usuario.contrasena

    const passwords = e => {
        e.preventDefault();

        try {
            // enviar petición
            axiosClient.put(`/usuarios/${decodedData._id ? decodedData._id : ``}`, contrasenas)
                .then(res => {
                    if (res.data.mensaje === false) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Contraseña actual inválida, inténtalo de nuevo.',
                            customClass: {
                                content: 'text_fontstyle'
                            }
                        })
                    } else {
                        console.log("Contraseña actual correcta")
                    }
                }
                );
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="loginANDsignup_background height_shared d-flex justify-content-center align-items-center">
                <form className="reset-pass_container" id="password_form">
                    <h1 className="subtitle_fontstyle text-center m-3">
                        Restablecer contraseña
      </h1>

                    <p id="passwordValidator" className="text_font text-center m-5"></p>
                    <div className="text-center mt-4 actual_pass">
                        <p className="text_fontstyle"><u>Contraseña actual</u></p>
                        <input type="password"
                            id="current_password"
                            name="ContraseñaActual"
                            onChange={actualizarState}
                            className="text_fontstyle" />
                        <button type="button" id="see_password1"
                            className=" see_password transparent"
                            onClick={SeePasswordPage1}
                            title="Ver contraseña"
                            required>
                            <img src="./img/see_black.png" className="see_passwordIcon" alt="see password" />
                        </button>
                    </div>

                    <div className="text-center mt-4 new_pass">
                        <p className="text_fontstyle"><u>Nueva contraseña</u></p>
                        <input type="password"
                            name="Contraseña nueva"
                            id="new_password"
                            // onChange={actualizarState}
                            className="text_fontstyle"
                        />
                        <button type="button"
                            id="see_password2"
                            onClick={SeePasswordPage2}
                            className=" see_password transparent"
                            title="Ver contraseña"
                            required>
                            <img src="./img/see_black.png" className="see_passwordIcon" alt="see password" />
                        </button>
                    </div>

                    <div className="text-center mt-4 confirm-new_pass">
                        <p className="text_fontstyle"><u>Confirma la nueva contraseña</u></p>
                        <input type="password"
                            name="Contraseña nueva confirmada"
                            id="confirm_new_password"
                            // onChange={actualizarState}
                            className="text_fontstyle" />
                        <button type="button"
                            id="see_password3"
                            className=" see_password transparent"
                            onClick={SeePasswordPage3}
                            title="Ver contraseña"
                            required>
                            <img src="./img/see_black.png" className="see_passwordIcon" alt="see password" />
                        </button>
                    </div>
                    <div className="password_buttons d-flex mt-5 mb-3 align-self-center">
                        <button type="button"
                            className="text_fontstyle cta_bottonsstyle space_passB"
                            id="reset_pass_confirm"
                            onClick={passwords}
                        >
                            Cambiar contraseña
        </button>
                        <button type="button"
                            className="text_fontstyle cta_bottonsstyle cta_bottonsstyle-green"
                            onClick={GoBack}
                        >
                            Volver
        </button>

                    </div>
                </form>
            </div>
        </>
    )
}

export default Password