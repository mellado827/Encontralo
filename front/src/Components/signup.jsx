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

    function redirectToPreviousPage() {
        setTimeout(function () { window.history.back() }, 1500);
    }


    function areYouSure() {
        window.onbeforeunload = function () {
            return "";
        };
    }

    areYouSure()


    //añade en la API un usuario nuevo
    const addUser = e => {
        e.preventDefault();

        // enviar petición
      axiosClient.post('/usuarios', user)
            .then(res => {

                if (res.data.includes("ya está en uso")) {
                    Swal.fire({
                        title: 'Hubo un error',
                        icon: 'error',
                        text: res.data.mensaje,
                        customClass: {
                            content: 'text_fontstyle'
                        }
                    })
                } else {
                    Swal.fire({
                        title: '¡Ya eres parte de Encontralo!',
                        text: res.data.mensaje,
                        icon: 'success',
                        customClass: {
                            content: 'text_fontstyle'
                        }
                    }
                    )
                    redirectToPreviousPage()

                }



            }



            );
    }


    window.addEventListener("load", function () {
        document.getElementById("user_cellphone").addEventListener("keypress", justNumbers, false);
    });

    //Solo números
    function justNumbers(e) {
        var key = window.event ? e.which : e.keyCode;
        if (key < 48 || key > 57) {
            e.preventDefault();
        }
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
                id="user_for"
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
                            maxLength="9"
                            required
                        />

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