import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from './navbar'
import PreviewButtonData from '../Functions/previewButtonData'
import axiosClient from '../../src/config/axios'
import Swal from 'sweetalert2'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import Error from './error'
import Presentation from './presentation'

registerLocale('es', es)

function EditReport(props) {
    const idcaso = props.match.params.idCaso

    const [caso, saveCaso] = useState([])
    const [casos, saveCasos] = useState([])

    const Consult = async () => {
        const casoConsult = await axiosClient.get(`/reportes/${idcaso}`)
        saveCaso(casoConsult.data.reportePorIDpublico)

        const casosConsult = await axiosClient.get(`/reportes`)
        saveCasos(casosConsult.data)
    }

    useEffect(() => {
        Consult()
    }, [])

    if (caso.length > 0) {
        caso.forEach(element => {
            saveCaso(element)
        })
    }

    const casosID = []

    if (casos.length > 0) {
        casos.forEach(el => {
            casosID.push(el.idPublico)
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

    window.onbeforeunload = function () {
        return "";
    };

    document.title = "Editar reporte / Encontralo"

    const [usuarios, guardarUsuarios] = useState([])

    useEffect(() => {

        if (token !== null) {
            const consultarAPI = async () => {
                try {
                    const clienteConsulta = await axiosClient.get('/usuarios', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                    guardarUsuarios(clienteConsulta.data)

                } catch (error) {
                    // Error con autorización
                    if (error.response.status = 500) {
                        props.history.push('/iniciarsesion')
                    }
                }

            }

            consultarAPI()
        }
        else {
            props.history.push('/iniciarsesion')
        }


    }, [])

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
        idPublico: '',
        usuario: '',
        emailUsuario: '',
        celularUsuario: ''
    })

    const updateState = e => {
        saveReport({
            ...report,
            [e.target.name]: e.target.value
        })
    }

    const [imagePreview, setImagePreview] = useState('');


    const removeImage = e => {
        e.preventDefault()
        document.getElementById("img").src = 'https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image-620x600.jpg'

    }

    const readImage = e => {
        // return setImagePreview(e.target.files[0])
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0]) // la paso a base64 porque sino no funciona
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result)
            }
        }
    }

    const clearHour = e => {
        e.preventDefault()
        document.getElementById("missing_hour").value = ""
    }

    //validar reporte
    const validateReport = () => {
        const { tipoMascota, estado } = report
        let ok = !tipoMascota.length || !estado.length

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

    const tipomascota = report.tipoMascota ? report.tipoMascota : caso.tipoMascota
    const estadoNuevo = report.estado ? report.estado : caso.estado
    const razaNuevo = report.raza ? report.raza : caso.raza
    const nombreNuevo = report.nombre ? report.nombre : caso.nombre
    const sexoNuevo = report.sexo ? report.sexo : caso.sexo
    const fechaNuevo = fecha ? fecha : caso.fecha
    const imagenNuevo = imagePreview ? imagePreview : caso.imagen
    const descripcionNuevo = report.descripcion ? report.descripcion : caso.descripcion
    const chipNuevo = report.tieneChip ? report.tieneChip : caso.tieneChip
    const horaNuevo = report.hora ? report.hora : caso.hora
    const departamentoNuevo = report.departamento ? report.departamento : caso.departamento
    const localidadNuevo = report.localidad ? report.localidad : caso.localidad
    const lugarNuevo = report.lugar ? report.lugar : caso.lugar
    const nombreUsuarioNuevo = report.nombreUsuario ? report.nombreUsuario : caso.nombreUsuario
    const descripcionUsuarioNuevo = report.descripcionUsuario ? report.descripcionUsuario : caso.descripcionUsuario


    const ViralInfo = () => {

        const realSex = () => {
            switch (sexoNuevo) {
                case "Macho":
                    const macho = `${tipomascota} ${estadoNuevo.toLowerCase()}`
                    return macho
                case "Hembra":
                    const hembra = `${tipomascota.substr(0, tipomascota.length - 1) + "a"} 
                    ${estadoNuevo.toLowerCase().substr(0, estadoNuevo.length - 1) + "a"}`
                    return hembra
                default:
                    break;
            }
        }


        const chip = () => {
            switch (chipNuevo) {
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

        const viralInfo = `${realSex()} en ${departamentoNuevo}, ${localidadNuevo}, más específicamente en: ${lugarNuevo} ${selectedDate ? `el día ${fecha}` : ``}
        ${horaNuevo ? `a las ${horaNuevo}.` : ``}
        ${nombreNuevo ? `Responde al nombre de ${nombreNuevo}` : `Se desconoce el nombre`}, ${razaNuevo ? `raza ${razaNuevo}` : `raza no especificada`}.
        ${chip()}. Datos de vital importancia: ${descripcionNuevo}. ${nombreUsuarioNuevo ? `La persona responsable es ${nombreUsuarioNuevo}.` : ``}
        ${descripcionUsuarioNuevo ? `Datos adicionales de la persona responsable: ${descripcionUsuarioNuevo}` : ``}
        
        No cuesta NADA compartir. La calle no es hogar para nadie...

        #Uruguay #${departamentoNuevo} #Animal${estadoNuevo} #SeBusca
        `

        return viralInfo
    }

    //añadir reporte
    const editReport = e => {


        e.preventDefault()

        const { tipoMascota, estado, raza, nombre, sexo, descripcion, tieneChip, hora, departamento, localidad,
            lugar, nombreUsuario, descripcionUsuario } = report

        let ok = !tipoMascota.length && !estado.length && !raza.length && !nombre.length && !sexo.length && !descripcion.length
            && !tieneChip.length && !hora.length && !selectedDate && !departamento.length && !localidad.length && !lugar.length
            && !nombreUsuario.length && !descripcionUsuario.length && !imagePreview.length

        if ((document.getElementById("img").src).includes("default-image")) {
            Swal.fire({
                icon: 'error',
                title: 'Ups! Parece que hubo un problema.',
                text: 'No podés dejar el reporte sin foto. Intentalo de nuevo.',
                customClass: {
                    content: 'text_fontstyle'
                }
            })
        } else {
            if (ok === true) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups! Parece que hubo un problema.',
                    text: 'Para editar un reporte, tenés que modificar al menos un campo.',
                    customClass: {
                        content: 'text_fontstyle'
                    }
                })

            } else {

                var formData = new URLSearchParams();
                // const forImage = new FormData()

                formData.append('tipoMascota', tipomascota)
                formData.append('estado', estadoNuevo)
                formData.append('raza', razaNuevo)
                formData.append('nombre', nombreNuevo)
                formData.append('sexo', sexoNuevo)
                formData.append('fecha', fechaNuevo)
                formData.append('imagen', imagenNuevo)
                formData.append('descripcion', descripcionNuevo)
                formData.append('tieneChip', chipNuevo)
                formData.append('hora', horaNuevo)
                formData.append('departamento', departamentoNuevo)
                formData.append('localidad', localidadNuevo)
                formData.append('lugar', lugarNuevo)
                formData.append('nombreUsuario', nombreUsuarioNuevo)
                formData.append('descripcionUsuario', descripcionUsuarioNuevo)
                formData.append('informacionADifundir', ViralInfo())

                try {

                    Swal.fire({
                        title: '¿Estás seguro/a?',
                        text: "La información modificada quedaría en el sitio, no al difundirse el reporte. Si llegás a realizar un reporte troll, tu cuenta será eliminada.",
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

                            try {

                                Swal.fire({
                                    icon: 'info',
                                    title: 'Cargando...',
                                    text: 'Estamos editando el reporte, esperá un momento.',
                                    customClass: {
                                        content: 'text_fontstyle'
                                    }
                                })

                                const editReport = await axiosClient.patch(`/reportes/${idcaso}`, formData, {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                })

                                if (editReport.status === 200) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: '¡Reporte editado!',
                                        text: `¡Suerte y no te  rindas!`,
                                        customClass: {
                                            content: 'text_fontstyle'
                                        }
                                    })

                                    setTimeout(() => {
                                        window.location.reload()
                                    }, 2000);

                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Ups! Parece que hubo un problema.',
                                        text: `Intentalo de nuevo más tarde.`,
                                        customClass: {
                                            content: 'text_fontstyle'
                                        }
                                    })
                                }



                            } catch (error) {
                                if (error.message === "Request failed with status code 413") {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Ups! Parece que hubo un problema.',
                                        text: `Ingresá una imagen más pequeña o con menos calidad por favor 😅`,
                                        customClass: {
                                            content: 'text_fontstyle'
                                        }
                                    })
                                }
                            }

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
        }


    }

    return (
        <>
            {casos.length === 0 ? <Presentation /> :



                casosID.includes(idcaso) && caso.usuario === decodedData.nickname
                    ?

                    <>
                        <Navbar />
                        <div className="report">
                            <div className="report_title">
                                <h1 className="text-center subtitle_fontstyle report_title mt-5">Editar reporte</h1>
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
                                        <option value="">{caso.tipoMascota}</option>
                                        <option value="Perro">Perro</option>
                                        <option value="Gato">Gato</option>
                                    </select>

                                    <label className="mt-4"><u>Estado</u> *</label>
                                    <select id="itwas"
                                        name="estado"
                                        required={true}
                                        onChange={updateState} >
                                        <option value="">{caso.estado}</option>
                                        <option value="Perdido">Perdido</option>
                                        <option value="Encontrado">Encontrado</option>
                                        <option value="Robado">Robado</option>
                                    </select>

                                    <label className="mt-4"> Raza </label>
                                    <input
                                        type="text"
                                        name="raza"
                                        placeholder={caso.raza ? caso.raza : undefined}
                                        id="race"
                                        onChange={updateState}
                                    />

                                    <label className="mt-4">Nombre</label>
                                    <input
                                        type="text"
                                        id="pet_name"
                                        name="nombre"
                                        placeholder={caso.nombre ? caso.nombre : undefined}
                                        onChange={updateState} />


                                    <label className="mt-4"> <u>Sexo</u> <strong>*</strong></label>
                                    <select
                                        name="sexo"
                                        required={true}
                                        onChange={updateState}
                                    >
                                        <option value="">{caso.sexo}</option>
                                        <option value="Macho">Macho</option>
                                        <option value="Hembra">Hembra</option>
                                    </select>

                                    <div className="petphoto">
                                        <label className="mt-4"> <u>Foto</u> <strong>*</strong></label>
                                        <input
                                            name="imagen"
                                            className="file_attachment"
                                            type="file"
                                            required={true}
                                            id="file_attachment"
                                            accept="image/*"
                                            onChange={readImage}
                                        />
                                        <div className="petpic_container d-flex justify-content-center">
                                            <img
                                                src={imagePreview.length > 0 ? imagePreview : caso.imagen}
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
                                                <img src="../../img/close.png" className="close_button margin_cb_report"></img>
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
                                            placeholder={caso.descripcion}
                                            onChange={updateState}
                                        ></textarea>
                                    </div>

                                    <label className="mt-4"> <u>¿Tiene chip?</u> <strong>*</strong></label>
                                    <div className="d-flex justify-content-around">
                                        <select
                                            required={true}
                                            id="pet_sex"
                                            name="tieneChip"
                                            placeholder={caso.tieneChip}
                                            onChange={updateState}
                                        >
                                            <option value="">{caso.tieneChip}</option>
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
                                                placeholderText={caso.fecha}
                                                selected={selectedDate}
                                                onChange={selectedInputDate}
                                                locale="es"
                                                isClearable={selectedInputDate}
                                                dateFormat="dd/MM/yyyy"
                                                maxDate={currentDay}
                                            />
                                        </div>

                                        <label className="mt-5 text_center">Hora</label>
                                        <div className="d-flex justify-content-center">
                                            <input type="time"
                                                name="hora"
                                                id="missing_hour"
                                                value={caso.hora}
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
                                            <option value="">{caso.departamento}</option>
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
                                            <option value="Paysandu">Paysandú</option>
                                            <option value="Rio Negro">Río Negro</option>
                                            <option value="Rocha">Rocha</option>
                                            <option value="Salto">Salto</option>
                                            <option value="San Jose">San José</option>
                                            <option value="Soriano">Soriano</option>
                                            <option value="Tacuarembo">Tacuarembó</option>
                                            <option value="Treinta y Tres">Treinta y Tres</option>
                                        </select>
                                    </div>
                                    <label className="mt-4"> <u>Localidad</u> <strong>*</strong></label>
                                    <div>
                                        <input
                                            required={true}
                                            type="text"
                                            name="localidad"
                                            placeholder={caso.localidad}
                                            className="lastplace"
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
                                            placeholder={caso.lugar}
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
                                        placeholder={caso.nombreUsuario ? caso.nombreUsuario : undefined}
                                        className="text_fontstyle"
                                        id="owner_name"
                                        onChange={updateState}
                                    />

                                    <label className="mt-4 text_fontstyle"> <u>Usuario</u> <strong></strong></label>
                                    <input type="text"
                                        className="text_fontstyle"
                                        value={decodedData ? decodedData.nickname : ``}
                                        disabled />

                                    <label className="mt-4 text_fontstyle"> <u>Correo electrónico</u> <strong></strong></label>
                                    <input type="email"
                                        className="text_fontstyle"
                                        value={decodedData ? decodedData.email : ``}
                                        disabled />

                                    <label className="mt-4 text_fontstyle"> <u>Número de teléfono</u> <strong></strong></label>
                                    <input type="text"
                                        className="text_fontstyle"
                                        value={`${decodedData ? decodedData.celular : ``}`}
                                        disabled />
                                    <p className="text_fontstyle mt-4 text-center grey_color">En caso de que los datos que aparecen en pantalla no
                                    correspondan con su usuario, modifíquelos
                                    antes de reportar la desaparición.
</p>
                                    <a href="/datospersonales" className="text-center text_fontstyle link">Datos personales</a>

                                    <label className="mt-4 text_fontstyle">Descripción</label>
                                    <textarea
                                        rows="10"
                                        placeholder={caso.descripcionUsuario ? caso.descripcionUsuario : undefined}
                                        name="descripcionUsuario"
                                        className="text_fontstyle" id="owner_description"
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
                                            onClick={editReport}
                                        >Editar
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
                                        <img src="../../img/close.png" className="close_button" alt="close button" />
                                    </a>
                                    <div className="modal-header d-flex align-items-center">
                                        <h3 className="modal-title text_fontstyle text-center"><strong>Vista previa del reporte</strong></h3>
                                    </div>
                                    <div className="modal-body d-flex flex-column justify-content-center text-center modal_background">

                                        <h1 className="title_fontstyle">SE BUSCA</h1>
                                        <div className="slideshow-container">

                                            <div className="petpic_container d-flex justify-content-center">
                                                <img
                                                    src={imagenNuevo}
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



                    : < Error />}


        </>
    )


}
export default withRouter(EditReport)
