import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosClient from '../config/axios'
import jwt_decode from 'jwt-decode'
import { useEffect } from 'react'

function LostPetCard(props) {

    const description = () => {

        const tipoMascota = props.report.tipoMascota,
            estado = props.report.estado,
            sexo = props.report.sexo

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
            title: `${props.report.nombre ? `Reporte de ${props.report.nombre}` : "Reporte"}`,
            text: `${props.report.informacionADifundir}. ID del reporte: ${props.report.idPublico}`,
            customClass: {
                content: 'text_fontstyle'
            }
        })
    }

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

    const [reporte, verReporte] = useState([]);

    const options = () => {

        const confirmacion = window.location.href.includes('/miscasos') ?
            Swal.fire({
                icon: 'warning',
                title: '¿Qué deseas hacer?',
                showCancelButton: true,
                confirmButtonText: 'Ver más',
                confirmButtonColor: '#00b5bd',
                cancelButtonText: 'Borrar',
                cancelButtonColor: '#cc5c42'
            }).then(result => {
                if (result.isConfirmed === false) { //botón eliminar
                    Swal.fire({
                        title: '¿Estás seguro?',
                        text: "¡No podrás revertir esto!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Cancelar',
                        customClass: {
                            content: 'text_fontstyle'
                        },
                        confirmButtonText: 'Borrar'
                    }).then((resultado) => {
                        if (resultado.isConfirmed) {

                            const consultarAPI = async () => {
                                const reporteConsulta = await axiosClient.delete(`/reportes/${props.report._id}`);
                                verReporte(reporteConsulta.data)
                            }
                            consultarAPI();

                            Swal.fire({
                                title: 'Borrado',
                                text: 'El reporte ha sido eliminado.',
                                icon: 'success',
                                customClass: {
                                    content: 'text_fontstyle'
                                }
                            })

                            setTimeout(() => {
                                window.location.reload()
                            }, 2000);
                        }
                    })


                }

                if (result.isConfirmed === true) {
                    props.history.push(`/reportes/${props.report.idPublico}`)
                }
            }) :
            ''

    }

    const seguimiento = () => {
        props.history.push(`/reportes/${props.report.idPublico}`)
    }

    return (
        <>
            <section className="margin_mobile">
                <div className="pet1">

                    <div className="pet_photo" >

                        {
                            window.location.href.includes('/buscar') ?
                                <img
                                    className="petPhotoSize"
                                    src={props.report.imagen}
                                    onClick={seguimiento}
                                />
                                :
                                <img
                                    className="petPhotoSize"
                                    src={props.report.imagen}
                                    onClick={options}
                                />
                        }
                    </div>

                    <div className="petinfo d-flex flex-column">
                        <h2 className="text_fontstyle text-center mt-2">
                            <strong>
                                {props.report.nombre ? props.report.nombre : description()}
                            </strong>
                        </h2>
                        <p className="text_fontstyle text-center" style={{ color: 'black' }}>{props.report.nombre ? description() + ' en ' +
                            props.report.departamento + ',' + ' ' + props.report.localidad : props.report.departamento + ',' + ' ' + props.report.localidad
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
    )

}

export default withRouter(LostPetCard)
