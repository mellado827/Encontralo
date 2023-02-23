import React, {useState,useEffect} from 'react'
import Navbar from './navbar'
import FoundPetCard from './foundPetCard'
import CeroCases from './cerocases'

function Found() {

    document.title = "Encontralo - animales encontrados"

    const [foundPets, setFoundPets] = useState([])
    const [foundPetsLength, setFoundPetLength] = useState('')

        //get all found pets when page is loaded
        useEffect(() => {
            const getLostFromDB = () => {
             fetch('http://localhost:9000/api/encontrados')
             .then(res => res.json())
             .then(res => {
                setFoundPets(res)
                setFoundPetLength(res.length)
             })
            }
            getLostFromDB()
         }, [])
     

        const renderLostPets = () => {
            if (foundPetsLength > 0) {
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

                <div className="search search_container">

                    <h1 className="text-center subtitle_fontstyle search_title mt-5">
                        <strong>Animales encontrados</strong>
                    </h1>
                    <div>
                        <form className="search_form">
                            <div className="search_button flex-column m-3">
                                <button
                                    id="search_button"
                                    className="text_fontstyle cta_bottonsstyle">Buscar</button>
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