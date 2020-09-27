import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axiosClient from '../config/axios'


function LostPetCard({ report }) {
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

    const modal = () => {
        Swal.fire({
            title: `${nombre ? `Reporte de ${nombre}` : "Reporte"}`,
            text: informacionADifundir,
            customClass: {
                content: 'text_fontstyle'
            }
        })
    }

    return (
        <>
            <section className="margin_mobile">
                <div className="pet1">

                    <div className="pet_photo" >
                        {<img className="petPhotoSize"
                            src={report.imagen}
                        />}
                    </div>

                    <div className="petinfo d-flex flex-column">
                        <h2 className="text_fontstyle text-center mt-2">
                            <strong>
                                {nombre ? nombre : description()}
                            </strong>
                        </h2>
                        <p className="text_fontstyle text-center" style={{ color: 'black' }}>{nombre ? description() + ' en ' +
                            departamento + ',' + ' ' + localidad : departamento + ',' + ' ' + localidad
                        }
                        </p>
                        <button type="button" className="text_fontstyle cta_bottonsstyle" onClick={modal}>
                            Más información
                        </button>
                    </div>

                </div>

            </section>




        </>
    )

}

export default LostPetCard