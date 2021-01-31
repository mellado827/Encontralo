import React from 'react'
import {Link} from 'react-router-dom'

const Contact = () => (
    <>
        <div className="contact d-flex flex-column align-items-center" id="contact">
            <h1 className="title_fontstyle text-center p-5">Contacto</h1>
            <p className="text_fontstyle text-center m-2">
                Si querés conocer más sobre el creador, lo podés encontrar en las
                siguientes redes sociales:
            </p>
            <div className="sm d-flex flex-row">
                <a className="socialmedia d-flex justify-content-center m-3"
                    href="https://www.linkedin.com/in/nicol%C3%A1s-mellado-800413151/" target="blank" title="LinkedIn">
                    <img className="m-3" src="./img/linkedin_logo.png" alt="linkedin_logo" />
                </a>
                <a className="socialmedia d-flex justify-content-center m-3" href="https://www.twitter.com/mellado827"
                    target="blank" title="Twitter">
                    <img className="m-3" src="./img/twitter_logo.png" alt="twitter_logo" />
                </a>
            </div>
            <p className="text_fontstyle text-center">
                Si querés unirte a Encontralo, brindar alguna idea o demás, ¡Estamos
                abiertos!
                <strong> Don't be shy.</strong>
            </p>
            <div className="sm d-flex flex-row">
                <Link className="socialmedia d-flex justify-content-center m-3" to="/formulario"
                    title="Formulario">
                    <img className="m-3" src="./img/email.png" alt="Formulario" />
                </Link>
            </div>
        </div>
    </>
)

export default Contact