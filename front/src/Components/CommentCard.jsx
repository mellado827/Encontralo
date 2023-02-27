import React from 'react'
import { withRouter } from 'react-router-dom'

function CommentCard({comments}) {

      return (
        <>
            {comments.map(comment => (
                <div 
                    key={comment.idComentarios} className='commentBox'>
                    <div className='commentItems'>
                        <p><strong>Comentario:</strong> {comment.mensajeComentario}</p>
                        <p><strong>Autor:</strong> {comment.creadorComentario}</p>
                        <p><strong>Fecha:</strong> {comment.fechaCreacionComentario} a las {comment.horaCreacionComentario}</p>          
                    </div>      
                </div>
            )
            )}
        </>
    )

}

export default withRouter(CommentCard)
