import React, { useState } from 'react'
import SeePassword from '../Functions/seePassword'
import axiosClient from '../../src/config/axios'
import Swal from 'sweetalert2'

function Signup() {

    //user = state
    //saveUser = función para guardar state
    const [user, saveUser] = useState({
        nickname: '',
        email: '',
        contrasena: '',
        celular: ''
    })


    // leer los datos del formulario
    const updateState = e => {
        // Almacenar lo que el usuario escribe en el state
        saveUser({
            // obtener una copia del state actual
            ...user,
            [e.target.name]: e.target.value
        })

    }

    document.title = "Encontralo - Registrarse"


    //añade en la API un usuario nuevo
    const addUser = e => {
        e.preventDefault();

        // enviar petición
        axiosClient.post('/usuarios', user)
            .then(res => {

                console.log(res.data.mensaje)

                if (res.data.mensaje === "Usuario ya registrado") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'Usuario ya registrado',
                    })
                } else {
                    Swal.fire(
                        '¡Ya eres parte de Encontralo',
                        res.data.mensaje,
                        'success'
                    )
                }



            }



            );
    }


    //validar formulario 
    const userValidator = () => {
        const { nickname, email, contrasena, celular } = user
        let ok = !nickname.length || !email.length ||
            !contrasena.length || !celular.length

        return ok

    }

    return (
        <>

            <form
                className="loginANDsignup_background height_shared d-flex justify-content-center align-items-center"
                onSubmit={addUser}
            >
                <div className="signup_container m-2">
                    <h1 className="subtitle_fontstyle text-center m-3">Regístrate</h1>
                    <div
                        className="form_loginANDsignup d-flex justify-content-left"
                        id="signup_form"
                    >
                        <input
                            onChange={updateState}
                            name="nickname"
                            type="text"
                            placeholder="Nombre de usuario"
                            className="size_formitems text_fontstyle"
                            id="username"
                        />

                        <input
                            onChange={updateState}
                            name="email"
                            type="email"
                            placeholder="Correo electrónico"
                            className="size_formitems text_fontstyle"
                            id="emailSignUp"
                            required
                        />

                        <input
                            onChange={updateState}
                            name="contrasena"
                            type="password"
                            placeholder="Contraseña"
                            className="size_formitems text_fontstyle"
                            id="passwordLogin"
                            required
                        />

                        <div className="see_passwordContainer d-flex justify-content-end">
                            <button
                                type="button"
                                id="see_password"
                                onClick={SeePassword}
                                className="d-flex flex-column justify-content-center transparent"
                                title="Ver contraseña"
                                required
                            >
                                <img
                                    src="./img/see_black.png"
                                    className="see_passwordIcon"
                                    alt="see password"
                                />
                            </button>
                        </div>

                        <input
                            onChange={updateState}
                            name="celular"
                            type="text"
                            placeholder="Número de celular (+598)"
                            className="size_formitems text_fontstyle"
                            id="user_cellphone"
                            required
                        />

                        <div className="signup_notifications m-1">
                            <input type="checkbox" defaultChecked />
                            <label className="text_font not_text"
                            >Deseo recibir notificaciones sobre animales perdidos y, de
          Encontralo, por correo electrónico.</label
                            >
                        </div>
                    </div>
                    <div className="signup_button d-flex justify-content-center">
                        <button
                            className="call text_font signup_button d-flex justify-content-center m-1"
                            id="signup_button"
                            disabled={userValidator()}
                        >
                            Registrarse
                    </button>
                    </div>
                </div>
            </form>
        </>

    )

}


export default Signup