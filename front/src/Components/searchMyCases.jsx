import React, { useState, useEffect } from 'react'
import NoResult from './noResults'
import axiosClient from '../config/axios'
import LostPetCard from './lostPetCard'
import jwt_decode from 'jwt-decode'
import Navbar from './navbar'
import Swal from 'sweetalert2'

function SearchMyCases(props) {

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


    }, [usuarios])

    document.title = "Encontralo - Mis casos"

    // cuando el componente carga
    useEffect(() => {
        // consultar la api para traer el reporte
        const consultarAPI = async () => {
            const reporteConsulta = await axiosClient.get(`/api/reportes/${usuario}/${dep}`);
            verReporte(reporteConsulta.data)
        }
        consultarAPI();
    }, [])


    console.log(reporte)

    return (
        <>
            <Navbar />

            <div className="search_container d-flex flex-column">

                {reporte.departamentoCasosPorUsuario || reporte.casosPorUsuarioByID || reporte.casosPorUsuarioByTipoMascota
                    ?
                    <>

                        <div className="margin">
                            <h1 className="subtitle_fontstyle text_center">
                                {reporte.departamentoCasosPorUsuario.length || reporte.casosPorUsuarioByID.length
                                    || reporte.casosPorUsuarioByTipoMascota.length} resultados
                    </h1>
                            <h2 className="text_fontstyle text_center">La calle no es hogar para nadie</h2>
                        </div>

                        <div className="d-flex flex-row flex-wrap justify-content-center">
                            {
                                reporte.departamentoCasosPorUsuario.map(report => (
                                    <LostPetCard
                                        key={report._id}
                                        report={report}
                                    />
                                )
                                )}
                            {
                                reporte.casosPorUsuarioByID.map(report => (
                                    <LostPetCard
                                        key={report._id}
                                        report={report}
                                    />
                                )
                                )}
                            {
                                reporte.casosPorUsuarioByTipoMascota.map(report => (
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

export default SearchMyCases