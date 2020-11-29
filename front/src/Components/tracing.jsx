import React, { useState, useEffect } from 'react'
import Navbar from './navbar'
import { withRouter } from 'react-router-dom'
import LostPetCard from './lostPetCard'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
import axiosClient from '../config/axios'
import Error from './error'
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
        if (report) {
            Consult()
        }
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
    let hora = `${hour}:${minutes < 10 ? (`0${minutes}`) : minutes} hrs.`

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

    const arr = []

    const chequearUsuarioLogueado = async () => {
        if (token !== null) {
            const consultaCasosDeUsuario = await axiosClient.get(`/reportes/${decodedData.nickname}`)
            const comentariosPermitidosDeBorrar = consultaCasosDeUsuario.data.casosPorUsuario
            comentariosPermitidosDeBorrar.forEach(element => {
                arr.push(element.idPublico)
            })
            if (arr.includes(idcaso)) {

                if (document.getElementById("encontrado") && document.getElementById("edit_report")) {
                    document.getElementById("encontrado").style.display = "block"
                    document.getElementById("edit_report").style.display = "block"
                }
            }

        }
    }

    useEffect(() => {
        chequearUsuarioLogueado()
    }, [])

    const goToEditReport = () => {
        props.history.push(`/reportes/${idcaso}/editar`)
    }

    const [animalEncontrado, setAnimalEncontrado] = useState({})

    const capturarReporte = () => {
        report.forEach(element => {
            setAnimalEncontrado(element)
        });
    }

    useEffect(() => {
        capturarReporte()
    })

    const informacionADifundir = () => {

        const estado = () => {
            switch (animalEncontrado.estado) {
                case "Perdido":
                    return "que se había perdido"
                case "Encontrado":
                    return "que había sido encontrado"
                case "Robado":
                    return "que había sido robado"
            }
        }

        const realSex = () => {
            switch (animalEncontrado.sexo) {
                case "Macho":
                    const macho = `El ${animalEncontrado.tipoMascota} ${animalEncontrado.nombre ? animalEncontrado.nombre : ``} ${estado()}`
                    return macho
                case "Hembra":
                    const hembra = `La ${animalEncontrado.tipoMascota.substr(0, animalEncontrado.tipoMascota.length - 1) + "a"
                        }
            ${animalEncontrado.estado.toLowerCase().substr(0, animalEncontrado.estado.length - 1) + "a"} `
                    return hembra
                default:
                    break;
            }
        }

        const viralInfo = `¡Apareció! ${realSex()} en ${animalEncontrado.localidad}, ${animalEncontrado.departamento}, se reencontró con su responsable.
    ¡Muchas gracias a todos por haber compartido! #Uruguay #${animalEncontrado.departamento} #LaCalleNoEsHogarParaNadie #encontralo`

        return viralInfo
    }

    const subirAnimalEncontrado = async () => {

        Swal.fire({
            title: '¿Estás seguro/a?',
            text: `No vas a poder cancelar esta operación. El caso lo podrás ver en "Ver mis animales encontrados".`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, apareció!',
            cancelButtonText: 'Cancelar',
            customClass: {
                content: 'text_fontstyle'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                var formData = new URLSearchParams();
                formData.append('tipoMascota', animalEncontrado.tipoMascota)
                formData.append('estado', animalEncontrado.estado)
                formData.append('raza', animalEncontrado.raza)
                formData.append('nombre', animalEncontrado.nombre)
                formData.append('sexo', animalEncontrado.sexo)
                formData.append('descripcion', animalEncontrado.descripcion)
                formData.append('tieneChip', animalEncontrado.tieneChip)
                formData.append('fecha', animalEncontrado.fecha)
                formData.append('hora', animalEncontrado.hora)
                formData.append('departamento', animalEncontrado.departamento)
                formData.append('localidad', animalEncontrado.localidad)
                formData.append('lugar', animalEncontrado.lugar)
                formData.append('imagen', animalEncontrado.imagen)
                formData.append('nombreUsuario', animalEncontrado.nombreUsuario)
                formData.append('descripcionUsuario', animalEncontrado.descripcionUsuario)
                formData.append('informacionADifundir', informacionADifundir())
                formData.append('idPublico', animalEncontrado.idPublico)
                formData.append('usuario', animalEncontrado.usuario)
                formData.append('emailUsuario', animalEncontrado.emailUsuario)
                formData.append('celularUsuario', animalEncontrado.celularUsuario)
                formData.append('encontrado', true)

                const postAnimalEncontrado = await axiosClient.post('/encontrados', formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })

                const quitarCasoActivo = await axiosClient.delete(`/reportes/${animalEncontrado._id}`);


                if (postAnimalEncontrado.status === 200 && quitarCasoActivo.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Felicidades!',
                        text: `Nos alegramos mucho de que ${animalEncontrado.nombre ? animalEncontrado.nombre : ``} haya aparecido.
                         Te redigiremos a la sección Tips para que no vuelva a ocurrir.`,
                        width: 600,
                        padding: '3em',
                        backdrop: `
                    rgba(0, 0, 123, 0.4)
                    url("https://acegif.com/wp-content/uploads/2020/05/confetti.gif")
                    left top
                      `,
                        customClass: {
                            content: 'text_fontstyle'
                        }
                    })

                    setTimeout(() => {
                        props.history.push('/')
                    }, 2000);


                }
            }
        })

    }

    return (
        <>

            {
                report.length > 0 ?
                    <>
                        <Navbar />
                        <div className="report">
                            <div className="search d-flex flex-column justify-content-center">
                                <h1 className="text-center subtitle_fontstyle search_title mt-5 text-center">Reporte</h1>
                                <h2 className="text-center text_fontstyle search_title text-center"><u>Caso:</u> {idcaso} </h2>
                                <div className="d-flex flex-row justify-content-center mt-5">
                                    <button id="edit_report"
                                        onClick={goToEditReport}
                                        style={{ display: 'none' }}
                                        className="cta_bottonsstyle text_fontstyle">Editar reporte</button>
                                    <button id="encontrado"
                                        style={{ display: 'none' }}
                                        onClick={subirAnimalEncontrado}
                                        className="cta_bottonsstyle text_fontstyle ml-5">Encontrado</button>
                                </div>
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
                                        <div className="">
                                            <p className="text_fontstyle text-center">¿Tenés novedades?
                ¡<a href="/iniciarsesion" className="link">Iniciá sesión</a> para poder comentar!
                </p>
                                        </div>

                                        :
                                        <>
                                            <p className="text_fontstyle text-center mt-4">¿Tenés novedades? ¡Pasá la data!
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
                                        </>
                                    }
                                </div>

                                <p></p>

                            </div>
                        </div> </> : <Error />


            }


        </>
    )
}

export default withRouter(Comentarios)