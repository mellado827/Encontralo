import React from 'react'
import SeePassword from '../Functions/seePassword'
import UsernameValidation from '../Functions/usernameValidation'
import ValidateEmail from '../Functions/validateEmail'
import ValidatePassword from '../Functions/validatePassword'
import CellphoneValidation from '../Functions/cellphoneValidation'
import finalValidationSignUp from '../Functions/finalValidationSignUp'

class Signup extends React.Component {

    constructor() {
        super();
        this.state = { value: '' };
        this.onlyNumber = this.onlyNumber.bind(this)
    }

    onlyNumber(e) {
        const syntaxis = /^[0-9\b]+$/;
        if (e.target.value === '' || syntaxis.test(e.target.value)) {
            this.setState({ value: e.target.value })
        }
    }

    componentDidMount() {
        document.title = "Encontralo - Registrarse"
    }

    render() {
        return (
            <div
                className="loginANDsignup_background height_shared d-flex justify-content-center align-items-center"
            >
                <div className="signup_container m-2">
                    <h1 className="subtitle_fontstyle text-center m-3">Regístrate</h1>
                    <form
                        className="form_loginANDsignup d-flex justify-content-left"
                        id="signup_form"
                    >
                        <input
                            type="text"
                            placeholder="Nombre de usuario"
                            className="size_formitems text_fontstyle"
                            id="username"
                            onKeyDown={UsernameValidation}
                        />

                        <span id="validUser" className="text_font spanValidators"></span>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="size_formitems text_fontstyle"
                            id="emailSignUp"
                            onKeyDown={ValidateEmail}
                            required
                        />

                        <span id="signUpEmailValid" className="text_font spanValidators"></span>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="size_formitems text_fontstyle"
                            id="passwordLogin"
                            onKeyDown={ValidatePassword}
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
                        <span
                            className="text-center gray_color text_font"
                            id="passwordSyntaxisAclaration"
                        >
                            Su contraseña debe tener al menos 8 caracteres, una mayúscula y un
                            número.
          </span>
                        <input
                            type="text"
                            placeholder="Número de celular (+598)"
                            className="size_formitems text_fontstyle"
                            id="user_cellphone"
                            value={this.state.value}
                            onChange={this.onlyNumber}
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
                    </form>
                    <div className="signup_button d-flex justify-content-center">
                        <button
                            onClick={finalValidationSignUp}
                            className="call text_font signup_button d-flex justify-content-center m-1"
                            id="signup_button"
                        >
                            Registrarse
                        </button>
                    </div>
                </div>
            </div>

        )

    }
}

export default Signup