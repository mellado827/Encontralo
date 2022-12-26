import React, { useState, useEffect } from "react";
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

  const [imageCloudinaryURL, setimageCloudinaryURL] = useState()
  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState()
  
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
     if (e && e.target && e.target.name) {

      saveReport({
        ...report,
        [e.target.name]: e.target.value
      }); 
    }
  };

  const clearHour = (e) => {
    e.preventDefault();
    document.getElementById("missing_hour").value = "";
  };

  //validar reporte
  const validateReport = (e) => {
    // const {
    //   tipoMascota,
    //   estadoMascota,
    //   sexoMascota,
    //   descripcionMascota,
    //   chipMascota,
    //   departamentoPerdidoMascota,
    //   localidadPerdidoMascota,
    //   lugarPerdidoMascota
    // } = report;
    
    // if(
    //   tipoMascota.length != "" &&
    //   estadoMascota.length  != "" &&
    //   sexoMascota.length  != "" &&
    //   descripcionMascota.length  != "" &&
    //   chipMascota.length  != ""  &&
    //   departamentoPerdidoMascota.length  != "" &&
    //   localidadPerdidoMascota.length != "" &&
    //   lugarPerdidoMascota.length != ""
    // ) 
    // {
      
    // createReport()
    // return true;
    // }

    // else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error',
    //     text: 'Completa todos los campos obligatorios.'
    //   // })
    //   // return false;
    // }
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDay] = useState(new Date());

  const selectedInputDate = (date) => {
    setSelectedDate(date);
  };

  if (selectedDate != null) {
    var fecha = `${selectedDate.getDate()}/${
      selectedDate.getMonth() + 1
    }/${selectedDate.getFullYear()}`;
  }

  const ViralInfo = () => {
    const {
      tipoMascota,
      estadoMascota,
      sexoMascota,
      descripcionMascota,
      nombreMascota,
      chipMascota,
      razaMascota,
      departamentoPerdidoMascota,
      localidadPerdidoMascota,
      lugarPerdidoMascota,
    } = report;

    const realSex = () => {
      switch (sexoMascota) {
        case "Macho":
          const macho = `${tipoMascota} ${estadoMascota.toLowerCase()}`;
          return macho;
        case "Hembra":
          const hembra = `${
            tipoMascota.substr(0, tipoMascota.length - 1) + "a"
          } ${estadoMascota.toLowerCase().substr(0, estadoMascota.length - 1) + "a"}`;
          return hembra;
        default:
          break;
      }
    };

    const chip = () => {
      switch (chipMascota) {
        case "Si":
          return "Tiene chip.";
        case "No se":
          return "No se sabe si tiene chip.";
        case "No":
          return "No tiene chip.";
        default:
          break;
      }
    };

    const textOfViralInfo =`${realSex()} en ${departamentoPerdidoMascota}, ${localidadPerdidoMascota}, más específicamente en ${lugarPerdidoMascota}.
    ${nombreMascota ? `Responde al nombre de ${nombreMascota}.` : 'Se desconoce el nombre.'} ${razaMascota ? `Es de raza ${razaMascota}.` : `${`Se desconoce su raza.`}`}
    Más información sobre el caso: ${descripcionMascota}. ${chip()} ¡Por favor difundir! #Uruguay #${departamentoPerdidoMascota} #LaCalleNoEsHogarParaNadie .`

    return textOfViralInfo;
  };

  const updateViralInfo = () => {
    saveReport(report => ({
      ...report,
      viralInfo: ViralInfo()
    }));
  }

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
     console.log(data)

      if(data.url) {
        saveReport({
          ...report.imagenMascota = data.url
        })

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
              onChange={updateState}
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

            <div className="last_timeseen d-flex flex-column mt-4">
              <label className="mt-4 text-center">Fecha</label>
              <div className="d-flex justify-content-center text_fontstyle">
                <Datepicker
                  id="missing_date"
                  placeholderText="Introduce la fecha"
                  selected={selectedDate}
                  onChange={(e) => {selectedInputDate(e); updateState(e)}}
                  locale="es"
                  isClearable={selectedInputDate}
                  dateFormat="dd/MM/yyyy"
                  maxDate={currentDay}
                />
              </div>

              <label className="mt-5 text_center">Hora</label>
              <div className="d-flex justify-content-center">
                <input
                  type="time"
                  name="horaPerdidoMascota"
                  id="missing_hour"
                  onChange={updateState}
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
                <strong>Información del usuario</strong>
              </p>
            </div>

            <label className="mt-4 text_fontstyle">Nombre completo</label>
            <input
              name="nombreResponsableMascota"
              type="text"
              className="text_fontstyle"
              id="owner_name"
              onChange={updateState}
            />
            <label className="mt-4 text_fontstyle">Descripción</label>
            <textarea
              rows="10"
              name="descripcionResponsableMascota"
              className="text_fontstyle"
              onChange={updateState}
              id="owner_description"
              placeholder="Ej: Ofrezco recompensa, si me llaman y no contesto llamen a este número: 094124356, etc."
            ></textarea>
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
              >
                Vista previa
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="previewReport_modal" className="modal fade show" role="dialog">
        <div className="modal-dialog">
          <div
            className="modal-content d-flex align-items-end"
            id="modal-content"
          >
            <i data-dismiss="modal">
              <img
                src="../../img/close.png"
                className="close_button"
                alt="close button"
              />
            </i>
            <div className="modal-header d-flex align-items-center">
              <h3 className="modal-title text_fontstyle text-center">
                <strong>Vista previa del reporte</strong>
              </h3>
            </div>
            <div className="modal-body d-flex flex-column justify-content-center text-center modal_background">
              <h1 className="title_fontstyle">SE BUSCA</h1>
              <div className="slideshow-container">
                <div className="petpic_container d-flex justify-content-center">
                  <img
                    src={fileInputState}
                    alt=""
                    id="img"
                    className="petphoto_width"
                  ></img>
                </div>

                <div className="text_fontstyle" name="viralInfo" onChange={(e) => {updateState(e); ViralInfo(e)}}>{ViralInfo()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withRouter(Report);
