import React, { useState, useEffect } from 'react'
import EnableInput from '../Functions/enableInputs'
import GoBack from '../Functions/goBack'
import Blank from '../Functions/blank'
import PersonalData from '../Functions/personalData'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import PersonalInfoAPI from './PersonalInfoAPI'
import axiosClient from '../config/axios'

function PersonalInfo(props) {

    document.title = "Encontralo / Datos personales"

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

            <div className="loginANDsignup_background height_shared d-flex justify-content-center align-items-center">
                <div className="personaldata" id="personaldata">
                    <h1 className="subtitle_fontstyle text-center m-3">Datos personales</h1>
                    <p className="text_fontstyle text-center gray_color">
                        Ve tus datos personales o, actualízalos.
                        </p>
                    <div className="personaldata_container">

                        <div className="text-center mt-4 personaldata_item">


                            <button title="Modificar"
                                id="modify_button"
                                onClick={EnableInput}
                                className="transparent mb-5"
                            >
                                <img src="./img/edit.png" alt="edit" className="modify_button" />
                            </button>


                        </div>

                    </div>

                    < PersonalInfoAPI />


                    <div className="personalinfo_buttons d-flex flex-column m-5">

                        <button type="button"
                            className="text_fontstyle m-5 cta_bottonsstyle"
                            data-toggle="modal"
                            onClick={() => { Blank(); PersonalData() }}
                            data-target="#save_changes_question"
                            id="savechanges_personalinfo">
                            Guardar cambios
                    </button>

                        <div id="save_changes_question" className="modal fade" role="dialog">
                            <div className="modal-dialog">

                                <div className="modal-content" id="save_changes_modal">
                                    <div className="modal-header modal_background">
                                        <h1 className="modal-title subtitle_fontstyle text-center">
                                            <strong>¿Seguro qué quieres modificar tus datos?</strong>
                                        </h1>
                                    </div>
                                    <div className="modal-body text_fontstyle text-center">
                                        <button type="button" className="text_fontstyle cta_bottonsstyle" data-toggle="modal"
                                            data-target="#save_changes-confirmed" data-dismiss="modal">
                                            Si
                                            </button>
                                        <button type="button" className="text_fontstyle cta_bottonsstyle cta_bottonsstyle-green margin_top"
                                            data-dismiss="modal">
                                            No
                                            </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="text_fontstyle m-5 cta_bottonsstyle cta_bottonsstyle-green" onClick={GoBack}>
                            Volver
                            </button>

                        <button type="button" className="text_fontstyle m-5 cta_bottonsstyle cta_bottonstyle-red" data-toggle="modal"
                            data-target="#del-account_modal">
                            Borrar cuenta
                            </button>
                        <div id="del-account_modal" className="modal fade" role="dialog">
                            <div className="modal-dialog">

                                <div className="modal-content">
                                    <div className="modal-header modal_background">
                                        <h1 className="modal-title subtitle_fontstyle text-center">
                                            <strong>¿Seguro qué quieres
                      <span className="delete_warning"> borrar </span>
                      tu cuenta de Encontralo?</strong>
                                        </h1>
                                    </div>
                                    <div className="modal-body text_fontstyle text-center modal_background">
                                        <button type="button" className="text_fontstyle cta_bottonsstyle cta_bottonsstyle-green"
                                            data-toggle="modal" data-target="#account_deleted-confirmed" data-dismiss="modal">
                                            Si
                                            </button>
                                        <button type="button" className="text_fontstyle cta_bottonsstyle margin_top" data-dismiss="modal">
                                            No
                                            </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="save_changes-confirmed" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="subtitle_fontstyle text-center">
                                Se han guardado los cambios de forma exitosa.
                                </h5>
                        </div>
                        <div className="modal-body">
                            <div className="modal-body d-flex flex-row justify-content-around text_fontstyle text-center modal_background">
                                <button type="button" className="text_fontstyle m-3 cta_bottonsstyle" data-dismiss="modal" onClick={GoBack}>
                                    Volver
                                     </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="account_deleted-confirmed" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="subtitle_fontstyle text-center">
                                Se ha borrado tu cuenta.
                                </h5>
                        </div>
                        <div className="modal-body">
                            <div className="modal-body d-flex flex-row justify-content-around text_fontstyle text-center modal_background">
                                <button type="button" className="text_fontstyle m-3 cta_bottonsstyle" data-dismiss="modal">
                                    Volver
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PersonalInfo


