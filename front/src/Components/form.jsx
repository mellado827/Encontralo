import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react'
import Swal from 'sweetalert2'
import Navbar from '../Components/navbar'

export default function Form() {

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        whatsapp: "",
        subject: "",
        message: "",
      });

    const handleInputChange = (event) => {
        setFormState({
          ...formState,
          [event.target.name]: event.target.value,
        });
      };      

    document.title = "Encontralo / Formulario "

    const handleSubmit = (event) => {
        event.preventDefault();

                
        Swal.fire({
            icon: 'info',
            title: 'Enviando...',
            text: 'Se está enviando el correo, esperá un momento por favor.'
        })
    
        fetch("http://localhost:9000/api/formulario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        })
          .then((response) => {
            
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Enviado correctamente!',
                    text: 'Gracias por contactarte con Encontralo. El moderador principal se contactará contigo a la casilla de correo que ingresaste.'
                })

            setTimeout(() => {
                window.location.reload();
            }, 3000);

            } else {
              Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Lamentamos que no se haya podido enviar el formulario, pero intentalo de nuevo más tarde.'
              })
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Lamentamos que no se haya podido enviar el formulario, pero intentalo de nuevo más tarde.'
              })
          });
      };
    

    return (
        <>
            <Navbar />
            <div className="d-flex flex-column justify-content-center align-items-center form_background">

                <div className="report_title mt-5">
                    <h1 className="text-center subtitle_fontstyle report_title">Formulario</h1>
                    <p className="text-center text_fontstyle">Contactate con nosotros completando los siguientes campos.</p>
                    <p className="text-center text_fontstyle"><strong><u>Todos son obligatorios.</u></strong></p>

                </div>

                <form className="form d-flex flex-column justify-content-start" onSubmit={handleSubmit}>
                    <div className="d-flex flex-column align-items-center">
                        <div className="form-group m-3 pt-3 input_sizeForm">
                            <label htmlFor="formGroupExampleInput"
                                className="text_fontstyle">
                                <u>Nombre</u> *
                                       </label>
                            <input type="text"
                                className="form-control text_fontstyle"
                                name="name"
                                required={true}
                                placeholder="Ingresa tu nombre" 
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="form-group m-3 pt-3 input_sizeForm">
                            <label htmlFor="exampleInputEmail1" className="text_fontstyle"><u>Correo electrónico</u> *</label>
                            <input type="email"
                                className="form-control text_fontstyle"
                                aria-describedby="emailHelp"
                                name="email"
                                required={true}
                                placeholder="Ingresa tu correo" 
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="form-group m-3 pt-3 input_sizeForm">
                            <label htmlFor="exampleInputEmail1" className="text_fontstyle"><u>Número de celular</u> *</label>
                            <input type="text"
                                className="form-control text_fontstyle"
                                name="whatsapp"
                                required={true}
                                placeholder="Ingresa tu número de teléfono" 
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="form-group m-3 pt-3 input_sizeForm">
                            <label htmlFor="formGroupExampleInput" className="text_fontstyle"><u>Asunto</u> *</label>
                            <input type="text"
                                name="subject"
                                required={true}
                                className="form-control text_fontstyle"
                                placeholder="Ingresa el asunto" 
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="form-group m-3 pt-3 input_sizeForm">
                            <label htmlFor="exampleFormControlTextarea1" className="text_fontstyle"><u>Mensaje</u> *</label>
                            <textarea className="form-control text_fontstyle"
                                name="message"
                                required={true}
                                onChange={handleInputChange}
                                rows="8">
                            </textarea>
                        </div>
                        <button type="submit"
                            className="mt-3 cta_bottonsstyle text_fontstyle mb-3">Enviar
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

