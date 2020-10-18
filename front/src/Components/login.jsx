import React, { useState, useContext } from 'react'
import SeePassword from '../Functions/seePassword'
import Swal from 'sweetalert2'
import axiosClient from '../../src/config/axios'
import { withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

//Context
import { CRMContext } from '../context/CRMContext'

function Login(props) {

    //Auth y token
    const [auth, guardarAuth] = useContext(CRMContext)

    const [credenciales, guardarCredenciales] = useState({})

    document.title = "Encontralo - Iniciar sesión"

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
            //extraer el token y colocarlo en localstorage
            const { token } = res.data
            localStorage.setItem('token', token)

            //colocarlo en el state
            guardarAuth({
                token: token,
                auth: true
            })

            // let infoUsuario = jwt_decode(token)
            // console.log(infoUsuario)

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
            console.log(error)
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
                        onSubmit={iniciarSesion}
                        className="form_loginANDsignup d-flex justify-content-center"
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
                        <div className="login_button d-flex m-1">
                            <button
                                className="text_font"
                                style={{ width: 10 + 'em' }}
                                id="login_button">Iniciar sesión
                            </button>
                        </div>
                    </form>
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