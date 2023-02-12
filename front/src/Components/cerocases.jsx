import React from 'react'
import {Link} from 'react-router-dom'

function CeroCases() {

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div className="cerocases_container">

                    <p className="subtitle_fontstyle text-center nocases_text">
                        <i>No hay ningún reporte de desaparición realizado.</i>
                    </p>

                    <div className="d-flex align-items-center text_fontstyle cerocases_buttons">
                        <Link className="cta_bottonsstyle mt-5 mb-5 text_fontstyle" to="/difundir">Reportar</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CeroCases