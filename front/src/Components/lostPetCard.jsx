import React, {useState, useEffect} from 'react'
import moment from 'moment';
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import CommentCard from './CommentCard';

function LostPetCard({pets}) {

    const [commentsLength, setCommentsLength] = useState('')
    const [comments, setComments] = useState([])

     //get all comments
    useEffect(() => {
        pets.forEach(pet => {
        const getCommentsFromDB = async () => {
            const response = await fetch(`http://localhost:9000/api/comentarios/${pet.idPerdidos}`);
            const commentsForPet = await response.json();
            setComments(prevComments => ({ ...prevComments, [pet.idPerdidos]: commentsForPet }));
        };
        getCommentsFromDB();
        });
    }, [pets]);

    const renderComments = petId => {
        const commentsForPet = comments[petId];
        if (commentsForPet && commentsForPet.length > 0) {
          return (
            <div>
              <CommentCard comments={commentsForPet} />
            </div>
          );
        } else {
          return 'No hay comentarios.';
        }
      };      

       const petFoundViralInfo = (petsToUpload) => {

            const nombreMascota = petsToUpload.nombreMascota
            const sexoMascota = petsToUpload.sexoMascota
            const sexoMascotaParaTexto = petsToUpload.tipoMascotaOriginal
            const estadoMascota = petsToUpload.estadoMascota
            const departamento = petsToUpload.departamentoPerdidoMascota

            if(nombreMascota) {
                return `¡APARECIÓ ${nombreMascota}!
                Nos alegra informarles que ${sexoMascota == 'Hembra'? `la ${sexoMascotaParaTexto.toLowerCase()}` :
                `el ${sexoMascotaParaTexto.toLowerCase()}`}
                que habíamos reportado como ${estadoMascota.toLowerCase()} 
                en ${departamento} ya está de vuelta con su familia, ¡Gracias a todos por haber difundido!
                #Uruguay 
                #${petsToUpload.departamentoPerdidoMascota} 
                #LaCalleNoEsHogarParaNadie`
            }
    }

  const foundPetUpload = async (e, petsToUpload) => {
        e.preventDefault()

        Swal.fire({
            title: '¿Estás seguro? El texto sería el siguiente:',
            text: petFoundViralInfo(petsToUpload),
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
                  debugger;
                  
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
                            encontradoInfo: petFoundViralInfo(petsToUpload),
                            tipoMascotaOriginal: petsToUpload.tipoMascotaOriginal   
                        })
                    }
                    console.log(requestInit)
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
                                        `Nos alegramos mucho de que ${petsToUpload.nombreMascota ? petsToUpload.nombreMascota : ''} haya aparecido :).`,
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

    const [commentMessage, setCommentMessage] = useState('')
    let autorComment = ''

    const commentFunction = (e) => {
        setCommentMessage(e.target.value)
    }

    const postComment = async (e, idLostPet,idPublicLostPet, nombreMascota) => {
        e.preventDefault()

        if(commentMessage === undefined || commentMessage === null || commentMessage === '') {
        return (Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Si quieres comentar, debes escribir algo. Intentalo de nuevo.',
            className: 'text_fontstyle'
            }))
        }

        Swal.fire({
            title: 'Ingresa tu nombre por favor',
            text: 'Es un dato obligatorio.',
            input: 'text',
            inputPlaceholder: 'Ingresa tu nombre aquí...',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Listo',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                  return 'Debes ingresar tu nombre';
                } else { 
                    autorComment = value
                }
            }
        }).then(async (result) => {
            if(result.isConfirmed) {
                console.log(autorComment)
                Swal.fire({
                    title: '¿Estás seguro?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
                }).then(async (result) => {
                    if (result.isConfirmed) {       
                                       
                        Swal.fire({
                            title: "Cargando...",
                            text: "Espere un momento",
                            icon: "info",
                            showConfirmButton: false
                          });
                          
                        try {
                            //uploading comment of lost pet into comentarios table
                            const postComment = {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    creadorComentario: autorComment,
                                    mensajeComentario: commentMessage,
                                    fechaCreacionComentario: moment().format('YYYY-MM-DD HH:mm:ss'),
                                    idCasoPerdido: idLostPet,
                                    idPublicoCasoPerdido: idPublicLostPet
                                })
                            }
                            const response = await fetch('http://localhost:9000/api/comentarios', postComment)
                            const data = await response.json()
                            console.log(data)
                            if (data.errno) {
                                Swal.fire(
                                    'Ha ocurrido un error inesperado!',
                                    'Intentalo más tarde',
                                    'error'
                                  )
                            }
                             if(response.status === 200) {

                                 Swal.fire({
                                     icon:'success',
                                     title:'¡Comentario subido!',
                                     text:`¡Gracias por apoyar en la búsqueda ${nombreMascota ? `de ${nombreMascota}` : ``}!`
                                 }) } else {
                                     Swal.fire({
                                         text: 'Ha ocurrido un error inesperado, intentalo de nuevo más tarde.',
                                         title: '¡Error!',
                                         icon:'error'
                                     })
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
        }) 
    }

      return (
        <>
            {pets.map( pet => (
                <div className="pet1" key ={pet.idPerdidos}>
                    <div className='petPhotoContainer'>
                        <img 
                            src={pet.imagenMascota} 
                            alt="Imagen" 
                            className='petPhoto' 
                            data-toggle="modal" 
                            data-target={`#lostPetCard${pet.idPerdidos}`}
                        />

                     {/* comment modal */}
                      <div className="modal fade" id={`lostPetCard${pet.idPerdidos}`} role="dialog"
                        aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="logoANDclose">
                                    <a href="/" data-dismiss="modal">
                                        <img src="./img/close.png" className="close_button" alt="close button" />
                                    </a>
                                </div>
                                <h1 className="title_fontstyle text-center">
                                    <strong>
                                        SE BUSCA
                                    </strong>
                                </h1>
                                <div className='petPhotoContainer'>
                                    <img className="text-center petPhoto" src={pet.imagenMascota}></img>
                                </div>
                                <p className='text_fontstyle mt-3'>
                                    {pet.viralInfo}
                                </p>
                                <div className='postCommentBox'>
                                        <input 
                                            placeholder='Escribe tu comentario aquí...'
                                            className='inputComment text_fontstyle' 
                                            onChange={(e) => {commentFunction(e)}}
                                            />
                                        <button 
                                            className='text_fontstyle postCommentButton'
                                            onClick={(e) => {postComment(e, pet.idPerdidos, pet.idPublico, pet.nombreMascota)}}
                                            >Publicar
                                        </button>                                        
                                </div>
                                <div>
                                    {renderComments(pet.idPerdidos)}
                                </div>
                            </div>
                        </div>
                    </div>
                          
                    </div>
                    <div className="petinfo">
                    <h2 
                        className="text_fontstyle text-center mt-2">
                        {pet.nombreMascota ? pet.nombreMascota : ''}    
                    </h2>
                    </div>
                    <p className="text_fontstyle text-center mt-2">
                        {pet.tipoMascotaOriginal} actualmente {pet.estadoMascota} en {pet.departamentoPerdidoMascota}, 
                        {pet.localidadPerdidoMascota}
                    </p>
                    <button 
                        className='cta_bottonsstyle text_fontstyle mt-1' 
                        onClick={(e) => foundPetUpload(e,pet)}
                        >¡Apareció!
                    </button>
                </div>
            )
            )}
        </>
    )

}

export default withRouter(LostPetCard)
