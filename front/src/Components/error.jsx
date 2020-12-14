import React from 'react'
import Navbar from './navbar'

const Error = () => (
    <>
        <Navbar />
        <div className="error_container d-flex flex-column justify-content-center align-items-center">
            <img className="notfound_logo" src="../../img/not_found.png" alt="not_found" />
            <h2 className="subtitle_fontstyle text-center mt-3">No se han encontrado resultados :(</h2>
            <a className="text_fontstyle" href="/" style={{ textDecoration: "underline" }}>Volvé a intentar</a>
        </div>
    </>
)

export default Error