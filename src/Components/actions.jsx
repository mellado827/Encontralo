import React from "react"

const Actions = () => (

    <div className="calltoaction" id="calltoaction">
        <h1 className="title_fontstyle text-center p-5">¿Qué deseas hacer?</h1>
        <div className="calltoaction_buttons text_fontstyle">
            <a href="/">
                <button className="text_fontstyle m-3 cta_bottonsstyle" >
                    Reportar desaparición
                </button>
            </a>
            <a href="/buscar">
                <button className="text_fontstyle m-3 cta_bottonsstyle" >
                    Buscar un animal perdido
                </button>
            </a>
            <a href="/">
                <button className="text_fontstyle m-3 cta_bottonsstyle" >
                    Ver mis casos
                </button>
            </a>
        </div>
    </div>

)

export default Actions