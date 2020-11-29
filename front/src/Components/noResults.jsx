import React from 'react'
function NoResult(props) {

    return (
        <>
            <div className="d-flex flex-column margin_title">
                <h2 className="title_fontstyle text-center">No hay resultados :(</h2>
                <a className="text_fontstyle text_center" href="/" style={{ textDecoration: "underline" }}>Vuelve a Inicio</a>
            </div>
        </>
    )
}

export default NoResult