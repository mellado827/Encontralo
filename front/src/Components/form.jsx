import React from 'react'
import emailjs from 'emailjs-com'
import Swal from 'sweetalert2'
import Navbar from '../Components/navbar'
import { init } from 'emailjs-com';
init("user_mOJKehHBkb7ul8DMSXNQF");

export default function Form(props) {

    document.title = "Encontralo / formulario "

    return (
        <>
            <Navbar />
            <div className="d-flex flex-column justify-content-center align-items-center form_background">

                <div className="report_title mt-5">
                    <h1 className="text-center subtitle_fontstyle report_title">Formulario</h1>
                    <p className="text-center text_fontstyle">Contactate con nosotros completando los siguientes campos.</p>
                    <p className="text-center text_fontstyle"><strong><u>Todos son obligatorios.</u></strong></p>

                </div>

                <form className="form d-flex flex-column justify-content-start">
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
                                placeholder="Ingresa tu nombre" />
                        </div>
                        <div className="form-group m-3 pt-3 input_sizeForm">
                            <label htmlFor="exampleInputEmail1" className="text_fontstyle"><u>Correo electrónico</u> *</label>
                            <input type="email"
                                className="form-control text_fontstyle"
                                aria-describedby="emailHelp"
                                name="email"
                                required={true}
                                placeholder="Ingresa tu correo" />
                        </div>
                        <div className="form-group m-3 pt-3 input_sizeForm">
                            <label htmlFor="formGroupExampleInput" className="text_fontstyle"><u>Asunto</u> *</label>
                            <input type="text"
                                name="subject"
                                required={true}
                                className="form-control text_fontstyle"
                                placeholder="Ingresa el asunto" />
                        </div>
                        <div className="form-group m-3 pt-3 input_sizeForm">
                            <label htmlFor="exampleFormControlTextarea1" className="text_fontstyle"><u>Mensaje</u> *</label>
                            <textarea className="form-control text_fontstyle"
                                name="message"
                                required={true}
                                rows="8"></textarea>
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

