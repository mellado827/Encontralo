import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from './navbar'
import PreviewButtonData from '../Functions/previewButtonData'
import PetName from '../Functions/petName'
import Race from '../Functions/race'
import Owner from '../Functions/owner'
import ItWas from '../Functions/itwas'
import axiosClient from '../../src/config/axios'
import Swal from 'sweetalert2'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

function Report(props) {

    window.onbeforeunload = function () {
        return "";
    };

    const [report, saveReport] = useState({
        tipoMascota: '',
        estado: '',
        raza: '',
        nombre: '',
        sexo: '',
        imagen: '',
        descripcion: '',
        tieneChip: '',
        fecha: '',
        hora: '',
        departamento: '',
        localidad: '',
        lugar: '',
        nombreUsuario: '',
        descripcionUsuario: '',
        informacionADifundir: '',
    })

    const updateState = e => {
        saveReport({
            ...report,
            [e.target.name]: e.target.value
        })
    }

    const [imagePreview, setImagePreview] = useState('https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image-620x600.jpg');


    const removeImage = e => {
        e.preventDefault()
        setImagePreview('https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image-620x600.jpg')
        document.getElementById("file_attachment").value = ""
    }

    const readImage = e => {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result)
            }
            setImagePreview(reader.result)
        }
    }

    const clearHour = e => {
        e.preventDefault()
        document.getElementById("missing_hour").value = ""
    }

    //validar reporte
    const validateReport = () => {
        const { tipoMascota, estado, sexo, descripcion, tieneChip, departamento, localidad, lugar } = report
        let ok = !tipoMascota.length || !estado.length || !sexo.length || !descripcion.length ||
            !tieneChip.length || !departamento.length || !localidad.length || !lugar.length || imagePreview.length < 128

        if (ok === true) {
            return ok
        }

    }


    const [selectedDate, setSelectedDate] = useState(null)
    const [currentDay] = useState(new Date());

    const selectedInputDate = (date) => {
        setSelectedDate(date);
    };


    if (selectedDate != null) {
        var fecha = `${selectedDate.getDate()}/${(selectedDate.getMonth() + 1)}/${selectedDate.getFullYear()}`
    }


    const ViralInfo = () => {


        const { tipoMascota, estado, sexo, raza, nombre, hora, descripcion, tieneChip, departamento, localidad, lugar, nombreUsuario
            , descripcionUsuario } = report

        const realSex = () => {
            switch (sexo) {
                case "Macho":
                    const macho = `${tipoMascota} ${estado.toLowerCase()}`
                    return macho
                case "Hembra":
                    const hembra = `${tipoMascota.substr(0, tipoMascota.length - 1) + "a"} ${estado.toLowerCase().substr(0, estado.length - 1) + "a"}`
                    return hembra
                default:
                    break;
            }
        }


        const chip = () => {
            switch (tieneChip) {
                case "Si":
                    return "Tiene chip"
                case "No se":
                    return "No se sabe si tiene chip"
                case "No":
                    return "No tiene chip"
                default:
                    break;
            }
        }

        const viralInfo = `${realSex()} en ${departamento}, ${localidad}, más específicamente en ${lugar} ${selectedDate ? `el día ${fecha}` : ``}
        ${hora ? `a las ${hora}.` : ``}
        ${nombre ? `Responde al nombre de ${nombre}` : `Se desconoce el nombre`}, ${raza ? `raza ${raza}` : `raza no especificada`}.
        ${chip()}. Datos de vital importancia: ${descripcion}. ${nombreUsuario ? `La persona responsable es ${nombreUsuario}.` : ``}
        ${descripcionUsuario ? `Datos adicionales de la persona responsable: ${descripcionUsuario}` : ``}

        No cuesta NADA compartir. La calle no es hogar para nadie...

        #Uruguay #${departamento} #Animal${estado} #SeBusca
        `

        return viralInfo
    }

    //añadir reporte
    const addReport = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('tipoMascota', report.tipoMascota)
        formData.append('estado', report.estado)
        formData.append('raza', report.raza)
        formData.append('nombre', report.nombre)
        formData.append('sexo', report.sexo)
        formData.append('fecha', fecha)
        formData.append('imagen', imagePreview)
        formData.append('descripcion', report.descripcion)
        formData.append('tieneChip', report.tieneChip)
        formData.append('hora', report.hora)
        formData.append('departamento', report.departamento)
        formData.append('localidad', report.localidad)
        formData.append('lugar', report.lugar)
        formData.append('nombreUsuario', report.nombreUsuario)
        formData.append('descripcionUsuario', report.descripcionUsuario)
        formData.append('informacionADifundir', ViralInfo())

        try {

            Swal.fire({
                title: '¿Estás seguro/a?',
                text: "Un reporte puede ser modificado después de haber sido creado, pero la información modificada quedaría en el sitio, no al difundirse el reporte.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, quiero reportar!',
                cancelButtonText: 'Cancelar',
                customClass: {
                    content: 'text_fontstyle'
                }
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const res = await axiosClient.post('/reportes', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                    Swal.fire({
                        icon: 'success',
                        title: '¡Reporte realizado!',
                        text: `¡Suerte y no te  rindas! Puedes ver el reporte en "Buscar un animal perdido" o "Mis Casos"`,
                        customClass: {
                            content: 'text_fontstyle'
                        }
                    })

                    console.log(report)

                    setTimeout(() => {
                        props.history.push('/')
                    }, 3000);

                }
            })

        } catch (error) {

            Swal.fire({
                title: 'Hubo un error',
                text: `Inténtalo de nuevo más tarde`,
                icon: 'error',
                customClass: {
                    content: 'text_fontstyle'
                }
            })
        }

    }


    return (
        <>
            <Navbar />

            <div className="report">
                <div className="report_title">
                    <h1 className="text-center subtitle_fontstyle report_title">Reportar desaparición</h1>
                    <p className="text-center text_fontstyle">Completa el siguiente formulario:</p>
                    <p className="text-center text_fontstyle"><strong><u>Los campos con * son obligatorios</u></strong></p>
                </div>

                <div
                    className="report_container"

                >

                    <form
                        className="pet_form form_style m-3 text_fontstyle d-flex flex-column"
                        id="pet_form"
                    >
                        <div className="petinfo m-2">
                            <p className="text-center">
                                <strong>Información de la mascota</strong>
                            </p>
                        </div>
                        <label className="mt-4"> <u>Tipo de mascota</u> <strong>*</strong></label>
                        <select id="pet_type"
                            name="tipoMascota"
                            required={true}
                            onChange={updateState}>
                            <option value="">Seleccionar...</option>
                            <option value="Perro">Perro</option>
                            <option value="Gato">Gato</option>
                        </select>

                        <label className="mt-4"><u>Estado</u> *</label>
                        <select id="itwas"
                            name="estado"
                            required={true}
                            onChange={ItWas, updateState} >
                            <option value="">Seleccionar...</option>
                            <option value="Perdido">Perdido</option>
                            <option value="Encontrado">Encontrado</option>
                            <option value="Robado">Robado</option>
                        </select>

                        <label className="mt-4"> Raza </label>
                        <input
                            type="text"
                            name="raza"
                            id="race"
                            onChange={PreviewButtonData, Race, updateState}
                        />

                        <label className="mt-4">Nombre</label>
                        <input
                            type="text"
                            id="pet_name"
                            name="nombre"
                            onChange={PreviewButtonData, PetName, updateState} />

                        <label className="mt-4"> <u>Sexo</u> <strong>*</strong></label>
                        <select
                            id="pet_sex"
                            name="sexo"
                            required={true}
                            onChange={updateState}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>

                        <div className="petphoto">
                            <label className="mt-4"> <u>Foto</u> <strong>*</strong></label>
                            <input
                                className="file_attachment"
                                type="file"
                                required={true}
                                id="file_attachment"
                                accept="image/*"
                                // onChange={imageHandler}
                                onChange={readImage}
                                name="imagen"
                            />
                            <div className="petpic_container d-flex justify-content-center">
                                <img
                                    src={imagePreview}
                                    alt=""
                                    id="img"
                                    className="petphoto_width">
                                </img>
                                <button
                                    type="button"
                                    id="close_button_petimage"
                                    className="close_button button_removeimage"
                                    onClick={removeImage}
                                >
                                    <img src="../img/close.png" className="close_button margin_cb_report"></img>
                                </button>
                            </div>

                        </div>



                        <label className="mt-4"> <u>Descripción</u> <strong>*</strong></label>

                        <div className="petdescription d-flex flex-column">
                            <textarea
                                rows="10"
                                required={true}
                                id="pet_description"
                                name="descripcion"
                                onChange={updateState}
                                placeholder="Se perdió tal día, es miedoso, le falta un ojo, tiene collar de identificacion, responde a ciertos sonidos, se recompensa a la persona que lo encuentre, etc. "></textarea>
                        </div>

                        <label className="mt-4"> <u>¿Tiene chip?</u> <strong>*</strong></label>
                        <div className="d-flex justify-content-around">
                            <select
                                required={true}
                                id="pet_sex"
                                name="tieneChip"
                                onChange={updateState}
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Si">Si</option>
                                <option value="No se">No sé</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div className="last_timeseen d-flex flex-column mt-4">
                            <label className="mt-4 text-center">Fecha</label>
                            <div className="d-flex justify-content-center text_fontstyle">
                                <Datepicker
                                    name="fecha"
                                    id="missing_date"
                                    placeholderText="Introduce la fecha"
                                    selected={selectedDate}
                                    onChange={selectedInputDate}
                                    locale="es"
                                    isClearable={selectedInputDate}
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={currentDay}
                                />
                            </div>
                            <label className="mt-4">Hora</label>
                            <div>
                                <input type="time"
                                    name="hora"
                                    className="missing_hour"
                                    id="missing_hour"
                                    onChange={PreviewButtonData, updateState}
                                />
                                <button
                                    type="button"
                                    className="clear_hour"
                                    onClick={clearHour}
                                >
                                    x
                                </button>
                            </div>

                        </div>

                        <label className="mt-4"> <u>Departamento</u> <strong>*</strong></label>
                        <div>
                            <select
                                required={true}
                                name="departamento"
                                className="text_fontstyle lastplace"
                                id="select_departament"
                                onChange={updateState}
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Artigas">Artigas</option>
                                <option value="Canelones">Canelones</option>
                                <option value="Cerro Largo">Cerro Largo</option>
                                <option value="Colonia">Colonia</option>
                                <option value="Durazno">Durazno</option>
                                <option value="Flores">Flores</option>
                                <option value="Florida">Florida</option>
                                <option value="Lavalleja">Lavalleja</option>
                                <option value="Maldonado">Maldonado</option>
                                <option value="Montevideo">Montevideo</option>
                                <option value="Paysandú">Paysandú</option>
                                <option value="Río Negro">Río Negro</option>
                                <option value="Rocha">Rocha</option>
                                <option value="Salto">Salto</option>
                                <option value="San José">San José</option>
                                <option value="Soriano">Soriano</option>
                                <option value="Tacuarembó">Tacuarembó</option>
                                <option value="Treinta y Tres">Treinta y Tres</option>
                            </select>
                        </div>
                        <label className="mt-4"> <u>Localidad</u> <strong>*</strong></label>
                        <div>
                            <input
                                required={true}
                                type="text"
                                name="localidad"
                                className="lastplace"
                                placeholder="Ejemplo: Brazo Oriental"
                                id="zone"
                                onChange={updateState} />
                        </div>

                        <label className="mt-4"> <u>Lugar</u> <strong>*</strong></label>
                        <div>
                            <input
                                required={true}
                                type="text"
                                name="lugar"
                                className="lastplace"
                                id="last_placePet"
                                placeholder="Ejemplo: Luis Alberto de Herrera y Burgues"
                                onChange={updateState} />
                        </div>

                    </form>


                    <div className="owner_form m-3 d-flex flex-column">

                        <div className="owner_info m-2">
                            <p className="text-center">
                                <strong>Información del usuario</strong>
                            </p>
                        </div>

                        <label className="mt-4 text_fontstyle">Nombre completo</label>
                        <input
                            name="nombreUsuario"
                            type="text"
                            className="text_fontstyle"
                            id="owner_name"
                            onChange={updateState}
                        />

                        <label className="mt-4 text_fontstyle"> <u>Usuario</u> <strong></strong></label>
                        <input type="text" placeholder="username" disabled />

                        <label className="mt-4 text_fontstyle"> <u>Correo electrónico</u> <strong></strong></label>
                        <input type="email" placeholder="email" disabled />

                        <label className="mt-4 text_fontstyle"> <u>Número de teléfono</u> <strong></strong></label>
                        <input type="text" placeholder="cellphone" disabled />
                        <p className="text_fontstyle mt-4 text-center grey_color">En caso de que los datos que aparecen en pantalla no
                        correspondan con su usuario, modifíquelos
                        antes de reportar la desaparición.
            </p>
                        <a href="/datospersonales" className="text-center text_fontstyle link">Datos personales</a>

                        <label className="mt-4 text_fontstyle">Descripción</label>
                        <textarea
                            rows="10"
                            name="descripcionUsuario"
                            className="text_fontstyle" id="owner_description"
                            placeholder="Ofrezco recompensa, si me llaman y no contesto llamen a este número: 094124356, etc."
                            onChange={updateState}
                        >
                        </textarea>
                        <div className="report_buttons d-flex justify-content-around">
                            <button
                                type="submit"
                                className="cta_bottonsstyle mt-5 mb-5 text_fontstyle"
                                data-toggle="modal"
                                data-target="#areyousure"
                                id="report_button"
                                disabled={validateReport()}
                                onClick={addReport}
                            >Reportar
                            </button>
                            <button
                                type="button"
                                className="cta_bottonsstyle mt-5 mb-5 text_fontstyle cta_bottonsstyle-green"
                                data-toggle="modal"
                                data-target="#previewReport_modal"
                                disabled={validateReport()}
                                id="preview_button">Vista previa</button>
                        </div>
                    </div>



                </div>



            </div>



            <div id="previewReport_modal" className="modal fade show" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content d-flex align-items-end" id="modal-content">
                        <a href="" data-dismiss="modal">
                            <img src="./img/close.png" className="close_button" alt="close button" />
                        </a>
                        <div className="modal-header d-flex align-items-center">
                            <h3 className="modal-title text_fontstyle text-center"><strong>Vista previa del reporte</strong></h3>
                        </div>
                        <div className="modal-body d-flex flex-column justify-content-center text-center modal_background">

                            <h1 className="title_fontstyle">SE BUSCA</h1>
                            <div className="slideshow-container">

                                <div className="petpic_container d-flex justify-content-center">
                                    <img
                                        src={imagePreview}
                                        alt=""
                                        id="img"
                                        className="petphoto_width">
                                    </img>
                                </div>

                                <div className="text_fontstyle">
                                    {ViralInfo()}
                                </div>


                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )


}
export default withRouter(Report)
