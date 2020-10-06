import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import axiosClient from '../config/axios'
import LostPetCard from './lostPetCard'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

function Search(props) {

    const [reports, saveReports] = useState([])

    document.title = "Encontralo - Buscar"

    useEffect(() => {
        Consult()
    }, [])

    const [input, setInput] = useState({})

    const value = e => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const Consult = async () => {
        const reportsConsult = await axiosClient.get('/reportes')
        saveReports(reportsConsult.data)
    }

    const emptyValue = e => {
        e.preventDefault()
        if (input.length === undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Ups! Parece que hubo un problema',
                text: 'Ingrese un valor para poder buscar',
                customClass: {
                    content: 'text_fontstyle'
                }
            })
        } else {
            props.history.push(`/buscar/${input}`)
        }
    }

    // const activeSearch = e => {

    // }

    return (
        <>

            <Navbar />

            <div className="search_container">

                <div className="search">

                    <h1 className="text-center subtitle_fontstyle search_title mt-5">Buscar un animal perdido</h1>
                    <h1 className="text_fontstyle text_center"><u>Elija la forma de buscar:</u></h1>

                    <form className="search_form">

                        <div className="finder flex-column m-5">
                            <div className="d-flex flex-row justify-content-center">
                                <input type="checkbox" className="mr-2" />

                                <select id="pet_type"
                                    name="tipoMascota"
                                    className="searchtype text_fontstyle d-flex width_search_types"
                                    onChange={value}>
                                    <option value="">Tipo de mascota</option>
                                    <option value="Perro">Perro</option>
                                    <option value="Gato">Gato</option>
                                </select>
                            </div>

                            <div className="d-flex flex-row justify-content-center mt-5">
                                <input type="checkbox" className="mr-2" />
                                <select
                                    name="departamento"
                                    onChange={value}
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
                            <div className="d-flex flex-row justify-content-center mt-5">
                                <input type="checkbox" className="mr-2" />
                                <input type="text"
                                    placeholder="ID del reporte"
                                    onChange={value}
                                    className="text_fontstyle d-flex width_search_types" />
                            </div>
                        </div>

                        <div className="search_button flex-column m-3">
                            <button
                                onClick={emptyValue}
                                id="button"
                                className="text_fontstyle cta_bottonsstyle">Buscar</button>
                        </div>

                        <div className="d-flex flex-wrap justify-content-center">
                            {reports.map(report => (
                                <LostPetCard
                                    key={report._id}
                                    report={report}
                                />
                            )
                            )}
                        </div>


                    </form>


                </div>
            </div>
        </>
    )
}


export default Search   