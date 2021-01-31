import React from 'react'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'

function PreLogin() {

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

    const logout = e => {
        e.preventDefault()
        Swal.fire({
            title: '¿Estás seguro que deseas cerrar sesión?',
            text: "Te extrañaremos :(",
            customClass: {
                content: 'text_fontstyle'
            },
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Cerrar sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token")
                Swal.fire({
                    icon: 'success',
                    title: 'Has cerrado sesión',
                    text: '¡Hasta la próxima!',
                    customClass: {
                        content: 'text_fontstyle'
                    },
                    cancelButtonText: 'Cancelar'
                })
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            }
        })
    }

    return (
        <div>
            {token !== null ?
                <div className="dropdown">
                    <span className="dropbtn text_fontstyle">Hola, {decodedData.nickname}</span>
                    <div className="dropdown-content text_fontstyle">
                        <Link to="/difundir">Difundir desaparición</Link>
                        <Link to="/datospersonales">Datos personales</Link>
                        <Link to="/miscasos">Mis casos</Link>
                        <Link to={`/misencontrados/${decodedData.nickname}`}>Mis animales encontrados</Link>
                        <Link to="" onClick={logout}>Cerrar sesión</Link>
                    </div>
                </div>
                :
                <Link className="navbar-brand text_fontstyle" to="/iniciarsesion">
                    Iniciar sesión
                </Link>
            }
        </div>
    )

}

export default PreLogin