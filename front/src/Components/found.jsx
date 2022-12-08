import React from 'react'
import Navbar from './navbar'

function Found() {

    document.title = "Encontralo - animales encontrados"

    return (
        <>
            { <>
                <Navbar />

                <div className="search search_container">

                    <h1 className="text-center subtitle_fontstyle search_title mt-5">
                        <strong>Animales encontrados</strong>
                    </h1>
                    <div>
                        <form className="search_form">

                            <div className="finder flex-column m-5">
                                <div className="d-flex flex-row justify-content-center">
                                    <input type="checkbox"
                                        id="checkbox"
                                        className="mr-2" />
                                    <select id="pet_type"
                                        name="input"
                                        className="searchtype text_fontstyle d-flex width_search_types"
                                    >
                                        <option value="">Tipo de mascota</option>
                                        <option value="Perro">Perro</option>
                                        <option value="Gato">Gato</option>
                                        <option value="Conejo">Conejo</option>
                                        <option value="Loro">Loro</option>
                                    </select>
                                </div>

                                <div className="d-flex flex-row justify-content-center mt-5">
                                    <input type="checkbox"
                                        id="checkbox2"
                                        name="checkbox"
                                        className="mr-2" />
                                    <select
                                        id="departamento"
                                        name="input"
                                        className="text_fontstyle d-flex width_search_types"
                                    >
                                        <option value="">Departamento...</option>
                                        <option value="Artigas">Artigas</option>
                                        <option value="Canelones">Canelones</option>
                                        <option value="Cerro Largo">Cerro Largo</option>
                                        <option value="Colonia">Colonia</option>
                                        <option value="Durazno">Durazno</option>
                                        <option value="Flores">Flores</option>
                                        <option value="Florida">Florida</option>
                                        <option value="Lavalleja">Lavalleja</option>
                                        <option value="Maldonado">Maldonado</option>
                                        <option value="Montevideo">Montevideo</option>
                                        <option value="Paysandú">Paysandú</option>
                                        <option value="Río Negro">Río Negro</option>
                                        <option value="Rocha">Rocha</option>
                                        <option value="Salto">Salto</option>
                                        <option value="San José">San José</option>
                                        <option value="Soriano">Soriano</option>
                                        <option value="Tacuarembó">Tacuarembó</option>
                                        <option value="Treinta y Tres">Treinta y Tres</option>
                                    </select>
                                </div>
                            </div>

                            <div className="search_button flex-column m-3">
                                <button
                                    id="search_button"
                                    className="text_fontstyle cta_bottonsstyle">Buscar</button>
                            </div>

                        </form>
                    </div>
                </div>
            </>}
        </>
    )
}
export default Found