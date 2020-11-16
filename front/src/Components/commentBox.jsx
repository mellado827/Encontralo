import React from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
import axiosClient from '../config/axios'
import { useEffect } from 'react'

function CommentBox(props) {
    let comentario = props.commentDB

    let idcaso = props.match.params.idCaso

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

    const deleteComment = () => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No vas a poder revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar',
            customClass: {
                content: 'text_fontstyle'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    title: 'Comentario borrado',
                    text: 'Esperemos que no haya sido un comentario troll. Recargá la página para ver los cambios.',
                    icon: 'success',
                    customClass: {
                        content: 'text_fontstyle'
                    }
                })

                await axiosClient.delete(`/comentarios/${comentario._id}`)
            }


        })

    }


    return (
        <>
            <div className="text_fontstyle" id="CajaComentario">
                <p>Mensaje: {comentario.comentario}</p>
                <p>De: {comentario.usuarioRemitente} - {comentario.fechaComentario} a las {comentario.horaComentario}</p>
                {token != null && (decodedData.nickname === comentario.usuarioRemitente)
                    ?
                    <img
                        id="delete_button"
                        className="delete_button"
                        title="Eliminar comentario"
                        src="../../img/bin.png"
                        onClick={deleteComment}
                    ></img>
                    : null
                }
                <p>-------</p>
            </div>
        </>
    )

}

export default withRouter(CommentBox)
