import React from 'react'
import Year from '../Functions/year'

const Footer = () => (

    <div className="modal-footer">
        <p className="text_fontstyle">
            <span id="year">{Year()}</span>
            <span role="img" className="text_fontstyle" aria-label="copyright"> © </span>
        Encontralo
                <span role="img" className="text_fontstyle" aria-label="uruguay"> 🇺🇾 </span>
        </p>
    </div>

)


export default Footer