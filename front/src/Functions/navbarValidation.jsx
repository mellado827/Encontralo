import React from 'react';
import {Link} from 'react-router-dom'
import scrollToAction from './scrollToAction';
import scrollToTutorial from './scrollToTutorial';
import scrollToTips from './scrollToTips';
import scrollToContact from './scrollToContact';
import scrollToAbout from './scrollToAbout';

function pathNameIncludesLetters() {
    const pattern = /[a-zA-Z]/ // Expresión regular que busca letras mayúsculas o minúsculas
    let home = !pattern.test(window.location.pathname);

    if(home) {
        debugger;
       return(
       <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link text_fontstyle" onClick={scrollToAction}>¿Qué deseas hacer?</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text_fontstyle" onClick={scrollToTutorial}>Tutorial</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text_fontstyle" onClick={scrollToTips}>Tips</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text_fontstyle" onClick={scrollToAbout}>Acerca de</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text_fontstyle" onClick={scrollToContact}>Contacto</a>
            </li>
        </ul>
        )  
    } else {
        return (<ul className="navbar-nav">
        <li className="nav-item">
            <Link className="nav-link text_fontstyle" to="/">Volver a Inicio</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text_fontstyle" to="/difundir">Reportar perdido</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text_fontstyle" to="/buscar">Buscar perdidos</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text_fontstyle" to="/encontrados">Buscar encontrados</Link>
        </li>
    </ul>)
    }
  }

  export default pathNameIncludesLetters