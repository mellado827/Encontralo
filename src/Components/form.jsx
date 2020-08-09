import React from 'react'
import Navbar from '../Components/navbar'

class Form extends React.Component {

    constructor(props) {
        super()
    }

    componentDidMount() {
        document.title = "Encontralo - Formulario"
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="report d-flex flex-column justify-content-center align-items-center">

                    <div className="report_title mt-5">
                        <h1 className="text-center subtitle_fontstyle report_title">Formulario</h1>
                        <p className="text-center text_fontstyle">Si quieres unirte a Encontralo, brindar alguna idea o demás, ¡Estamos abiertos! Don't be shy.</p>
                    </div>

                    <form className="form d-flex flex-column justify-content-start">
                        <div className="d-flex flex-column align-items-center">
                            <div className="form-group m-3 pt-3 input_sizeForm">
                                <label htmlFor="formGroupExampleInput" className="text_fontstyle"><u>Nombre</u> *</label>
                                <input type="text" className="form-control  text_fontstyle" id="formGroupExampleInput" placeholder="Ingresa tu nombre" />
                            </div>
                            <div className="form-group m-3 pt-3 input_sizeForm">
                                <label htmlFor="formGroupExampleInput" className="text_fontstyle"><u>Apellido</u> *</label>
                                <input type="text" className="form-control text_fontstyle " id="formGroupExampleInput" placeholder="Ingresa tu apellido" />
                            </div>
                            <div className="form-group m-3 pt-3 input_sizeForm">
                                <label htmlFor="exampleInputEmail1" className="text_fontstyle"><u>Correo electrónico</u> *</label>
                                <input type="email" className="form-control text_fontstyle" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresa tu correo" />
                            </div>
                            <div className="form-group m-3 pt-3 input_sizeForm">
                                <label htmlFor="formGroupExampleInput" className="text_fontstyle"><u>Asunto</u> *</label>
                                <input type="text" className="form-control  text_fontstyle" id="formGroupExampleInput" placeholder="Ingresa el asunto" />
                            </div>
                            <div className="form-group m-3 pt-3 input_sizeForm">
                                <label htmlFor="exampleFormControlTextarea1" className="text_fontstyle"><u>Mensaje</u> *</label>
                                <textarea className="form-control text_fontstyle" id="exampleFormControlTextarea1" rows="8"></textarea>
                            </div>
                            <button type="submit" className="mt-3 cta_bottonsstyle text_fontstyle mb-3">Enviar</button>
                        </div>

                    </form>
                </div>
            </>
        )
    }

}

export default Form