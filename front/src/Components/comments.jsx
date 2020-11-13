import React, { useState, useEffect } from 'react'
import Navbar from './navbar'
import { withRouter } from 'react-router-dom'
import LostPetCard from './lostPetCard'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
import axiosClient from '../config/axios'
import CommentBox from './commentBox'

function Comentarios(props) {
    let idcaso = props.match.params.idCaso

    const [report, saveReports] = useState([])
    const [commentDB, setCommentDB] = useState([])

    const Consult = async () => {
        const reportConsult = await axiosClient.get(`/reportes/${idcaso}`)
        saveReports(reportConsult.data.reportePorIDpublico)

        const commentConsult = await axiosClient.get(`/comentarios/${idcaso}`)
        setCommentDB(commentConsult.data)
    }

    useEffect(() => {
        Consult()
    }, [])

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

    const [comentarioBD, setComentarioBD] = useState({
        comentario: ''
    })

    const date = new Date()
    const actualDay = (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)

    const updateState = e => {
        setComentarioBD({
            ...comentarioBD,
            [e.target.name]: e.target.value,
        })
    }

    var minutes = date.getMinutes();
    var hour = date.getHours();
    let hora = `${hour}:${minutes}`

    const addComment = e => {
        e.preventDefault()

        var data = new URLSearchParams()
        data.append('comentario', comentarioBD.comentario)
        data.append('usuarioRemitente', decodedData.nickname)
        data.append('casoComentado', idcaso)
        data.append('fechaComentario', actualDay)
        data.append('horaComentario', hora)

        if (comentarioBD.comentario === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ups! Parece que hubo un problema',
                text: 'Ingresá un mensaje para poder comentar.',
                customClass: {
                    content: 'text_fontstyle'
                }
            })
        } else {
            try {

                Swal.fire({
                    title: '¿Estás seguro/a?',
                    text: "Un comentario puede ser modificado después de haber sido creado, pero la información modificada quedaría en el sitio, no al difundirse el reporte. Si llegás a realizar un comentario troll, tu cuenta será eliminada.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, quiero reportar!',
                    cancelButtonText: 'Cancelar',
                    customClass: {
                        content: 'text_fontstyle'
                    }
                }).then(async (result) => {
                    if (result.isConfirmed) {

                        await axiosClient.post('/comentarios', data, {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                            }
                        })

                        Swal.fire({
                            icon: 'success',
                            title: '¡Comentario realizado!',
                            text: `Gracias por colaborar. Esperamos que tu aporte sea de ayuda`,
                            customClass: {
                                content: 'text_fontstyle'
                            }
                        })

                        setTimeout(() => {
                            window.location.reload()
                        }, 2000);

                    }

                })

            } catch (error) {

                Swal.fire({
                    title: 'Hubo un error',
                    text: `Inténtalo de nuevo más tarde`,
                    icon: 'error',
                    customClass: {
                        content: 'text_fontstyle'
                    }
                })
                console.log(error)
            }
        }


    }

    return (
        <>
            <Navbar />
            <div className="report">
                <div className="search">
                    <h1 className="text-center subtitle_fontstyle search_title mt-5 text-center">Seguimiento</h1>
                    <h2 className="text-center text_fontstyle search_title text-center"><u>Caso:</u> {idcaso} </h2>
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    {
                        report.map(reporte => (
                            <LostPetCard
                                key={reporte._id}
                                report={reporte}
                            />
                        )
                        )}
                    <div className="d-flex flex-column flex-wrap justify-content-center align-items-center">
                        <h2 className="subtitle_fontstyle mt-5"> {commentDB.length === 0 ? 'Comentarios' : `${commentDB.length} comentarios`}</h2>
                        {commentDB.length !== 0 ?
                            <div className="commentBox">
                                {commentDB.map(comentarios => (
                                    <CommentBox
                                        key={comentarios._id}
                                        commentDB={comentarios}
                                    />
                                )
                                )
                                }
                            </div> :
                            <span className="text_fontstyle">0 comentarios :(</span>}


                        {token === null ?
                            <div className="d-flex flex-column flex-wrap justify-content-center align-items-center mt-5">
                                <p className="text_fontstyle text-center">¿Tenés novedades?
                                ¡<a href="/iniciarsesion" className="link">Iniciá sesión</a> para poder comentar!
                                </p>
                            </div>

                            :
                            <div className="d-flex flex-column flex-wrap justify-content-center align-items-center mt-5">
                                <p className="text_fontstyle text-center">¿Tenés novedades? ¡Pasá la data!
                                </p>
                                <textarea
                                    rows="5"
                                    cols="35"
                                    name="comentario"
                                    maxLength="300"
                                    required={true}
                                    onChange={updateState}
                                    className="text_fontstyle"></textarea>
                                <button
                                    className="cta_bottonsstyle mt-3 mb-3 text_fontstyle"
                                    onClick={addComment}
                                >Comentar</button>
                            </div>}
                    </div>

                    <p></p>

                </div>
            </div>
        </>
    )
}

export default withRouter(Comentarios)