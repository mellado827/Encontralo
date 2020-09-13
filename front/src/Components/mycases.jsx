import React from 'react'
import Navbar from './navbar'
import GoBack from '../Functions/goBack'

class MyCases extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        document.title = "Encontralo - Mis casos"
    }


    render() {
        return (
            <>
                <Navbar />

                <div className="search search_container">

                    <h1 className="text-center subtitle_fontstyle cerocases_title">
                        <strong>Mis casos</strong>
                    </h1>
                    <section className="pets_container mt-5">
                        <div className="pet1 flex-column">

                            <div className="pet_photo d-flex justify-content-around">
                                <div className="see_petreport">
                                    <a href="/">
                                        <img src="./img/see.png" alt="see report" title="Ver caso" />
                                    </a>
                                </div>
                                <div className="see_petreport found_case" data-toggle="modal" data-target="#founded">
                                    <a href="/">
                                        <img src="./img/check.png" alt="see report" title="¿Encontrado?" />
                                    </a>
                                </div>
                                <div className="see_petreport delete_case">
                                    <a href="/" data-toggle="modal" data-target="#delete_case">
                                        <img src="./img/bin.png" alt="see report" title="Borrar caso" />
                                    </a>
                                </div>
                            </div>

                            <div className="petinfo m-1">
                                <h2 className="text_fontstyle text-center m-2"><strong>Pet name</strong></h2>
                                <p className="text_fontstyle text-center">Race, genre, age and the disappearance place</p>
                            </div>
                        </div>

                        <div className="pet1 flex-column">

                            <div className="pet_photo d-flex justify-content-around">
                                <div className="see_petreport">
                                    <a href="/">
                                        <img src="./img/see.png" alt="see report" title="Ver caso" />
                                    </a>
                                </div>
                                <div className="see_petreport found_case" data-toggle="modal" data-target="#founded">
                                    <a href="/">
                                        <img src="./img/check.png" alt="see report" title="¿Encontrado?" />
                                    </a>
                                </div>
                                <div className="see_petreport delete_case">
                                    <a href="/" data-toggle="modal" data-target="#delete_case">
                                        <img src="./img/bin.png" alt="see report" title="Borrar caso" />
                                    </a>
                                </div>
                            </div>

                            <div className="petinfo m-1">
                                <h2 className="text_fontstyle text-center m-2"><strong>Pet name</strong></h2>
                                <p className="text_fontstyle text-center">Race, genre, age and the disappearance place</p>
                            </div>
                        </div>

                    </section>

                    <div class="d-flex justify-content-center text_fontstyle mt-5 p-5">
                        <button type="button"
                            class="text_fontstyle m-3 cta_bottonsstyle"
                            onClick={GoBack}
                        >Volver</button>
                    </div>



                </div>

                <div class="modal fade" id="founded" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="subtitle_fontstyle text-center">¿Has encontrado a petname?</h5>
                            </div>
                            <div class="modal-body text_fontstyle
                        text-center modal_background">
                                <div class="modal-body">
                                    <button type="button" class="text_fontstyle cta_bottonsstyle" data-toggle="modal" data-target="#found_pet_confirmed" data-dismiss="modal">Si</button>
                                    <button type="button" class="text_fontstyle cta_bottonsstyle cta_bottonsstyle-green margin_top" data-dismiss="modal">No</button>            </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="found_pet_confirmed" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header d-flex flex-column">
                                <h5 class="subtitle_fontstyle text-center">¡petname fue encontrado! Felicitaciones.</h5>
                            </div>
                            <div class="d-flex flex-column align-items-center text_fontstyle
                text-center modal_background found_pet_confirmed">
                                <img src="./img/slogan.png" alt="slogan" />
                                <button type="button" class="text_fontstyle m-3 cta_bottonsstyle" data-dismiss="modal">Volver</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="delete_case" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="subtitle_fontstyle text-center">Seguro qué quieres borrar el caso?</h5>
                            </div>
                            <div class="modal-body text_fontstyle
            text-center modal_background">
                                <div class="modal-body">
                                    <button type="button" class="text_fontstyle cta_bottonsstyle cta_bottonsstyle-green" data-toggle="modal"
                                        data-target="#delete_case_confirmed" data-dismiss="modal">Si</button>
                                    <button type="button" class="text_fontstyle cta_bottonsstyle margin_top" data-dismiss="modal">No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="delete_case_confirmed" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="subtitle_fontstyle text-center">El caso fue borrado exitosamente.</h5>
                            </div>
                            <div class="d-flex flex-column align-items-center">
                                <button type="button" class="text_fontstyle m-3 cta_bottonsstyle" data-dismiss="modal">Volver</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

};

export default MyCases