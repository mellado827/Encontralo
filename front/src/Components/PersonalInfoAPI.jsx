import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import axiosClient from '../config/axios'
import { withRouter } from 'react-router-dom'
import $ from 'jquery'

function PersonalInfoAPI(props) {

    window.onbeforeunload = function () {
        return "";
    };

    function enableNickname() {
        $("#username_personalinfo").prop("disabled", false)
        $("#email_personalinfo").prop("disabled", true)
        $("#cellphone_personalinfo").prop("disabled", true)
    }

    function enableEmail() {
        $("#email_personalinfo").prop("disabled", false)
        $("#username_personalinfo").prop("disabled", true)
        $("#cellphone_personalinfo").prop("disabled", true)
    }

    function enableCellphone() {
        $("#cellphone_personalinfo").prop("disabled", false)
        $("#email_personalinfo").prop("disabled", true)
        $("#username_personalinfo").prop("disabled", true)
    }

    //mostrar datos personales si el usuario está logueado
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

    const [valor, setValor] = useState('')

    const nuevoValor = e => {
        setValor(e.target.value)
    }

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


    const [usuario, datosUsuario] = useState({
        nickname: '',
        email: '',
        celular: ''
    })

    const consultaPorEdit = async () => {
        const consulta = await axiosClient.get(`/usuarios/${decodedData._id != undefined ? decodedData._id : ``}`)

        datosUsuario(consulta.data)
    }

    useEffect(() => {
        consultaPorEdit()
    }, [])

    const actualizarState = e => {
        datosUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        })
    }

    const actualizarUsuario = e => {
        e.preventDefault()

        if ((document.getElementById("cellphone_personalinfo").value === "" &&
            document.getElementById("username_personalinfo").value === "" &&
            document.getElementById("email_personalinfo").value === "")) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Completa de forma correcta los campos.`,
                customClass: {
                    content: 'text_fontstyle'
                }
            })
        } else {
            Swal.fire({
                title: '¿Estás seguro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Actualizar'

            }).then((result) => {
                if (result.isConfirmed) {
                    try {
                        axiosClient.put(`/usuarios/${decodedData._id ? decodedData._id : ``}`, usuario)
                            .then(res => {

                                if (res.data.mensaje === "Datos ya existentes" ||
                                    res.data.mensaje === "Correo electrónico inválido") {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: `${res.data.mensaje === "Datos ya existentes" || res.data.mensaje === "Correo electrónico inválido"
                                            ? res.data.mensaje : `No has modificado ningún valor`}, inténtalo de nuevo.`,
                                        customClass: {
                                            content: 'text_fontstyle'
                                        }
                                    })

                                } else {
                                    Swal.fire({
                                        icon: 'success',
                                        title: '¡Datos actualizados correctamente!',
                                        text: 'Inicia sesión nuevamente así se actualizan los datos en el sitio.',
                                        customClass: {
                                            content: 'text_fontstyle'
                                        }
                                    })
                                    // localStorage.removeItem("token")
                                    // setTimeout(() => {
                                    //     props.history.push("/iniciarsesion")
                                    // }, 1500);
                                }



                            })
                    } catch (error) {
                        console.log(error)
                    }
                }
            })
        }

    }

    //Solo números
    function justNumbers(e) {
        var key = window.event ? e.which : e.keyCode;
        if (key < 48 || key > 57) {
            e.preventDefault();
        }
    }

    window.addEventListener("load", function () {
        if (document.getElementById("cellphone_personalinfo")) {
            document.getElementById("cellphone_personalinfo").addEventListener("keypress", justNumbers, false);
        }

    });


    return (
        <>

            <div className="text-center personaldata_item">
                <p className="text_fontstyle mt-5"><u>Nombre de usuario</u></p>
                <input
                    disabled
                    type="text"
                    name="nickname"
                    maxLength="12"
                    onChange={actualizarState}
                    id="username_personalinfo"
                    placeholder={usuario.nickname ? usuario.nickname : ``}
                    className="text_fontstyle" />
                <button title="Modificar"
                    id="modify_button"
                    onClick={enableNickname}
                    className="transparent mb-5"
                >
                    <img src="./img/edit.png" alt="edit" className="modify_button" />
                </button>
            </div>
            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Email</u></p>
                <input
                    type="email"
                    name="email"
                    onChange={actualizarState}
                    id="email_personalinfo"
                    placeholder={usuario.email ? usuario.email : ``}
                    className="text_fontstyle"
                    disabled />
                <button title="Modificar"
                    id="modify_button"
                    onClick={enableEmail}
                    className="transparent mb-5"
                >
                    <img src="./img/edit.png" alt="edit" className="modify_button" />
                </button>


            </div>

            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Número de celular</u></p>
                <input type="text"
                    onChange={actualizarState}
                    name="celular"
                    maxLength="9"
                    placeholder={usuario.celular ? usuario.celular : ``}
                    id="cellphone_personalinfo"
                    disabled
                    className="text_fontstyle" />
                <button title="Modificar"
                    id="modify_button"
                    onClick={enableCellphone}
                    className="transparent mb-5"
                >
                    <img src="./img/edit.png" alt="edit" className="modify_button" />
                </button>
            </div>

            <div className="text-center mt-4 personaldata_item">
                <p className="text_fontstyle"><u>Contraseña</u></p>
                <a href="/contrasena">
                    <img src="./img/closed.png"
                        title="Cambia tu contraseña" alt="edit" className="modify_button" />
                </a>
            </div>

            <div className="d-flex text-center mt-4 justify-content-center">
                <button type="button"
                    className="text_fontstyle m-5 cta_bottonsstyle"
                    onClick={actualizarUsuario}
                    id="savechanges_personalinfo">
                    Guardar cambios
                </button>
            </div>




        </>
    )
}

export default withRouter(PersonalInfoAPI)