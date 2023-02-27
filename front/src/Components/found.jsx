import React, {useState,useEffect} from 'react'
import Navbar from './navbar'
import Swal from 'sweetalert2'
import FoundPetCard from './foundPetCard'
import CeroCases from './cerocases'

function Found() {

    document.title = "Encontralo - animales encontrados"

    const [foundPets, setFoundPets] = useState([])
    const [allFoundPets, setAllFoundPets] =useState('')
    const [inputUser, setInputUser] = useState('')
    
    const getInputUser = (e) => {
        setInputUser(e.target.value)
    }

    const modalErrorNotFound = () => {
        return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hemos encontrado ningún registro según la búsqueda.'
        })
    }

    const getTypePetByUser = (e) => {
        e.preventDefault()
        if(inputUser == "") {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresá algún dato para así poder hacer la búsqueda.'
            })
        } else if (!isNaN(inputUser)) {
            fetch(`http://localhost:9000/api/encontradosidPublico/${inputUser}`)
            .then(res => res.status == 404 ? modalErrorNotFound() : res.json()
            .then(res => setFoundPets(res)))
            setFoundPets('')
        } else if (inputUser == 'Perro' || inputUser == 'Gato'
        || inputUser == 'Conejo' || inputUser == 'Loro') {
            fetch(`http://localhost:9000/api/encontradosTipoMascota/${inputUser}`)
            .then(res => res.status == 404 ? modalErrorNotFound() : res.json()
            .then(res => setFoundPets(res)))
            setFoundPets('')
        } else {
            fetch(`http://localhost:9000/api/encontradosDepartamentoMascota/${inputUser}`)
            .then(res => res.status == 404 ? modalErrorNotFound() : res.json()
            .then(res => setFoundPets(res)))
            setFoundPets('')
        }
    }
        //get all found pets when page is loaded
        useEffect(() => {
            const getLostFromDB = () => {
             fetch('http://localhost:9000/api/encontrados')
             .then(res => res.json())
             .then(res => {
                setFoundPets(res)
                setAllFoundPets(res.length)
             })
            }
            getLostFromDB()
         }, [])
     

        const renderLostPets = () => {
            if (foundPets.length > 0) {
                return(
                    <div className='pets_container'>
                        <FoundPetCard pets={foundPets} />
                    </div>
                )
            } else {
                return <CeroCases />
            }
        }

    return (
        <>
            { <>
                <Navbar />

                <div className="search search_container text-center">

                    <h1 className="text-center subtitle_fontstyle search_title mt-5">
                        <strong>Animalitos encontrados</strong>
                    </h1>
                    <label className='text_fontstyle'>
                        {allFoundPets > 0 
                        ? `Actualmente hay ${allFoundPets} animalitos perdidos.
                          Buscá el tuyo por tipo de mascota, departamento o ID de caso:`
                        : ''}
                    </label>
                    <div>
                    <form className="search_form" onChange={getInputUser}>
                        <div className="finder flex-column">
                            <div className="d-flex flex-row justify-content-center">
                                <input 
                                name='inputName'
                                type='text' 
                                placeholder='Ingresa tu búsqueda aquí.' 
                                className='text_fontstyle mt-3'>
                                </input>    
                            </div>
                        </div>
                        <div className="search_button flex-column m-3">
                            <button
                                id="search_button"
                                className="text_fontstyle cta_bottonsstyle mt-4"
                                onClick={(e) => getTypePetByUser(e)}
                                >Buscar</button>
                        </div>
                        {renderLostPets()}
                    </form>
                    </div>
                </div>
            </>}
        </>
    )
}
export default Found