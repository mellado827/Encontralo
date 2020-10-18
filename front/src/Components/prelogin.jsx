import React from 'react'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'


function PreLogin(props) {

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

    return (
        <a className="navbar-brand text_fontstyle" href="/iniciarsesion">
            {token === null ? `Iniciar sesión` : `Hola, ${decodedData.nickname}`}
        </a>
    )

}

export default PreLogin