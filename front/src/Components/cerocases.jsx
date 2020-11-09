import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import axiosClient from '../config/axios'

function CeroCases(props) {

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
                    console.log(error)
                    if (error.response.status = 500) {
                        props.history.push('/iniciarsesion')
                    }
                }

            }

            consultarAPI()
        }
        // else {
        //     props.history.push('/iniciarsesion')
        // }


    }, [usuarios])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div className="cerocases_container">

                    <p className="subtitle_fontstyle text-center nocases_text">
                        <i>Usted no ha reportado ninguna desaparición.</i>
                    </p>

                    <div className="d-flex align-items-center text_fontstyle cerocases_buttons">
                        <a type="button" className="cta_bottonsstyle mt-5 mb-5 text_fontstyle" href="/reportar">Reportar</a>
                        <button type="button"
                            className="cta_bottonsstyle cta_bottonsstyle-green mt-5 mb-5 text_fontstyle"
                        // onClick={window.history.back()}
                        >
                            Volver
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CeroCases