import React from 'react';
import navbarValidation from '../Functions/navbarValidation'

const Navbar = () => {

    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            {navbarValidation()}
        </div>
    </nav>
    )
}

export default Navbar