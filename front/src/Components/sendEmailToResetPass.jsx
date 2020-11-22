import React, { useState } from 'react'
import axiosClient from '../config/axios'
import Swal from 'sweetalert2'

function SendEmailToResetPass(props) {

    document.title = "Encontralo - Cambiar contraseña"

    const token = localStorage.getItem("token")

    const goBack = e => {
        e.preventDefault()
        window.history.back()
    }

    const [email, setEmail] = useState('')

    const guardarEmail = e => {
        setEmail(e.target.value)
    }

    const enviarPeticion = async e => {
        e.preventDefault()
        try {
            if (!email) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups! Parece que hay un problema.',
                    text: 'Ingresa un email para poder recuperar tu cuenta.',
                    customClass: {
                        content: 'text_fontstyle'
                    }
                })
            } else {

                Swal.fire({
                    icon: 'warning',
                    title: 'Enviando petición...'
                })

                const peticion = await axiosClient.put(`/usuarios/${email}`)

                if (peticion.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Correo enviado!',
                        text: 'Pegale una revisada a tu correo electrónico, te enviamos un link para que recuperes la clave. ¡Suerte!',
                        customClass: {
                            content: 'text_fontstyle'
                        }
                    })
                }

            }

        } catch (error) {
            if (error.message === "Request failed with status code 404") {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups! Parece que hay un problema.',
                    text: 'No existe ningún usuario con ese email. Intentalo de nuevo',
                    customClass: {
                        content: 'text_fontstyle'
                    }
                })
            }
        }
    }

    return (
        <>
            {token ? props.history.push('/contrasena') :
                <div className="loginANDsignup_background height_shared d-flex justify-content-center align-items-center">
                    <form className="reset-pass_container d-flex flex-column align-content-center" id="password_form">
                        <h1 className="subtitle_fontstyle text-center mt-5">
                            Restablecer contraseña
                    </h1>
                        <p className="text_fontstyle text-center m-3">Tenemos que asegurarnos que seas el titular de la cuenta,
                        por esto te pedimos que ingreses tu email (el que usaste para registrarte en Encontralo)
                    así te enviamos un link para que puedas cambiar la contraseña.</p>
                        <div className="p-5 d-flex justify-content-center">
                            <input type="email" placeholder="Ingresa tu email"
                                className="text_fontstyle" onChange={guardarEmail} />
                        </div>
                        <div className="olvidemicontrasena_botones">
                            <button className="cta_bottonsstyle m-3 text_fontstyle" onClick={enviarPeticion}>Enviar petición</button>
                            <button className="cta_bottonsstyle m-3 text_fontstyle" onClick={goBack}>Volver</button>
                        </div>
                    </form>
                </div>}

        </>
    )
}

export default SendEmailToResetPass