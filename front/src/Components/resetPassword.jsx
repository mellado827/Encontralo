import React, { useState, useEffect } from 'react'
import axiosClient from '../config/axios'
import GoBack from '../Functions/goBack'
import SeePasswordPage2 from '../Functions/seePasswordPage2'
import SeePasswordPage3 from '../Functions/seePasswordPage3'


function ResetPassword(props) {
    const email = props.match.params.email

    // const [usuarioACambiarPass, SetusuarioACambiarPass] = useState([])

    // const consultaPorEdit = async () => {
    //     const consulta = await axiosClient.put(`/usuarios/${email}`)
    //     SetusuarioACambiarPass(consulta.data)
    // }

    // useEffect(() => {
    //     consultaPorEdit()
    // }, [])

    document.title = "Encontralo - Cambiar contraseña"

    const [contrasenas, guardarContrasenas] = useState({
    })

    const actualizarState = e => {
        guardarContrasenas({
            ...contrasenas,
            [e.target.name]: e.target.value
        })
    }

    console.log(contrasenas)

    return (
        <>
            <div className="loginANDsignup_background height_shared d-flex justify-content-center align-items-center">
                <form className="reset-pass_container" id="password_form">
                    <h1 className="subtitle_fontstyle text-center m-3">
                        Restablecer contraseña
      </h1>

                    <p id="passwordValidator" className="text_font text-center m-5"></p>
                    <div className="text-center mt-4 new_pass">
                        <p className="text_fontstyle"><u>Nueva contraseña</u></p>
                        <input type="password"
                            name="NewPassword"
                            id="new_password"
                            onChange={actualizarState}
                            className="text_fontstyle"
                        />
                        <button type="button"
                            id="see_password2"
                            onClick={SeePasswordPage2}
                            className=" see_password transparent"
                            title="Ver contraseña"
                            required>
                            <img src="../../img/see_black.png" className="see_passwordIcon" alt="see password" />
                        </button>
                    </div>

                    <div className="text-center mt-4 confirm-new_pass">
                        <p className="text_fontstyle"><u>Confirma la nueva contraseña</u></p>
                        <input type="password"
                            name="ConfirmedPassword"
                            id="confirm_new_password"
                            onChange={actualizarState}
                            className="text_fontstyle" />
                        <button type="button"
                            id="see_password3"
                            className=" see_password transparent"
                            onClick={SeePasswordPage3}
                            title="Ver contraseña"
                            required>
                            <img src="../../img/see_black.png" className="see_passwordIcon" alt="see password" />
                        </button>
                    </div>
                    <div className="password_buttons d-flex mt-5 mb-3 align-self-center">
                        <button type="button"
                            className="text_fontstyle cta_bottonsstyle space_passB"
                            id="reset_pass_confirm"
                        // onClick={passwords}
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

export default ResetPassword