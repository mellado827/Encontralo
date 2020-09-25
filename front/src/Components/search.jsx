import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
// import Date from './calendar'
import axiosClient from '../config/axios'
import LostPetCard from './lostPetCard'

function Search() {

    const [reports, saveReports] = useState([])

    const APIconsult = async () => {
        const reportsConsult = await axiosClient.get('/reportes')

        saveReports(reportsConsult.data)
    }

    useEffect(() => {
        APIconsult()
    }, [])

    document.title = "Encontralo - Buscar"

    return (
        <>

            <Navbar />

            <div className="search_container">

                <div className="search">

                    <h1 className="text-center subtitle_fontstyle search_title">Buscar un animal perdido</h1>

                    <form className="search_form">
                        {/* <div className="last_timeseen d-flex flex-column mt-4">
                            <label className="mt-4 text_fontstyle text-center"> <u>Fecha</u> <strong>*</strong></label>

                            {<Date />}
                        </div> */}

                        <div className="pet_type flex-column row_petsform mt-5 d-flex justify-content-center">
                            <label className="text_fontstyle text-center">Tipo de mascota</label>
                            <select id="pet_type" name="pet_type" className="text_fontstyle pettype_size">
                                <option value="dog">Perro</option>
                                <option value="cat">Gato</option>
                            </select>
                        </div>

                        <div className="finder flex-column m-5">
                            <input type="text" placeholder="Nombre, localización o ID del reporte." className="text_fontstyle" />
                        </div>

                        <div className="search_button flex-column m-3">
                            <button type="submit" className="text_fontstyle cta_bottonsstyle">Buscar</button>
                        </div>

                        <div className="d-flex reportCards">
                            {reports.map(reports => (
                                <LostPetCard
                                    key={reports._id}
                                    report={reports}
                                />
                            ))}
                        </div>


                    </form>


                </div>
            </div>
        </>
    )
}


export default Search   