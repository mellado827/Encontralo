import React from 'react'
import {Link} from 'react-router-dom'

function Contact() {
    return (
    <>
        <div className="contact d-flex flex-column align-items-center" id="contact">
            <h1 className="title_fontstyle text-center p-5">Contacto</h1>
            <p className="text_fontstyle text-center"> ¡Estamos abiertos a nuevas ideas, nuevos integrantes y más! <strong> No seas tímid@.</strong></p>
            <div className="sm d-flex flex-row">
                <Link className="socialmedia d-flex justify-content-center m-3" to="/formulario"
                    title="Formulario">
                    <img className="m-3" src="./img/email.png" alt="Formulario" />
                </Link>
            </div>
        </div>
    </>
    )
}

export default Contact