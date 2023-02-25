import React from 'react'
import {Link} from 'react-router-dom'

const Tutorial = () => (
    <div className="tutorial" id="tutorial">
        <h1 className="title_fontstyle text-center p-5">¿Cómo funciona?</h1>
        <div className="container_tutorialbuttons d-flex align-items-center">
            <div className="form_tutorial overflow_imgtutorials tutorialimages border_radius50 color_tutorialbackground">
                <a href="/" data-toggle="modal" data-target=".bd-example-modal-lg">
                    <img src="./img/form.png" alt="form_logo" />
                </a>
                <div className="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="logoANDclose">
                                <a href="/" data-dismiss="modal">
                                    <img src="./img/close.png" className="close_button" alt="close button" />
                                </a>
                                <img src="./img/black-form.png" className="hiw_logos" alt="form logo" />
                            </div>
                            <h1 className="subtitle_fontstyle text-center">
                                <strong>
                                    <span className="color_numHIW"> 1 - </span>Difundís la desaparición
                                </strong>
                            </h1>
                            <p className="text_fontstyle m-2 text-center">
                                Difundís la desaparición <Link to="/difundir" className="link">clickeando aquí.</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="viral_tutorial overflow_imgtutorials tutorialimages border_radius50 color_tutorialbackground">
                <a href="/" data-toggle="modal" data-target=".bd-example-modal-lg-viral">
                    <img src="./img/viral.png" alt="viral_logo" />
                </a>
                <div className="modal fade bd-example-modal-lg-viral" role="dialog"
                    aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="logoANDclose">
                                <a href="/" data-dismiss="modal">
                                    <img src="./img/close.png" className="close_button" alt="close button" />
                                </a>
                                <img src="./img/black-viral.png" className="hiw_logos" alt="form logo" />
                            </div>

                            <h1 className="subtitle_fontstyle text-center">
                                <strong>
                                    <span className="color_numHIW"> 2 - </span>Nosotros divulgamos la noticia
                                </strong>
                            </h1>
                            <p className="text_fontstyle m-5 text-center">
                                Una vez hecho el formulario, se empieza a divulgar la noticia en distintos grupos de Facebook
                                acerca de rescate de animales de forma automática.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="alerts_tutorial overflow_imgtutorials tutorialimages border_radius50 color_tutorialbackground">
                <a href="/" data-toggle="modal" data-target=".bd-example-modal-lg-alerts">
                    <img src="./img/alerts.png" alt="alerts_logo" />
                </a>
                <div className="modal fade bd-example-modal-lg-alerts" role="dialog"
                    aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="logoANDclose">
                                <a href="/" data-dismiss="modal">
                                    <img src="./img/close.png" className="close_button" alt="close button" />
                                </a>
                                <img src="./img/black-alerts.png" className="alert_logo m-3" alt="form logo" />
                            </div>
                            <h1 className="subtitle_fontstyle text-center">
                                <strong>
                                    <span className="color_numHIW"> 3 - </span>Mantenete alerta
                  </strong>
                            </h1>
                            <p className="text_fontstyle m-5 text-center">
                                Cada caso tiene una sección de comentarios donde distintos usuarios van aportando información.
                </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="founded_tutorial overflow_imgtutorials 
              tutorialimages border_radius50 color_tutorialbackground">
                <a href="/" data-toggle="modal" data-target=".bd-example-modal-lg-founded">
                    <img src="./img/founded.png" alt="founded_logo" />
                </a>
                <div className="modal fade bd-example-modal-lg-founded" role="dialog"
                    aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="logoANDclose">
                                <a href="/" data-dismiss="modal">
                                    <img src="./img/close.png" className="close_button" alt="close button" />
                                </a>
                                <img src="./img/black-founded.png" className="hiw_logos" alt="form logo" />
                            </div>
                            <h1 className="subtitle_fontstyle text-center">
                                <strong>
                                    <span className="color_numHIW"> 4 - </span> ¡Encontrado!
                                 </strong>
                            </h1>
                            <div className="slogan-div-container d-flex justify-content-center">
                                <img src="./img/slogan.png" className="slogan_founded" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)


export default Tutorial