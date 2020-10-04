import React from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'


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
            text: `${props.report.informacionADifundir}`,
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
                            src={props.report.imagen}
                        />}

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

export default LostPetCard