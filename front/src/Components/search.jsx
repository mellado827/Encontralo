import React from 'react'
import Navbar from './navbar'
import Date from './calendar'

class Search extends React.Component {
    constructor(props) {
        super()
    }

    componentDidMount() {
        document.title = "Encontralo - Buscar"
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="search_container">

                    <div className="search">

                        <h1 className="text-center subtitle_fontstyle search_title">Buscar un animal perdido</h1>

                        <form className="search_form">
                            <div className="last_timeseen d-flex flex-column mt-4">
                                <label className="mt-4 text_fontstyle text-center"> <u>Fecha</u> <strong>*</strong></label>

                                {<Date />}
                            </div>

                            <div className="pet_type flex-column row_petsform mt-5 d-flex justify-content-center">
                                <label className="text_fontstyle text-center">Tipo de mascota</label>
                                <select id="pet_type" name="pet_type" className="text_fontstyle pettype_size">
                                    <option value="dog">Perro</option>
                                    <option value="cat">Gato</option>
                                </select>
                            </div>

                            <div className="finder flex-column m-5">
                                <input type="text" placeholder="Nombre, localización o ID del reporte." className="text_fontstyle" />
                            </div>

                            <div className="search_button flex-column m-3">
                                <button type="submit" className="text_fontstyle cta_bottonsstyle">Buscar</button>
                            </div>

                        </form>



                        <section className="pets_container">
                            <div className="pet1 flex-column">

                                <div className="pet_photo">
                                    <div className="see_petreport">
                                        <a href="/">
                                            <img src="./img/see.png" alt="see report" title="Ver caso" />
                                        </a>
                                    </div>
                                </div>

                                <div className="petinfo m-1">
                                    <h2 className="text_fontstyle text-center m-2"><strong>Pet name</strong></h2>
                                    <p className="text_fontstyle text-center">Race, genre, age and the disappearance place</p>
                                </div>
                            </div>
                            <div className="pet1 flex-column">

                                <div className="pet_photo d-flex">
                                    <div className="see_petreport">
                                        <a href="/">
                                            <img src="./img/see.png" alt="see report" title="Ver caso" />
                                        </a>
                                    </div>
                                </div>
                                <div className="petinfo m-1">
                                    <h2 className="text_fontstyle text-center m-2"><strong>Pet name</strong></h2>
                                    <p className="text_fontstyle text-center">Race, genre, age and the disappearance place</p>
                                </div>
                            </div>

                            <div className="pet1 flex-column">
                                <div className="pet_photo">
                                    <div className="see_petreport">
                                        <a href="/">
                                            <img src="./img/see.png" alt="see report" title="Ver caso" />
                                        </a>
                                    </div>
                                </div>

                                <div className="petinfo m-1">
                                    <h2 className="text_fontstyle text-center m-2"><strong>Pet name</strong></h2>
                                    <p className="text_fontstyle text-center">Race, genre, age and the disappearance place</p>
                                </div>
                            </div>
                            <div className="pet1 flex-column">
                                <div className="pet_photo">
                                    <div className="see_petreport">
                                        <a href="/">
                                            <img src="./img/see.png" alt="see report" title="Ver caso" />
                                        </a>
                                    </div>
                                </div>

                                <div className="petinfo m-1">
                                    <h2 className="text_fontstyle text-center m-2"><strong>Pet name</strong></h2>
                                    <p className="text_fontstyle text-center">Race, genre, age and the disappearance place</p>
                                </div>
                            </div>
                            <div className="pet1 flex-column">
                                <div className="pet_photo">
                                    <div className="see_petreport">
                                        <a href="/">
                                            <img src="./img/see.png" alt="see report" title="Ver caso" />
                                        </a>
                                    </div>
                                </div>

                                <div className="petinfo m-1">
                                    <h2 className="text_fontstyle text-center m-2"><strong>Pet name</strong></h2>
                                    <p className="text_fontstyle text-center">Race, genre, age and the disappearance place</p>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </>
        )
    }

}


export default Search