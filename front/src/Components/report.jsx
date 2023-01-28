import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Swal from 'sweetalert2';
import Navbar from "./navbar";
import Datepicker from "react-datepicker";
import { generate } from "shortid";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

function Report() {

  document.title = "Reportar / Encontralo";

  const id = generate();

  const [report, saveReport] = useState({
    tipoMascota: "",
    estadoMascota: "",
    razaMascota: "",
    nombreMascota: "",
    sexoMascota: "",
    descripcionMascota: "",
    chipMascota: "",
    fechaMascota: "",
    horaPerdidoMascota: "",
    departamentoPerdidoMascota: "",
    localidadPerdidoMascota: "",
    lugarPerdidoMascota: "",
    nombreResponsableMascota: "",
    descripcionResponsableMascota: "",
    viralInfo: "",
    idPublico: `${id}`,
    imagenMascota: ""
  });

  //images
  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState()
  const [caseInfo, setCaseInfo] = useState('')

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }  

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const updateState = (e) => {
    report[e.target.name] = e.target.value;
    saveReport(report);
    ViralInfo()
  };

  const handleChangeDate = (date) => {
    let dateES = date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'})

    let hour = date.getHours()
    let minutes = date.getMinutes()

    if(hour < 10) 
    {
      hour = "0" + hour
    } 

    if(minutes < 10) 
    {
      minutes = minutes + "0"
    }

    let hourAndMinutes = hour + ':' + minutes

    saveReport({
      ...report,
      fechaMascota: dateES,
      horaPerdidoMascota: hourAndMinutes
      })
  }

  //validate completed report
  const validateReport = () => {
     const {
       tipoMascota,
       estadoMascota,
       sexoMascota,
       descripcionMascota,
       chipMascota,
       departamentoPerdidoMascota,
       localidadPerdidoMascota,
       lugarPerdidoMascota,
       nombreResponsableMascota,
       descripcionResponsableMascota
     } = report;
    
     if(
       tipoMascota.length != "" &&
       estadoMascota.length  != "" &&
       sexoMascota.length  != "" &&
       descripcionMascota.length  != "" &&
       chipMascota.length  != ""  &&
       departamentoPerdidoMascota.length  != "" &&
       localidadPerdidoMascota.length != "" &&
       lugarPerdidoMascota.length != "" &&
       nombreResponsableMascota != "" &&
       descripcionResponsableMascota != ""
     ) {
      Swal.fire({
        title: 'SE BUSCA',
        text: caseInfo,
        imageUrl: previewSource
       }) 
     }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Completa todos los campos obligatorios.'
      })
      return false;
    }
  };

  const sexPet = (typePet, statusPet, sexPet) => {
    const lastCharacterSexPet = sexPet ? sexPet.slice(-1) : null
    const typePetMinusLastCharacter = typePet.slice(0, -1)
    const statusPetMinusLastCharacter = statusPet.slice(0, -1)
    if(sexPet != undefined && sexPet == 'Hembra') {
      let typePetFemale = typePetMinusLastCharacter + lastCharacterSexPet
      let statusPetFemale = statusPetMinusLastCharacter + lastCharacterSexPet
      let completePetFemale = typePetFemale + ' ' + statusPetFemale

      saveReport({
        ...report,
        tipoMascota:  typePetFemale,
        estadoMascota: statusPetFemale
      })

      return completePetFemale
    } else if (sexPet != undefined && sexPet == 'Macho') {
      let typePetMale = typePetMinusLastCharacter + lastCharacterSexPet
      let statusPetMale = statusPetMinusLastCharacter + lastCharacterSexPet
      let completePetMale = typePetMale + ' ' + statusPetMale

      saveReport({
        ...report,
        tipoMascota: typePetMale,
        estadoMascota: statusPetMale
      })

      return completePetMale
    }
  }

  const dateAndHour = () => {

    let hourExist = ''
    hourExist = report.horaPerdidoMascota ? hourExist = ` a las ` + report.horaPerdidoMascota : hourExist

    if(report.horaPerdidoMascota != "" && report.fechaMascota != "") 
    {
      let dateAndHourViralInfo = report.fechaMascota + hourExist
      return dateAndHourViralInfo
    }     
    else {
      let inputDate = 'Introduce la fecha'
      return inputDate
    }
  }

  const [maxDate, setMaxDate] = useState(new Date());

   const ViralInfo = () => {

    const textOfViralInfo =`${sexPet(report.tipoMascota, report.estadoMascota, report.sexoMascota)} 
    en ${report.departamentoPerdidoMascota}, ${report.localidadPerdidoMascota}, más específicamente en ${report.lugarPerdidoMascota}.
    ${report.nombreMascota ? `Responde al nombre de ${report.nombreMascota}.` : 'Se desconoce el nombre.'} 
    ${report.razaMascota ? `Es de raza ${report.razaMascota}.` : ``}
    Más información sobre el caso: ${report.descripcionMascota}.
    ${report.fechaMascota ? 'Se perdió el ' + dateAndHour() : ''}
    Quien reporta se llama ${report.nombreResponsableMascota} y su número de celular es: ${report.descripcionResponsableMascota}
    ¡Por favor difundir! #Uruguay #${report.departamentoPerdidoMascota} #LaCalleNoEsHogarParaNadie .`

    setCaseInfo(textOfViralInfo)
    };

  const handleSubmitFile = () => {
    if (!previewSource) {
      console.log("no seleccionaste nada")
    } else {
      uploadImageAndReport()
    }
  }

  const uploadImageAndReport = async () => {
    try {
      const requestInit = {
        method: 'POST',
        body: JSON.stringify({data: previewSource}),
        headers: {'Content-Type': 'application/json'}
      }
     const response = await fetch('http://localhost:9000/api/image', requestInit)
     const data = await response.json()

      if(data.url) {
        saveReport({
          ...report.imagenMascota = data.url,
          ...report.viralInfo = caseInfo
        })

        console.log(report)

        const requestInit = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(report)
        }
        console.log(report)

      await fetch('http://localhost:9000/api', requestInit)
        .then(res => {
          console.log(res)
          if(res.status == 200) {
            Swal.fire({
              icon: 'success',
              title: 'La publicación ha sido realizada correctamente.',
              text: `¡No te rindas!. Cualquier novedad te avisaremos. Tomá el ID del caso por cualquier cosa: ${report.idPublico}`
            })
          }
        }
        )
      
      //reiniciando state del libro
      saveReport({
        tipoMascota: "",
        estadoMascota: "",
        razaMascota: "",
        nombreMascota: "",
        sexoMascota: "",
        descripcionMascota: "",
        chipMascota: "",
        fechaMascota: "",
        horaPerdidoMascota: "",
        departamentoPerdidoMascota: "",
        localidadPerdidoMascota: "",
        lugarPerdidoMascota: "",
        nombreResponsableMascota: "",
        descripcionResponsableMascota: "",
        idPublico: "",
        viralInfo: "",
        imagenMascota: ""
      })

      } else {
        console.log('Imagen no adjuntada.')
      }

   } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />

      <div className="report">
        <div className="report_title">
          <h1 className="text-center subtitle_fontstyle report_title mt-5">
            Difundir desaparición
          </h1>
          <p className="text-center text_fontstyle">
            Completá el siguiente formulario:
          </p>
          <p className="text-center text_fontstyle">
            <strong>
              <u>Los campos con * son obligatorios</u>
            </strong>
          </p>
        </div>

        <div className="report_container">
          <form
            className="pet_form form_style m-3 text_fontstyle d-flex flex-column"
            id="pet_form"
          >
            <div className="petinfo m-2">
              <p className="text-center">
                <strong>Información de la mascota</strong>
              </p>
            </div>
            <label className="mt-4">
              {" "}
              <u>Tipo de mascota</u> <strong>*</strong>
            </label>
            <select
              id="pet_type"
              name="tipoMascota"
              required={true}
              onChange={(e) => updateState(e)}
            >
              <option value="">Seleccionar...</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Conejo">Conejo</option>
              <option value="Loro">Loro</option>
            </select>

            <label className="mt-4">
              <u>Estado</u> *
            </label>
            <select
              id="itwas"
              name="estadoMascota"
              required={true}
              onChange={updateState}
            >
              <option value="">Seleccionar...</option>
              <option value="Perdido">Perdido</option>
              <option value="Encontrado">Encontrado</option>
              <option value="Robado">Robado</option>
            </select>

            <label className="mt-4"> Raza </label>
            <input type="text" name="razaMascota" id="race" onChange={updateState} />

            <label className="mt-4">Nombre</label>
            <input
              type="text"
              id="pet_name"
              name="nombreMascota"
              onChange={updateState}
            />

            <label className="mt-4">
              {" "}
              <u>Sexo</u> <strong>*</strong>
            </label>
            <select name="sexoMascota" required={true} onChange={updateState}>
              <option value="">Seleccionar...</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>

            <div className="petphoto">
              <label className="mt-4">
                {" "}
                <u>Foto</u> <strong>*</strong>
              </label>
              <input
                name="imagenMascota"
                className="file_attachment"
                type="file"
                required={true}
                style={{ overflow: "hidden" }}
                id="file_attachment"
                accept="image/*"
                onChange={handleFileInputChange}
                value={fileInputState}
              />
              <div className="petpic_container d-flex justify-content-center">
                <img
                  alt=""
                  src={previewSource}
                  id="img"
                  className="petphoto_width"
                ></img>
              </div>
            </div>

            <label className="mt-4">
              {" "}
              <u>Descripción</u> <strong>*</strong>
            </label>

            <div className="petdescription d-flex flex-column">
              <textarea
                rows="10"
                required={true}
                id="pet_description"
                name="descripcionMascota"
                maxLength={1000}
                onChange={updateState}
                placeholder="Es miedoso, le falta un ojo, tiene collar de identificacion, responde a ciertos sonidos, se recompensa a la persona que lo encuentre, etc. "
              ></textarea>
            </div>

            <label className="mt-4">
              {" "}
              <u>¿Tiene chip?</u> <strong>*</strong>
            </label>
            <div className="d-flex justify-content-around">
              <select
                required={true}
                id="pet_sex"
                name="chipMascota"
                onChange={updateState}
              >
                <option value="">Seleccionar...</option>
                <option value="Si">Si</option>
                <option value="No se">No sé</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="d-flex flex-column mt-4">
                <label className="mt-4 text-center">Fecha y hora</label>
                <div className="d-flex justify-content-center text_fontstyle">
                  <Datepicker
                    id="missing_date"
                    placeholderText={dateAndHour()}
                    locale="es"
                    name="fechaMascota"
                    showTimeSelect
                    maxDate={maxDate}
                    onChange={handleChangeDate}
                  />
                </div>
            </div>

            <label className="mt-4">
              {" "}
              <u>Departamento</u> <strong>*</strong>
            </label>
            <div>
              <select
                required={true}
                name="departamentoPerdidoMascota"
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
                <option value="Paysandu">Paysandú</option>
                <option value="Rio Negro">Río Negro</option>
                <option value="Rivera">Rivera</option>
                <option value="Rocha">Rocha</option>
                <option value="Salto">Salto</option>
                <option value="San Jose">San José</option>
                <option value="Soriano">Soriano</option>
                <option value="Tacuarembo">Tacuarembó</option>
                <option value="Treinta y Tres">Treinta y Tres</option>
              </select>
            </div>
            <label className="mt-4">
              {" "}
              <u>Localidad</u> <strong>*</strong>
            </label>
            <div>
              <input
                required={true}
                type="text"
                name="localidadPerdidoMascota"
                className="lastplace"
                placeholder="Ejemplo: Brazo Oriental"
                id="zone"
                onChange={updateState}
              />
            </div>

            <label className="mt-4">
              {" "}
              <u>Lugar</u> <strong>*</strong>
            </label>
            <div>
              <input
                required={true}
                type="text"
                name="lugarPerdidoMascota"
                className="lastplace"
                id="last_placePet"
                placeholder="Ejemplo: Luis Alberto de Herrera y Burgues"
                onChange={updateState}
              />
            </div>
          </form>

          <div className="owner_form m-3 d-flex flex-column">
            <div className="owner_info m-2">
              <p className="text-center">
                <strong>Información de quien reporta</strong>
              </p>
            </div>

            <label className="mt-4 text_fontstyle">
              <u>Nombre y apellido</u> <strong>*</strong>
            </label>
            <input
              name="nombreResponsableMascota"
              type="text"
              className="text_fontstyle"
              id="owner_name"
              onChange={updateState}
            />
            <label className="mt-4 text_fontstyle">
              <u>Número de contacto</u> <strong>*</strong>
            </label>
            <input type="text" className="mt-4 text_fontstyle" name="descripcionResponsableMascota" onChange={updateState} /> 
            <div className="report_buttons d-flex justify-content-around">
              <button
                type="button"
                onClick={handleSubmitFile}
                className="cta_bottonsstyle mt-5 mb-5 text_fontstyle"
                data-toggle="modal"
                data-target="#areyousure"
                id="report_button"
              >
                Reportar
              </button>
              <button
                type="button"
                className="cta_bottonsstyle mt-5 mb-5 text_fontstyle cta_bottonsstyle-green"
                data-toggle="modal"
                data-target="#previewReport_modal"
                id="preview_button"
                onClick={validateReport}
                >
                Vista previa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withRouter(Report);
