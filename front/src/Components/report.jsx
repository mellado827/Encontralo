import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from './navbar'
import Calendar from './calendar'
import PreviewButtonDisplay from '../Functions/previewButtonDisplay'
import PreviewButtonData from '../Functions/previewButtonData'
import PetSex from '../Functions/petSex'
import Chips from '../Functions/chips'
import $ from 'jquery'
import PetName from '../Functions/petName'
import Race from '../Functions/race'
import Owner from '../Functions/owner'
import ItWas from '../Functions/itwas'
import Quit from '../Functions/quit'
import axiosClient from '../../src/config/axios'
import Swal from 'sweetalert2'

function Report() {

    const [report, saveReport] = useState({
        tipoMascota: '',
        estado: '',
        raza: '',
        nombre: '',
        sexo: '',
        descripcion: '',
        tieneChip: '',
        // fecha: ''
        hora: '',
        departamento: '',
        localidad: '',
        lugar: '',
        // nombreUsuario: ''
    })

    const history = useHistory();

    const updateState = e => {
        saveReport({
            ...report,
            [e.target.name]: e.target.value
        })
    }

    const redirect = () => {
        history.push("/");
    }


    //validar reporte
    const validateReport = () => {
        const { tipoMascota, estado, sexo, descripcion, tieneChip, departamento, localidad, lugar } = report

        let ok = !tipoMascota.length || !estado.length || !sexo.length || !descripcion.length ||
            !tieneChip.length || !departamento.length || !localidad.length || !lugar.length

        return ok
    }

    //añadir reporte
    const addReport = e => {
        e.preventDefault()
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un reporte se puede modificar después de haber sido creado, pero los datos modificados quedarán en el sitio, no al dinfundirse.",
            icon: 'warning',
            customClass: {
                content: 'text_fontstyle'
            },
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#267888',
            cancelButtonColor: '#e04f5f',
            confirmButtonText: 'Si, quiero reportar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.post('/reportes', report)
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire({
                                title: '¡Reporte hecho satisfactoriamente!',
                                text: `¡Mucha suerte y no te rindas! Puedes ver el reporte realizado en la sección "Buscar un animal perdido" o "Mis Casos"`,
                                icon: 'success',
                                customClass: {
                                    content: 'text_fontstyle'
                                }
                            })
                            setTimeout(() => {
                                redirect()
                            }, 3000);
                        }
                    })



            }


        })


    }


    // constructor() {
    //     super();

    //     this.state = {
    //         petDog: 'https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image-620x600.jpg'
    //     }
    // }

    // imageHandler = (e) => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         if (reader.readyState === 2) {
    //             this.setState({ petDog: reader.result })
    //         }
    //         if (document.getElementById("pet_type").value !== "selection" &&
    //             document.getElementById("itwas").value !== "selection" &&
    //             document.getElementById("pet_sex").value !== "selection" &&
    //             document.getElementById("pet_description").value !== "" &&
    //             (document.getElementById("chipAfirmative").checked == true ||
    //                 document.getElementById("chipUncertain").checked == true ||
    //                 document.getElementById("chipNegative").checked == true) &&
    //             document.getElementById("select_departament").value != "selection" &&
    //             document.getElementById("zone").value !== "" &&
    //             document.getElementById("last_placePet").value != "") {
    //             document.getElementById("preview_button").style.display = "block"
    //         }
    //     }
    //     reader.readAsDataURL(e.target.files[0])
    // }

    // removeImage = () => {
    //     this.setState({ petDog: 'https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image-620x600.jpg' })
    //     document.getElementById("file_attachment").value = ""
    //     document.getElementById("preview_button").style.display = "none";
    // }

    // clearHour = () => {
    //     document.getElementById("missing_hour").value = ""
    //     document.getElementById("preview_missing_hour").textContent = ``

    // }

    // const { petDog } = this.state
    return (
        <>
            <Navbar />

            <div className="report">
                <div className="report_title">
                    <h1 className="text-center subtitle_fontstyle report_title">Reportar desaparición</h1>
                    <p className="text-center text_fontstyle">Completa el siguiente formulario:</p>
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
                            onChange={updateState}>
                            <option value="">Seleccionar...</option>
                            <option value="Perro">Perro</option>
                            <option value="Gato">Gato</option>
                        </select>

                        <label className="mt-4"><u>Estado</u> *</label>
                        <select id="itwas" name="estado" onChange={ItWas, updateState} >
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
                                id="file_attachment"
                                accept="image/*"
                            // onChange={this.imageHandler} 
                            />
                            <div className="petpic_container d-flex justify-content-center">
                                <img
                                    // src={petDog} 
                                    alt=""
                                    id="img"
                                    className="petphoto_width">
                                </img>
                                <button
                                    // onClick={this.removeImage} 
                                    id="close_button_petimage"
                                    className="close_button button_removeimage"
                                >
                                    <img src="../img/close.png" className="close_button margin_cb_report"></img>
                                </button>
                            </div>

                        </div>



                        <label className="mt-4"> <u>Descripción</u> <strong>*</strong></label>

                        <div className="petdescription d-flex flex-column">
                            <textarea
                                rows="10"
                                id="pet_description"
                                name="descripcion"
                                onChange={PreviewButtonData, updateState}
                                placeholder="Es miedoso, le falta un ojo, tiene collar de identificacion, responde a ciertos sonidos, se recompensa a la persona que lo encuentre, etc. "></textarea>
                        </div>

                        <label className="mt-4"> <u>¿Tiene chip?</u> <strong>*</strong></label>
                        <div className="d-flex justify-content-around">
                            <select
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
                            {<Calendar
                                // onChange={updateState} 
                                name="fecha" />}
                            <label className="mt-4">Hora</label>
                            <div>
                                <input type="time"
                                    name="hora"
                                    className="missing_hour"
                                    id="missing_hour"
                                    onChange={PreviewButtonData, updateState}
                                />
                                <button
                                    className="clear_hour"
                                // onClick={this.clearHour}
                                >
                                    x
                                </button>
                            </div>

                        </div>

                        <label className="mt-4"> <u>Departamento</u> <strong>*</strong></label>
                        <div>
                            <select
                                name="departamento"
                                className="text_fontstyle lastplace"
                                id="select_departament"
                                onChange={PreviewButtonData, updateState}
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
                                <option value="Paysandu">Paysandú</option>
                                <option value="Río Negro">Río Negro</option>
                                <option value="Rocha">Rocha</option>
                                <option value="Salto">Salto</option>
                                <option value="San José">San José</option>
                                <option value="Soriano">Soriano</option>
                                <option value="Tacuarembo">Tacuarembó</option>
                                <option value="Treinta y tres">Treinta y Tres</option>
                            </select>
                        </div>
                        <label className="mt-4"> <u>Localidad</u> <strong>*</strong></label>
                        <div>
                            <input
                                type="text"
                                name="localidad"
                                className="lastplace"
                                placeholder="Ejemplo: Brazo Oriental"
                                id="zone"
                                onChange={PreviewButtonData, updateState} />
                        </div>

                        <label className="mt-4"> <u>Lugar</u> <strong>*</strong></label>
                        <div>
                            <input
                                type="text"
                                name="lugar"
                                className="lastplace"
                                id="last_placePet"
                                placeholder="Ejemplo: Luis Alberto de Herrera y Burgues"
                                onChange={PreviewButtonData, updateState} />
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
                        // onChange={updateState}
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
                            className="text_fontstyle" id="owner_description"
                            placeholder="Ofrezco recompensa, si me llaman y no contesto llamen a este número: 094124356, etc."
                            onChange={Owner}
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
                                        // src={petDog} 
                                        alt=""
                                        id="img"
                                        className="petphoto_width">
                                    </img>
                                </div>

                                <p className="text_fontstyle">
                                    <span id="preview_itwas">Se perdió</span>
                                    <span id="un"> un </span>
                                    <span id="preview_petType" className="previewdata"> petType </span>
                                    <span id="preview_race" className="previewdata"></span>
                      en <span id="preview_departament" className="previewdata">departament</span>, <span id="preview_zone"
                                        className="previewdata">zone</span>, más
                      específicamente en <span id="preview_place" className="previewdata">place </span>
                                    <span id="day_aclaration"></span>
                                    <span id="preview_date"
                                        className="previewdata">
                                    </span>
                                    <span id="hour_randomtext"><span id="preview_missing_hour"
                                        className="previewdata"></span></span>
                                    <span id="responde"></span> <span id="preview_petName"
                                        className="previewdata">se desconoce el nombre. </span><span id="preview_chipText" className="previewdata"></span> Algunos
                      datos
                      adicionales:
                      <span id="preview_petDescription" className="previewdata">petDescription</span>
                                    <span id="responsable_acclaration"></span>
                                    <span id="preview_ownerName" className="previewdata"></span>
                                    <span id="preview_ownerdescription" className="previewdata"></span> Por cualquier cosa contáctense al
                      <span className="previewdata"> ownerCellphone</span>
                                </p>
                                <div>
                                    <p className="text_fontstyle">No cuesta NADA compartir. LA CALLE NO ES HOGAR PARA NADIE.</p>
                                    <span className="text_fontstyle"> #Uruguay </span>
                                    <span id="hastag_preview_departament" className="text_fontstyle"></span>
                                    <span className="text_fontstyle"> #LaCalleNoEsHogarParaNadie </span>
                                    <span className="text_fontstyle"> #AnimalPerdido </span>
                                </div>
                                <p></p>
                                <p className="text_fontstyle">https://www.instagram.com/encontralo_uy</p>
                                <p className="text_fontstyle">https://www.facebook.com/encontraloUY</p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}


export default Report
