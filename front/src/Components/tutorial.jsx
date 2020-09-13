import React from 'react'

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
                                    <span className="color_numHIW"> 1 - </span>Reportas la desaparición
                                </strong>
                            </h1>
                            <p className="text_fontstyle m-5 text-center">
                                Para poder reportar la desaparición, tienes que <a href="login.html" className="link">iniciar sesión</a> (si no tienes cuenta,
                  <a href="/registrarse" className="link"> registrarte</a>) con tu cuenta de Encontralo.
                </p>
                            <p className="text_fontstyle m-2 text-center">
                                Una vez iniciada la sesión, tienes que <a href="report.html" className="link">crear un reporte de
                    desaparición</a>.
                </p>
                            <p className="text_fontstyle m-5 text-center">
                                Con el reporte ya creado, puedes: modificar sus datos, dar de
                  baja el caso y/o darlo como <u>encontrado</u>.
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
                                Una vez hecho el formulario, se empieza a divulgar la noticia. Lo que hace
                  Encontralo es que, al reportarse una desaparición, <u>automáticamente se
                    comparte por distintos sitios</u>, como por ejemplo: grupos de Facebook acerca de rescate de animales,
                  las redes sociales de Encontralo, enviamos emails a
                  ciertas veterinarias que puedan compartir el aviso, ciertos rescatistas, entre otros.
                </p>
                            <p className="text_fontstyle m-2 text-center">
                                <u>Al ser automático, ¡No tienes que preocuparte por nada!</u>
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
                                    <span className="color_numHIW"> 3 - </span>Mantente alerta
                  </strong>
                            </h1>
                            <p className="text_fontstyle m-5 text-center">
                                Nosotros <u>recomendamos activar las notificaciones</u> respecto al progreso
                  (avisos vía email o WhatsApp). Dichas notificaciones se pueden activar al crear el reporte de
                  desaparición o, al editarlo, en caso de que ya lo hayas creado.
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