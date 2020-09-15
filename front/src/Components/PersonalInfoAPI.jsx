import React from 'react'

function PersonalInfoAPI() {
    return (
        <>

            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Nombre de usuario</u></p>
                <input disabled type="text" id="username_personalinfo" placeholder="username"
                    className="text_fontstyle" />
                <span id="usernameValid" className="text_font cellphoneValidStyles text-center"></span>
            </div>
            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Email</u></p>
                <input type="text" id="email_personalinfo" placeholder="email" className="text_fontstyle"
                    disabled />
                <span id="emailValid_personalinfo" className="text_font cellphoneValidStyles text-center"></span>
            </div>
            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Contraseña</u></p>
                <input type="password" className="margin_closebutton" disabled />
                <a href="/contrasena">
                    <img src="./img/closed.png" alt="edit" className="modify_button" />
                </a>
            </div>

            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Número de celular</u></p>
                <input type="text"
                    placeholder="cellphone"
                    // value={user}
                    // onChange={this.onlyNumber}
                    id="cellphone_personalinfo"
                    disabled
                    className="text_fontstyle" />
            </div>



        </>
    )
}

export default PersonalInfoAPI