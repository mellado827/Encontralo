import React, { useState, useEffect } from 'react'
import axiosClient from '../config/axios'
import Navbar from './navbar'
import LostPetCard from '../Components/lostPetCard'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import $ from 'jquery'
import Presentation from './presentation'

function MyCases(props) {

    const [input, setInput] = useState({})

    const [reports, saveReports] = useState([])

    var current_time = Date.now() / 1000;

    var token = localStorage.getItem("token")

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

    const [usuarios, guardarUsuarios] = useState([])

    const value = e => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const [animalesEncontrados, setAnimalesEncontrados] = useState([])

    const Consult = async () => {
        if (token) {
            const reportsConsult = await axiosClient.get(`/reportes/${decodedData._id}/${input}`)
            saveReports(reportsConsult.data)


            const misAnimalesEncontrados = await axiosClient.get(`/encontrados/${decodedData._id}`)
            setAnimalesEncontrados(misAnimalesEncontrados.data)
        } else {
            props.history.push("/iniciarsesion")
        }

    }

    useEffect(() => {
        Consult()
    }, [])

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
            props.history.push(`/miscasos/${decodedData.nickname}/${input}`)
        }
    }


    $('.mr-2').on('change', function () {
        $('.mr-2').not(this).prop('checked', false)
    })

    const activeSearch = e => {
        if (e.target.checked === true) {
            document.getElementById("pet_type").disabled = false
            document.getElementById("departamento").disabled = true
            document.getElementById("id").disabled = true
        } else {
            document.getElementById("pet_type").disabled = true
        }
    }

    const activeSearch2 = e => {
        if (e.target.checked === true) {
            document.getElementById("departamento").disabled = false
            document.getElementById("pet_type").disabled = true
            document.getElementById("id").disabled = true
        } else {
            document.getElementById("departamento").disabled = true
        }
    }

    const activeSearch3 = e => {
        if (e.target.checked === true) {
            document.getElementById("id").disabled = false
            document.getElementById("pet_type").disabled = true
            document.getElementById("departamento").disabled = true
        } else {
            document.getElementById("id").disabled = true
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
                    if (error.response.status = 500) {
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

    const [reporte, verReporte] = useState([]);

    console.log(reporte)

    // cuando el componente carga
    useEffect(() => {
        // consultar la api para traer el reporte
        if (token) {
            const consultarAPI = async () => {
                const reporteConsulta = await axiosClient.get(`/reportes/${decodedData._id}`);
                console.log(reporteConsulta)
                verReporte(reporteConsulta.data)
            }
            consultarAPI();
        }
    }, [])

    for (let indice in reporte.casosPorUsuario) {
        var casos = indice.length
    }

    return (

        <>
            {reporte.length === 0 ? <Presentation /> :
                <>
                    <Navbar />


                    <div className="search search_container">

                        <h1 className="text-center subtitle_fontstyle search_title mt-5">
                            <strong>Mis casos</strong>
                        </h1>
                        {casos > 0 ? <h1 className="text_fontstyle text_center"><u>Elija la forma de buscar activándola:</u></h1> : ``}

                        {casos > 0 ?
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
                                            onChange={value}>
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
                                    <div className="d-flex flex-row justify-content-center mt-5">
                                        <input type="checkbox"
                                            name="checkbox3"
                                            onClick={activeSearch3}
                                            className="mr-2" />
                                        <input type="text"
                                            disabled={true}
                                            id="id"
                                            name="input"
                                            placeholder="ID del reporte"
                                            onChange={value}
                                            className="text_fontstyle d-flex width_search_types" />
                                    </div>
                                </div>

                                <div className="search_button flex-column m-3">
                                    <button
                                        onClick={emptyValue}
                                        id="search_button"
                                        className="text_fontstyle cta_bottonsstyle">Buscar</button>
                                </div>

                            </form>

                            : ``}

                        <div className="">

                            {casos > 0
                                ?
                                <>

                                    <div className="d-flex flex-row flex-wrap justify-content-center">
                                        {
                                            reporte.casosPorUsuario.map(report => (
                                                <LostPetCard
                                                    key={report._id}
                                                    report={report}

                                                />
                                            )
                                            )}


                                    </div>

                                </>
                                :
                                //cero casos
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="cerocases_container d-flex flex-column align-items-center">

                                        <p className="subtitle_fontstyle text-center nocases_text">
                                            <i>Usted no ha difundido ninguna desaparición.</i>
                                        </p>

                                        <a type="button" className="cta_bottonsstyle mt-5 mb-5 text_fontstyle" href="/difundir">Difundir</a>
                                    </div>
                                </div>


                            }

                        </div>

                    </div>
                </>}



        </>

    )
}


export default MyCases