import React, { useState, useEffect } from 'react'
import Navbar from './navbar'
import axiosClient from '../config/axios'
import LostPetCard from './lostPetCard'
import NoResults from './noResults'

function SearchReport(props) {

    const inputReporte = props.match.params.idReporte

    const [reporte, verReporte] = useState([]);

    // cuando el componente carga
    useEffect(() => {
        // consultar la api para traer el reporte
        const consultarAPI = async () => {
            const reporteConsulta = await axiosClient.get(`/reportes/${inputReporte}`);
            verReporte(reporteConsulta.data)
        }
        consultarAPI();
    }, [])


    return (
        <>

            <Navbar />

            <div className="search_container d-flex flex-column">


                {reporte.reportePorDepartamento || reporte.reportePorTipo || reporte.reportePorIDpublico
                    ?
                    <>

                        <div className="margin">
                            <h1 className="subtitle_fontstyle text_center">
                                {reporte.reportePorDepartamento.length || reporte.reportePorTipo.length || reporte.reportePorIDpublico.length} resultados
                            </h1>
                            <h2 className="text_fontstyle text_center">La calle no es hogar para nadie</h2>
                        </div>

                        <div className="d-flex flex-row flex-wrap justify-content-center">
                            {
                                reporte.reportePorDepartamento.map(report => (
                                    <LostPetCard
                                        key={report._id}
                                        report={report}
                                    />
                                )
                                )}
                            {
                                reporte.reportePorTipo.map(report => (
                                    <LostPetCard
                                        key={report._id}
                                        report={report}
                                    />
                                )
                                )}
                            {
                                reporte.reportePorIDpublico.map(report => (
                                    <LostPetCard
                                        key={report._id}
                                        report={report}
                                    />
                                )
                                )}

                        </div>

                    </>
                    : < NoResults />
                }

            </div>
        </>
    )

}

export default SearchReport