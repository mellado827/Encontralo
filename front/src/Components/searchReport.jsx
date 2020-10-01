import React, { useState, useEffect } from 'react'
import Navbar from './navbar'
import axiosClient from '../config/axios'
import LostPetCard from './lostPetCard'
import NoResults from './noResults'
import Swal from 'sweetalert2'

function SearchReport(props) {

    const description = () => {

        const tipoMascota = reporte.tipoMascota,
            estado = reporte.estado,
            sexo = reporte.sexo

        if (sexo == "Hembra") {
            let descripcionHembra = tipoMascota.substr(0, tipoMascota.length - 1) + "a" + ' ' + estado.substr(0, estado.length - 1) + "a"
            return descripcionHembra
        } else {
            let descripcionMacho = tipoMascota + ' ' + estado
            return descripcionMacho
        }
    }

    const modal = () => {
        Swal.fire({
            title: `${reporte.nombre ? `Reporte de ${reporte.nombre}` : "Reporte"}`,
            text: reporte.informacionADifundir,
            customClass: {
                content: 'text_fontstyle'
            }
        })
    }

    const idReporte = props.match.params

    const id = idReporte.idReporte

    const [reporte, verReporte] = useState({});

    // cuando el componente carga
    useEffect(() => {
        // consultar la api para traer el reporte
        const consultarAPI = async () => {
            const reporteConsulta = await axiosClient.get(`/reportes/${id}`);
            verReporte(reporteConsulta.data)
        }

        consultarAPI();
    }, [])

    return (
        <>

            <Navbar />

            <div className="search_container d-flex flex-column justify-content-center align-items-center">

                <div className="search mt-5">
                    {reporte._id
                        ?
                        <>
                            <h1 className="subtitle_fontstyle">¡Un resultado encontrado!
                        </h1>
                            <section className="margin_mobile">
                                <div className="pet1">

                                    <div className="pet_photo" >
                                        {<img className="petPhotoSize"
                                            src={reporte.imagen}
                                        />}

                                    </div>

                                    <div className="petinfo d-flex flex-column">
                                        <h2 className="text_fontstyle text-center mt-2">
                                            <strong>
                                                {reporte.nombre ? reporte.nombre : description()}
                                            </strong>
                                        </h2>
                                        <p className="text_fontstyle text-center" style={{ color: 'black' }}>{reporte.nombre ? description() + ' en ' +
                                            reporte.departamento + ',' + ' ' + reporte.localidad : reporte.departamento + ',' + ' ' + reporte.localidad
                                        }
                                        </p>
                                        <button type="button" className="text_fontstyle cta_bottonsstyle"
                                            onClick={modal}
                                        >
                                            Más información
                        </button>
                                    </div>

                                </div>

                            </section>
                        </>
                        : < NoResults />
                    }
                </div>



            </div>
        </>
    )

}

export default SearchReport