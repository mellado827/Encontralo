import React from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'

function LostPetCard({pets}) {

    const moreInfo = (viralInfo) => {
        Swal.fire({
            title: 'SE BUSCA',
            text: viralInfo
          })
    }

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
                    <button className='cta_bottonsstyle text_fontstyle' onClick={() => moreInfo(pet.viralInfo)}>Más información</button>
                    <button className='cta_bottonsstyle text_fontstyle mt-1'>Encontrado!</button>
                </div>
            )
            )}
        </>
    )

}

export default withRouter(LostPetCard)
