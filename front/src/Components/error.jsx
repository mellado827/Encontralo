import React from 'react'
import Navbar from './navbar'
import { withRouter, Link } from 'react-router-dom'


const Error = () => (
    <>
        <Navbar />
        <div className="error_container d-flex flex-column justify-content-center align-items-center">
            <img className="notfound_logo" src="../../img/not_found.png" alt="not_found" />
            <h2 className="subtitle_fontstyle text-center mt-3">No se han encontrado resultados :(</h2>
            <Link className="text_fontstyle" to="/" style={{ textDecoration: "underline" }}>Volvé a intentar</Link>
        </div>
    </>
)

export default Error