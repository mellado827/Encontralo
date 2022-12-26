import React from 'react'
import { withRouter } from 'react-router-dom'

function LostPetCard({pets}) {

   return (
        <>
            {pets.map( pet => (
                <div className="pet1" key ={pet.id}>
                    <div className="pet_photo">
                        <img src={pet.imagenMascota} alt="Imagen" className='petPhoto' />
                    </div>
                    <div className="petinfo">
                    <h2 className="text_fontstyle text-center mt-2">{pet.nombreMascota ? pet.nombreMascota : pet.tipoMascota}</h2>
                    </div>
                    <p className="text_fontstyle text-center mt-2">{pet.tipoMascota} {pet.estadoMascota} en {pet.departamentoPerdidoMascota}, {pet.localidadPerdidoMascota}</p>
                    <a className='cta_bottonsstyle text_fontstyle' href="/" data-toggle="modal" data-target=".bd-example-modal-lg">Más información</a>
                    {/* modal */}
                    <div className="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel"
                    aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="logoANDclose">
                                    <a href="/" data-dismiss="modal">
                                        <img src="./img/close.png" className="close_button" alt="close button" />
                                    </a>
                                </div>
                                <h1 className="subtitle_fontstyle text-center">
                                    <strong>
                                        <span className="color_numHIW"></span>SE BUSCA
                                    </strong>
                                </h1>
                                <p className="text_fontstyle m-2 text-center">
                                 {pet.viralInfo}
                                </p>
                            </div>
                        </div>
                   </div>
                </div>
            )
            )}
        </>
    )

}

export default withRouter(LostPetCard)
