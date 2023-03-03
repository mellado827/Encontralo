import React from "react"
import {Link} from 'react-router-dom'

const Actions = () => (

    <div className="calltoaction" id="quehacer">
        <h1 className="title_fontstyle text-center margin_calltoactions">¿Qué querés hacer?</h1>
        <div className="calltoaction_buttons text_fontstyle">
            <Link to="/difundir">
                <button className="text_fontstyle m-3 cta_bottonsstyle" >
                    Difundir desaparición
                </button>
            </Link>
            <Link to="/buscar">
                <button className="text_fontstyle m-3 cta_bottonsstyle" >
                    Buscar un animal perdido
                </button>
            </Link>
            <Link to="/encontrados">
                <button className="text_fontstyle m-3 cta_bottonsstyle" >
                    Ver animales encontrados
                </button>
            </Link>
        </div>
    </div>

)

export default Actions