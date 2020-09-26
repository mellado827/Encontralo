import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axiosClient from '../config/axios'


function LostPetCard({ report }, props) {
    //Extraer valores
    const { _id, tipoMascota, estado, raza, imagen, nombre, sexo, descripcion, chip, fecha, hora, departamento, localidad, lugar, nombreResponsable, celularResponsable, informacionADifundir } = report

    const description = () => {

        const tipoMascota = report.tipoMascota,
            estado = report.estado,
            sexo = report.sexo

        if (sexo == "Hembra") {
            let descripcionHembra = tipoMascota.substr(0, tipoMascota.length - 1) + "a" + ' ' + estado.substr(0, estado.length - 1) + "a"
            return descripcionHembra
        } else {
            let descripcionMacho = tipoMascota + ' ' + estado
            return descripcionMacho
        }
    }

    const modal = e => {
        e.preventDefault()

        Swal.fire({
            title: `Reporte de ${nombre ? nombre : description()}`,
            text: informacionADifundir,
            customClass: {
                content: 'text_fontstyle'
            }
        })
    }

    return (
        <>
            <section className="">
                <div className="pet1">

                    <div className="pet_photo" >
                        {<img className="petPhotoSize"
                            src={report.imagen}
                            style={{ cursor: 'pointer' }}
                            data-toggle="modal"
                            data-target="#exampleModal"
                        />}
                    </div>

                    <div className="petinfo m-1">
                        <h2 className="text_fontstyle text-center m-2">
                            <strong>
                                {
                                    nombre ? nombre : description()
                                }</strong>
                        </h2>
                        <p className="text_fontstyle text-center" style={{ color: 'black' }}>{nombre ? description() + ' en ' +
                            departamento + ',' + ' ' + localidad : departamento + ',' + ' ' + localidad
                        }</p>
                    </div>

                </div>
            </section>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="subtitle_fontstyle" id="exampleModalLabel">¿Qué deseas hacer?</h5>
                        </div>
                        <div className="modal-body d-flex justify-content-center">
                            <button className="cta_bottonsstyle text_fontstyle" data-dismiss="modal" onClick={modal}> Ver reporte </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary text_fontstyle" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default LostPetCard