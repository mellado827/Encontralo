import React from 'react'

const About = () => (
    <>
        <div className="containerAC">
            <div className="about d-flex flex-column align-items-center" id="about">
                <h1 className="title_fontstyle text-center p-5">Acerca de Encontralo</h1>
                <p className="text_fontstyle text-center m-2">Nuestra <u>misión</u> es hacer posible ese preciado reencuentro.
                    <i>La calle no es hogar para nadie.</i>
                </p>
                <p className="text_fontstyle text-center m-2">
                    El creador del sitio web es <u>Nicolás Mellado</u>, oriundo de Montevideo, Uruguay.</p>
                <p className="text_fontstyle text-center m-2">¡Seguinos en nuestras redes sociales!</p>
                <div className="sm d-flex flex-row">
                    <a className="socialmedia d-flex justify-content-center m-3" href="https://www.facebook.com/encontraloUY" target="blank"
                        title="Facebook">
                        <img className="m-3" src="./img/facebook_logo.png" alt="facebook_logo" />
                    </a>
                    <a className="socialmedia d-flex justify-content-center m-3"
                        href="https://www.instagram.com/encontralo_uy"
                        target="blank"
                        title="Instagram">
                        <img className="m-3" src="./img/instagram_logo.png" alt="instagram_logo" />
                    </a>
                </div>
            </div>
        </div>
    </>
)

export default About