import React from 'react'
import { Link } from 'react-router-dom'

function NoResult() {

    return (
        <>
            <div className="d-flex flex-column margin_title">
                <h2 className="title_fontstyle text-center">No hay resultados :(</h2>
                <Link className="text_fontstyle text_center" to="/" style={{ textDecoration: "underline" }}>Vuelve a Inicio</Link>
            </div>
        </>
    )
}

export default NoResult