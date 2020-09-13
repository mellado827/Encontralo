import React from 'react'
import GoBack from '../Functions/goBack'
import SeePasswordPage1 from '../Functions/seePasswordPage1'
import SeePasswordPage2 from '../Functions/seePasswordPage2'
import SeePasswordPage3 from '../Functions/seePasswordPage3'
import PasswordSyntaxisPage from '../Functions/PasswordSyntaxisPage'
import Quit from '../Functions/quit'

class Password extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        document.title = "Encontralo - Cambiar contraseña"
        Quit()
    }

    render() {
        return (
            <>
                <div className="loginANDsignup_background height_shared d-flex justify-content-center align-items-center">
                    <form className="reset-pass_container" id="password_form">
                        <h1 className="subtitle_fontstyle text-center m-3">
                            Restablecer contraseña
      </h1>
                        <p className="text_fontstyle gray_color text-center">
                            Al resetear la contraseña, se le enviará un correo electrónico con los
                            datos del cambio de contraseña (fecha del cambio, hora, equipo desde
                            donde se realizó el cambio, etc) por temas de seguridad.
        <strong> Si tiene problemas para cambiar la contraseña,
          <a href="/" className="link"> contáctenos</a>.
        </strong>
                        </p>
                        <p className="text_fontstyle gray_color text-center">
                            Su contraseña debe tener, al menos: 8 caracteres, una mayúscula y un número.
                            No puede contener espacios en
        blanco. Ejemplo: <strong>Encontralo123</strong>
                        </p>
                        <p id="passwordValidator" className="text_font text-center m-5"></p>
                        <div className="text-center mt-4 actual_pass">
                            <p className="text_fontstyle"><u>Contraseña actual</u></p>
                            <input type="password"
                                id="current_password"

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
                                id="new_password"
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
                                id="confirm_new_password"
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
                        <div className="password_buttons d-flex mt-3 mb-3 align-self-center">
                            <button type="button"
                                className="text_fontstyle cta_bottonsstyle space_passB"
                                data-toggle="modal"
                                onClick={PasswordSyntaxisPage}
                                data-target="#reset_pass-confirm"
                                data-dismiss="modal"
                                id="reset_pass_confirm"
                            >
                                Cambiar contraseña
        </button>
                            <button type="button"
                                className="text_fontstyle cta_bottonsstyle cta_bottonsstyle-green"
                                onClick={GoBack}
                            >
                                Volver
        </button>

                            <div id="reset_pass-confirm" className="modal fade" role="dialog">
                                <div className="modal-dialog">

                                    <div className="modal-content" id="areyousure_passwordModal">

                                        <div className="modal-header modal_background">
                                            <h1 className="modal-title subtitle_fontstyle text-center">
                                                <strong>¿Seguro qué quieres cambiar tu contraseña?</strong>
                                            </h1>
                                        </div>
                                        <div className="modal-body d-flex text_fontstyle text-center modal_background" >
                                            <button type="button" className="text_fontstyle cta_bottonsstyle" data-toggle="modal"
                                                data-target="#save_changes-confirmed">
                                                Si
                                            </button>
                                            <button type="button" className="text_fontstyle cta_bottonsstyle cta_bottonsstyle-green margin_top"
                                                data-dismiss="modal">
                                                No
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default Password