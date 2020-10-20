import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import axiosClient from '../config/axios'
import { withRouter } from 'react-router-dom'

function PersonalInfoAPI(props) {

    var current_time = Date.now() / 1000;
    const token = localStorage.getItem("token")

    if (token !== null) {

        var decodedData = jwt_decode(token)

        if (decodedData.exp < current_time) {
            window.location.reload()
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
            const consultarAPI = () => {
                try {
                    const clienteConsulta = axiosClient.get('/usuarios', {
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


    }, [usuarios])

    return (
        <>

            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Nombre de usuario</u></p>
                <input
                    disabled
                    type="text"
                    id="username_personalinfo"
                    value={token != null ? decodedData.nickname : ``}
                    className="text_fontstyle" />
                <span id="usernameValid" className="text_font cellphoneValidStyles text-center"></span>
            </div>
            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Email</u></p>
                <input type="text"
                    id="email_personalinfo"
                    value={token != null ? decodedData.email : ``}
                    className="text_fontstyle"
                    disabled />
                <span id="emailValid_personalinfo" className="text_font cellphoneValidStyles text-center"></span>
            </div>
            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Contraseña</u></p>
                <input type="password" className="margin_closebutton" disabled />
                <a href="/contrasena">
                    <img src="./img/closed.png" alt="edit" className="modify_button" />
                </a>
            </div>

            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Número de celular</u></p>
                <input type="text"
                    placeholder="cellphone"
                    value={token != null ? decodedData.celular : ``}
                    id="cellphone_personalinfo"
                    disabled
                    className="text_fontstyle" />
            </div>



        </>
    )
}

export default withRouter(PersonalInfoAPI)