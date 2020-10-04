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


                {reporte.length > 0
                    ?
                    <>

                        <div className="margin">
                            <h1 className="subtitle_fontstyle text_center">{reporte.length} resultados encontrados</h1>
                            <h2 className="text_fontstyle text_center">¡Esperemos que alguno sea el que buscas!</h2>
                        </div>

                        <div className="d-flex flex-row flex-wrap justify-content-center">
                            {reporte.map(report => (
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