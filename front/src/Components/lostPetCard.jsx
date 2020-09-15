import React from 'react'

function LostPetCard({ report }) {

    //Extraer valores
    const { _id, tipoMascota, estado, raza, imagen, nombre, sexo, descripcion, chip, fecha, hora, departamento, localidad, lugar, nombreResponsable, celularResponsable } = report

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


    return (
        <>
            <section className="">
                <div className="pet1">

                    <div className="pet_photo">
                        {<img src={report.imagen} alt="" />}
                        <div className="see_petreport">
                            <a href="/">
                                <img src="./img/see.png" alt="see report" title="Ver caso" />
                            </a>
                        </div>
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

        </>
    )

}

export default LostPetCard