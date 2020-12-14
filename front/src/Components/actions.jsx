import React from "react"

const Actions = () => (

    <div className="calltoaction" id="calltoaction">
        <h1 className="title_fontstyle text-center margin_calltoactions">¿Qué querés hacer?</h1>
        <div className="calltoaction_buttons text_fontstyle">
            <a href="/difundir">
                <button className="text_fontstyle m-3 cta_bottonsstyle" >
                    Difundir desaparición
                </button>
            </a>
            <a href="/buscar">
                <button className="text_fontstyle m-3 cta_bottonsstyle" >
                    Buscar un animal perdido
                </button>
            </a>
            <a href="/encontrados">
                <button className="text_fontstyle m-3 cta_bottonsstyle" >
                    Ver animales encontrados
                </button>
            </a>
        </div>
    </div>

)

export default Actions