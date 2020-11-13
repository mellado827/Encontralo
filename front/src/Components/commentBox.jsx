import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'

function CommentBox(props) {
    let comentario = props.commentDB

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

    return (
        <>
            <div className="">
                <div className="text_fontstyle">
                    <p>Mensaje: {comentario.comentario}</p>
                    <p>De: {comentario.usuarioRemitente} - {comentario.fechaComentario} a las {comentario.horaComentario}</p>
                    <p>----------</p>
                </div>

            </div>

        </>
    )

}

export default withRouter(CommentBox)
