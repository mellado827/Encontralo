import React, {useState, useEffect} from 'react'
import Navbar from './navbar'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import CeroCases from './cerocases'
import LostPetCard from './lostPetCard'

function Search() {

    document.title = "Buscar / Encontralo";

    const [pets, setPets] = useState([])
    const [lostPetLength, setLostPetLength] = useState('')
    const [typePetInputByUser, setTypePetInputByUser] = useState('')

    //get all lost pets when page is loaded
    useEffect(() => {
       const getLostFromDB = () => {
        fetch('http://localhost:9000/api')
        .then(res => res.json())
        .then(res => {
            setPets(res)
            setLostPetLength(res.length)
        })
       }
       getLostFromDB()
    }, [])

    const modalErrorNotFound = () => {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No hemos encontrado ningún registro según la búsqueda.'
            })
    }

    const getTypePet = (e) => {
        setTypePetInputByUser(e.target.value)
    }

    const getTypePetByUser = (e) => {
        e.preventDefault()
        if(typePetInputByUser == "") {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ingresá algún dato para así poder hacer la búsqueda.'
            })
        } else if (!isNaN(typePetInputByUser)) {
            fetch(`http://localhost:9000/api/idPublico/${typePetInputByUser}`)
            .then(res => res.status == 404 ? modalErrorNotFound() : res.json()
            .then(res => setPets(res)))
            setTypePetInputByUser('')
        } else if (typePetInputByUser == 'Perro' || typePetInputByUser == 'Gato'
        || typePetInputByUser == 'Conejo' || typePetInputByUser == 'Loro') {
            fetch(`http://localhost:9000/api/tipoMascota/${typePetInputByUser}`)
            .then(res => res.status == 404 ? modalErrorNotFound() : res.json()
            .then(res => setPets(res)))
            setTypePetInputByUser('')
        } else {
            var xd = fetch(`http://localhost:9000/api/departamento/${typePetInputByUser}`)
            .then(res => res.status == 404 ? modalErrorNotFound() : res.json()
            .then(res => setPets(res)))
            setTypePetInputByUser('')
        }
    }

    const renderLostPets = () => {
        if (lostPetLength > 0) {
            return(
                <div className='pets_container'>
                    <LostPetCard pets={pets} />
                </div>
            )
        } else {
            return <CeroCases />
        }
    }

    return (
        <>

            <Navbar />

            <div className="search_container">

                <div className="search text-center">
                    <h1 className="subtitle_fontstyle search_title mt-5">Buscar un animal perdido</h1>
                    <label className='text_fontstyle'>
                        {lostPetLength > 0 
                        ? 'Buscá el caso por tipo de mascota, departamento o ID de caso:'
                        : ''}
                    </label>
                    <form className="search_form" onChange={getTypePet}>
                        <div className="finder flex-column">
                            <div className="d-flex flex-row justify-content-center">
                                <input 
                                name='inputName'
                                type='text' 
                                placeholder='Ingresa tu búsqueda aquí.' 
                                onChange={(e) => getTypePet(e)}
                                value={typePetInputByUser}
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
        </>
    )
}


export default withRouter(Search)