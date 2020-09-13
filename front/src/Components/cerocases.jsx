import React from 'react'
import Navbar from './navbar'

const CeroCases = () => (
    <>
        <Navbar />
        <div className="report d-flex justify-content-center align-items-center">
            <div className="cerocases_container">
                <h1 className="text-center title_fontstyle cerocases_title">
                    <strong>Mis casos</strong>
                </h1>

                <p className="subtitle_fontstyle text-center nocases_text">
                    <i>Usted no ha reportado ninguna desaparición.</i>
                </p>

                <div className="d-flex align-items-center text_fontstyle cerocases_buttons">
                    <button type="button" className="cta_bottonsstyle mt-5 mb-5 text_fontstyle">Reportar</button>
                    <button type="button"
                        className="cta_bottonsstyle cta_bottonsstyle-green mt-5 mb-5 text_fontstyle"
                        onclick="goBack()">Volver</button>
                </div>
            </div>
        </div>
    </>
)

export default CeroCases