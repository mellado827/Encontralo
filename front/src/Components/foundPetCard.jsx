import React from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'

function FoundPetCard({pets}) {

    const moreInfo = (e, viralInfo) => {
        e.preventDefault()
        Swal.fire({
            title: '¡APARECIÓ!',
            text: viralInfo
          })
    }

      return (
        <>
            {pets.map( pet => (
                <div className="pet1" key ={pet.id}>
                    <div className='petPhotoContainer'>
                        <img 
                            src={pet.imagenMascota} 
                            alt="Imagen" 
                            className='petPhoto' 
                            onClick={(e) => moreInfo(e, pet.viralInfo)}
                            />
                        {/* <div>
                            <FontAwesomeIcon className='petButton' icon={faEye} />
                        </div> */}
                    </div>
                    <div className="petinfo">
                    <h2 
                        className="text_fontstyle text-center mt-2">
                        {pet.nombreMascota ? pet.nombreMascota : ''}    
                    </h2>
                    </div>
                    <p className="text_fontstyle text-center mt-2">
                        {pet.tipoMascota} que estaba {pet.estadoMascota} en {pet.departamentoPerdidoMascota}, 
                        {pet.localidadPerdidoMascota}
                    </p>
                </div>
            )
            )}
        </>
    )

}

export default withRouter(FoundPetCard)
