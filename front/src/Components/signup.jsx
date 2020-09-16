import React, { useState } from 'react'
import SeePassword from '../Functions/seePassword'
import UsernameValidation from '../Functions/usernameValidation'
import ValidateEmail from '../Functions/validateEmail'
import CellphoneValidation from '../Functions/cellphoneValidation'
import axiosClient from '../../src/config/axios'
// import finalValidationSignUp from '../Functions/finalValidationSignUp'

function Signup() {

    //user = state
    //saveUser = función para guardar state
    const [user, saveUser] = useState({
        nickname: '',
        email: '',
        contrasena: '',
        celular: ''
    })

    //leer datos de form
    const updateState = e => {
        //almacenar lo que escribe
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        })

        console.log(user)
    }


    document.title = "Encontralo - Registrarse"


    //añade en la API un usuario nuevo
    const addUser = e => {
        e.preventDefault()

        //enviar petición a axios
        axiosClient.post('/usuarios', user)
            .then(res => {
                console.log(res)
            })
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
                            onKeyDown={UsernameValidation}
                        />

                        <span id="validUser" className="text_font spanValidators"></span>
                        <input
                            onChange={updateState}
                            name="email"
                            type="email"
                            placeholder="Correo electrónico"
                            className="size_formitems text_fontstyle"
                            id="emailSignUp"
                            onKeyDown={ValidateEmail}
                            required
                        />

                        <span id="signUpEmailValid" className="text_font spanValidators"></span>
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
                        <span id="passwordValid" className="text_font spanValidators"></span>

                        <input
                            onChange={updateState}
                            name="celular"
                            type="text"
                            placeholder="Número de celular (+598)"
                            className="size_formitems text_fontstyle"
                            id="user_cellphone"
                            // value={this.state.value}
                            // onChange={this.onlyNumber}
                            onKeyDown={CellphoneValidation}
                            required
                        />

                        <span id="cellphoneValid" className="text_font spanValidators"></span>
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