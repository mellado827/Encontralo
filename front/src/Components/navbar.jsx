import React from 'react';
import Prelogin from './prelogin'
import {Link} from 'react-router-dom'

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Prelogin />
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
                    <a className="nav-link text_fontstyle" href="/#tutorial">¿Cómo funciona?</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text_fontstyle" href="/#tips">Tips</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text_fontstyle" href="/#about">Acerca de</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text_fontstyle" href="/#contact">Contacto</a>
                </li>
            </ul>
        </div>
    </nav>

)

export default Navbar