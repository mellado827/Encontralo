import React from 'react'
import emailjs from 'emailjs-com'
import Swal from 'sweetalert2'
import Navbar from '../Components/navbar'
import { init } from 'emailjs-com';
init("user_mOJKehHBkb7ul8DMSXNQF");

export default function Form(props) {

    document.title = "Encontralo / formulario "

    window.onbeforeunload = function () {
        return "";
    };


    function emailForm(e) {
        e.preventDefault();

        Swal.fire({
            text: `Enviando formulario...`,
            customClass: {
                content: 'text_fontstyle'
            }
        })

        emailjs.sendForm('encontralo', 'template_yf2moyf', e.target, 'user_mOJKehHBkb7ul8DMSXNQF')
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Formulario enviado satisfactoriamente!',
                    text: 'El equipo de Encontralo lo estará revisando a la brevedad.',
                    customClass: {
                        content: 'text_fontstyle'
                    }
                })
                setTimeout(() => {
                    props.history.push('/')
                }, 3000);
            }, () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: 'Hubo un error, inténtalo de nuevo más tarde',
                    customClass: {
                        content: 'text_fontstyle'
                    }
                })
            });
    }

    const validateForm = e => {

    }


    return (
        <>
            <Navbar />
            <div className="report d-flex flex-column justify-content-center align-items-center">

                <div className="report_title mt-5">
                    <h1 className="text-center subtitle_fontstyle report_title">Formulario</h1>
                    <p className="text-center text_fontstyle">Si quieres unirte a Encontralo, brindar alguna idea o demás, ¡Estamos abiertos! Don't be shy.</p>
                    <p className="text-center text_fontstyle"><strong><u>Los campos con * son obligatorios</u></strong></p>

                </div>

                <form className="form d-flex flex-column justify-content-start" onSubmit={emailForm}>
                    <div className="d-flex flex-column align-items-center">
                        <div className="form-group m-3 pt-3 input_sizeForm">
                            <label htmlFor="formGroupExampleInput"
                                className="text_fontstyle">
                                <u>Nombre</u> *
                                       </label>
                            <input type="text"
                                className="form-control text_fontstyle"
                                id="formGroupExampleInput"
                                name="name"
                                onChange={validateForm}
                                id="name_form"
                                required={true}
                                placeholder="Ingresa tu nombre" />
                        </div>
                        <div className="form-group m-3 pt-3 input_sizeForm">
                            <label htmlFor="exampleInputEmail1" className="text_fontstyle"><u>Correo electrónico</u> *</label>
                            <input type="email"
                                className="form-control text_fontstyle"
                                id="email_form"
                                aria-describedby="emailHelp"
                                name="email"
                                required={true}
                                onChange={validateForm}
                                placeholder="Ingresa tu correo" />
                        </div>
                        <div className="form-group m-3 pt-3 input_sizeForm">
                            <label htmlFor="formGroupExampleInput" className="text_fontstyle"><u>Asunto</u> *</label>
                            <input type="text"
                                name="subject"
                                required={true}
                                className="form-control text_fontstyle"
                                id="formGroupExampleInput"
                                onChange={validateForm}
                                id="subject_form"
                                placeholder="Ingresa el asunto" />
                        </div>
                        <div className="form-group m-3 pt-3 input_sizeForm">
                            <label htmlFor="exampleFormControlTextarea1" className="text_fontstyle"><u>Mensaje</u> *</label>
                            <textarea className="form-control text_fontstyle"
                                name="message"
                                onChange={validateForm}
                                required={true}
                                id="message_form"
                                id="exampleFormControlTextarea1"
                                rows="8"></textarea>
                        </div>
                        <button type="submit"
                            id="submit_form"
                            onClick={e => e.target.value === null ? alert("Ingresa todos los campos") : ``}
                            className="mt-3 cta_bottonsstyle text_fontstyle mb-3">Enviar
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

