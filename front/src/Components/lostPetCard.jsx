import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'

function LostPetCard({pets}) {

    const moreInfo = (e, viralInfo) => {
        e.preventDefault()
        Swal.fire({
            title: 'SE BUSCA',
            text: viralInfo
          })
    }

   const foundPetUpload = async (petsToUpload) => {

        Swal.fire({
            title: 'Estás seguro?',
            text: "No vas a poder revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, apareció!'
        }).then(async (result) => {
            if (result.isConfirmed) {            
                
                Swal.fire({
                    title: "Cargando...",
                    text: "Espere un momento",
                    icon: "info",
                    showConfirmButton: false
                  });
                  
                try {
                    //uploading lost pet into encontrados table
                    const requestInit = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            nombreMascota: petsToUpload.nombreMascota,
                            tipoMascota: petsToUpload.tipoMascota,
                            estadoMascota: petsToUpload.estadoMascota,
                            departamentoPerdidoMascota: petsToUpload.departamentoPerdidoMascota,
                            idPublico: petsToUpload.idPublico,
                            imagenMascota: petsToUpload.imagenMascota,
                            encontradoInfo: "Apareció!"
                        })
                    }
                    const response = await fetch('http://localhost:9000/api/encontrados', requestInit)
                    if(response.status === 200) {

                        //delete lost pet
                        const linkToDelete = `http://localhost:9000/api/${petsToUpload.idPerdidos}`
                        try {
                            const response = await fetch(linkToDelete, {
                              method: "DELETE"
                            });
                            if (!response.ok) {
                                Swal.fire(
                                    'Error!',
                                    'No se pudo reportar el caso como encontrado. Intentalo de nuevo más tarde.',
                                    'error'
                                ) 
                            } else {
                                if (response.status == 200) {
                                    Swal.fire(
                                        '¡Caso resuelto!',
                                        `Nos alegramos mucho de que ${petsToUpload.nombreMascota ? petsToUpload.nombreMascota : ''} haya aparecido. 
                                        Cuidalo por favor para que no vuelva a suceder.`,
                                        'success'
                                      )
                                } else {
                                    Swal.fire(
                                        'Error!',
                                        'Hubo un error inesperado. Por favor intentalo más tarde.',
                                        'error'
                                      )
                                }
                            }
                          } catch (error) {
                            console.error(error);
                          }
                    }

                } catch (error) {
                    Swal.fire(
                        'Ha ocurrido un error inesperado!',
                        'Intentalo más tarde',
                        'error'
                      )
                    console.log(error)
                }  
            }
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
                    <h2 className="text_fontstyle text-center mt-2">{pet.nombreMascota ? pet.nombreMascota : ''}</h2>
                    </div>
                    <p className="text_fontstyle text-center mt-2">{pet.tipoMascota} {pet.estadoMascota} en {pet.departamentoPerdidoMascota}, {pet.localidadPerdidoMascota}</p>
                    <button className='cta_bottonsstyle text_fontstyle' onClick={(e) => moreInfo(e, pet.viralInfo)}>Más información</button>
                    <button className='cta_bottonsstyle text_fontstyle mt-1' onClick={() => foundPetUpload(pet)}>Encontrado!</button>
                </div>
            )
            )}
        </>
    )

}

export default withRouter(LostPetCard)
