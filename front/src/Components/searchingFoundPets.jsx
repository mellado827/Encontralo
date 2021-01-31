import React, { useState, useEffect } from 'react'
import NoResult from './noResults'
import axiosClient from '../config/axios'
import LostPetCard from './lostPetCard'
import jwt_decode from 'jwt-decode'
import Navbar from './navbar'
import $ from 'jquery'
import Swal from 'sweetalert2'

function SearchingFoundPets(props) {

    const comodin = props.match.params.comodin

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
                    const clienteConsulta = await axiosClient.get('/api/usuarios', {
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

    const [casosPorTipo, setcasosPorTipo] = useState([])

    // cuando el componente carga
    useEffect(() => {
        // consultar la api para traer el reporte
        const consultarAPI = async () => {
            const reporteConsulta = await axiosClient.get(`/api/encontrados/${comodin}`);
            verReporte(reporteConsulta.data.casosPorDepartamento)

            const consultaCasosPorTipo = await axiosClient.get(`/api/encontrados/${comodin}`);
            setcasosPorTipo(consultaCasosPorTipo.data.casosPorTipo)
        }
        consultarAPI();
    }, [])

    $('.mr-2').on('change', function () {
        $('.mr-2').not(this).prop('checked', false)
    })

    return (
        <>
            <Navbar />

            <div className="search_container d-flex flex-column">

                {reporte.length > 0 || casosPorTipo.length > 0
                    ?
                    <>

                        <div className="margin">
                            <h1 className="subtitle_fontstyle text_center">
                                ¡Encontraste {reporte.length || casosPorTipo.length} animalitos!
                    </h1>
                            <h1 className="text_fontstyle text_center"><u>Elegí la forma de buscar activándola:</u></h1>

                        </div>

                        <div className="d-flex flex-row flex-wrap justify-content-center">
                            {
                                reporte.map(report => (
                                    <LostPetCard
                                        key={report._id}
                                        report={report}
                                    />
                                )
                                )}
                            {
                                casosPorTipo.map(report => (
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

export default SearchingFoundPets