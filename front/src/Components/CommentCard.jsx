import React from 'react'
import { withRouter } from 'react-router-dom'

function CommentCard({comments}) {

      return (
        <>
            {comments.map(comment => (
                <div key ={comment.idComentarios}>
                    Comentario: {comment.mensajeComentario}                
                </div>
            )
            )}
        </>
    )

}

export default withRouter(CommentCard)
