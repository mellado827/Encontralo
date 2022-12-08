import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link text_fontstyle" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text_fontstyle" to="/#calltoaction">¿Qué querés hacer?</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text_fontstyle" to="/#tutorial">¿Cómo funciona?</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text_fontstyle" to="/#tips">Tips</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text_fontstyle" to="/#about">Acerca de</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text_fontstyle" to="/#contact">Contacto</Link>
                </li>
            </ul>
        </div>
    </nav>

)

export default Navbar