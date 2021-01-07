import React, { useState, useEffect } from 'react'
import NoResult from './noResults'
import axiosClient from '../config/axios'
import LostPetCard from './lostPetCard'
import jwt_decode from 'jwt-decode'
import Navbar from './navbar'
import $ from 'jquery'
import Swal from 'sweetalert2'

function MyFounds(props) {

    const usuario = props.match.params.usuario
    const dep = props.match.params.dep

    const [reporte, verReporte] = useState([]);

    var current_time = Date.now() / 1000;

    var token = localStorage.getItem("token")

    const [usuarios, guardarUsuarios] = useState([])

    if (token !== null) {

        var decodedData = jwt_decode(token)

        if (decodedData.exp < current_time) {
            localStorage.removeItem("token")
            Swal.fire({
                icon: 'warning',
                title: 'Ha expirado tu sesión',
                customClass: {
                    content: 'text_fontstyle'
                },
                text: 'Por cuestiones de seguridad, la sesión dura una hora. ¡Vuelve a iniciar si deseas!'
            })
        }
    }

    useEffect(() => {

        if (token !== null) {
            const consultarAPI = async () => {
                try {
                    const clienteConsulta = await axiosClient.get('/usuarios', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                    guardarUsuarios(clienteConsulta.data)

                } catch (error) {
                    // Error con autorización
                    console.log(error)
                    if (error.response.status === 500) {
                        props.history.push('/iniciarsesion')
                    }
                }

            }

            consultarAPI()
        }
        else {
            props.history.push('/iniciarsesion')
        }


    }, [])

    document.title = "Encontralo - Mis casos"

    // cuando el componente carga
    useEffect(() => {
        // consultar la api para traer el reporte
        const consultarAPI = async () => {
            const reporteConsulta = await axiosClient.get(`/encontrados/${decodedData._id}`);
            verReporte(reporteConsulta.data.casosPorUsuario)
        }
        consultarAPI();
    }, [])

    $('.mr-2').on('change', function () {
        $('.mr-2').not(this).prop('checked', false)
    })

    const activeSearch = e => {
        if (e.target.checked === true) {
            document.getElementById("pet_type").disabled = false
            document.getElementById("departamento").disabled = true
        } else {
            document.getElementById("pet_type").disabled = true
        }
    }

    const activeSearch2 = e => {
        if (e.target.checked === true) {
            document.getElementById("departamento").disabled = false
            document.getElementById("pet_type").disabled = true
        } else {
            document.getElementById("departamento").disabled = true
        }
    }

    const [input, setInput] = useState({})

    const value = e => {
        e.preventDefault()
        setInput(e.target.value)
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
            props.history.push(`/encontrados/${decodedData._id}/${input}`)
        }
    }

    return (
        <>
            <Navbar />

            <div className="search_container d-flex flex-column">

                {reporte.length > 0
                    ?
                    <>

                        <div className="margin">
                            <h1 className="subtitle_fontstyle text_center">
                                ¡Encontraste {reporte.length} animalitos!
                    </h1>
                            <h1 className="text_fontstyle text_center"><u>Elegí la forma de buscar activándola:</u></h1>

                        </div>

                        <form className="search_form">

                            <div className="finder flex-column m-5">
                                <div className="d-flex flex-row justify-content-center">
                                    <input type="checkbox"
                                        onClick={activeSearch}
                                        id="checkbox"
                                        className="mr-2" />
                                    <select id="pet_type"
                                        name="input"
                                        disabled={true}
                                        className="searchtype text_fontstyle d-flex width_search_types"
                                        onChange={value}
                                    >
                                        <option value="">Tipo de mascota</option>
                                        <option value="Perro">Perro</option>
                                        <option value="Gato">Gato</option>
                                    </select>
                                </div>

                                <div className="d-flex flex-row justify-content-center mt-5">
                                    <input type="checkbox"
                                        id="checkbox2"
                                        onClick={activeSearch2}
                                        name="checkbox"
                                        className="mr-2" />
                                    <select
                                        id="departamento"
                                        name="input"
                                        disabled={true}
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
                            </div>

                            <div className="search_button flex-column m-3">
                                <button
                                    onClick={emptyValue}
                                    id="search_button"
                                    className="text_fontstyle cta_bottonsstyle">Buscar</button>
                            </div>

                        </form>

                        <div className="d-flex flex-row flex-wrap justify-content-center">
                            {
                                reporte.map(report => (
                                    <LostPetCard
                                        key={report._id}
                                        report={report}
                                    />
                                )
                                )}
                        </div>

                    </>
                    : < NoResult />

                }

            </div>
        </>

    )
}

export default MyFounds