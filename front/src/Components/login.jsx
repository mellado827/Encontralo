import React, { useState } from 'react'
import SeePassword from '../Functions/seePassword'
import Swal from 'sweetalert2'
import axiosClient from '../../src/config/axios'
import { withRouter } from 'react-router-dom'

function Login(props) {

    document.title = "Encontralo - Iniciar sesión"

    const [credenciales, guardarCredenciales] = useState({})

    //almacenar inputs en state
    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

    const iniciarSesion = async e => {
        e.preventDefault()

        //autenticar
        try {

            const res = await axiosClient.post('/iniciarsesion', credenciales)
            // console.log(res)
            //extraer el token y colocarlo en localstorage
            const { token } = res.data
            localStorage.setItem('token', token)

            //alerta
            Swal.fire({
                icon: 'success',
                title: 'Has iniciado sesión',
                customClass: {
                    content: 'text_fontstyle'
                }
            })

            props.history.push('/')



        } catch (error) {
            console.log(error.response)
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                customClass: {
                    content: 'text_fontstyle'
                },
                text: error.response.data.mensaje
            })
        }
    }

    return (

        <>

            <div className="loginANDsignup_background height_shared d-flex justify-content-center align-items-center">
                <div className="login_container m-2">
                    <h1 className="subtitle_fontstyle text-center m-3">Inicia sesión</h1>

                    <form
                        className="form_loginANDsignup d-flex justify-content-left"
                        id="login_form">
                        <input type="text"
                            name="email"
                            onChange={leerDatos}
                            placeholder="Correo electrónico"
                            className="size_formitems text_font"
                            id="emailLogin"
                            required />

                        <input
                            name="contrasena"
                            onChange={leerDatos}
                            type="password"
                            placeholder="Contraseña"
                            className="size_formitems text_fontstyle"
                            id="passwordLogin"
                            required />
                        <div className="see_passwordContainer d-flex justify-content-end">
                            <button
                                type="button"
                                id="see_password"
                                onClick={SeePassword}
                                className="d-flex flex-column justify-content-center transparent"
                                title="Ver contraseña">
                                <img src="./img/see_black.png" className="see_passwordIcon" alt="see password" />
                            </button>
                        </div>
                        {/* <span id="passwordValid" className="text_font spanValidators"></span> */}
                    </form>
                    <form>
                        <input type="checkbox" defaultChecked className="m-1" />
                        <label className="text_font">Recordar</label>

                    </form>
                    <div className="login_button d-flex justify-content-center m-1">
                        <button
                            onClick={iniciarSesion}
                            className="text_font"
                            style={{ width: 10 + 'em' }}
                            id="login_button">Iniciar sesión
                    </button>

                    </div>
                    <div className="resetandsignup d-flex justify-content-around m-4 align-items-around">
                        <a className="text_font text-center" href="/registrarse">¿No eres miembro?</a>

                        <a className="text_font text-center" href="/contrasena">Olvidé mi contraseña</a>

                    </div>
                </div>
            </div>
        </>

    )
}


export default withRouter(Login)