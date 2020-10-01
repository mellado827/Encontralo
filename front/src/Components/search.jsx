import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import Swal from 'sweetalert2'
import axiosClient from '../config/axios'
import LostPetCard from './lostPetCard'
import { Link } from 'react-router-dom'

function Search() {

    const [reports, saveReports] = useState([])

    const APIconsult = async () => {
        const reportsConsult = await axiosClient.get('/reportes')
        saveReports(reportsConsult.data)
    }


    document.title = "Encontralo - Buscar"

    useEffect(() => {
        APIconsult()

    }, [])

    const [input, setInput] = useState({})

    const id = e => {
        e.preventDefault()
        setInput(e.target.value)
    }

    return (
        <>

            <Navbar />

            <div className="search_container">

                <div className="search">

                    <h1 className="text-center subtitle_fontstyle search_title">Buscar un animal perdido</h1>

                    <form className="search_form">

                        <div className="finder flex-column m-5">
                            <input type="text"
                                id="input"
                                onChange={id}
                                placeholder="Nombre, localización o ID del reporte."
                                className="text_fontstyle" />
                        </div>

                        <div className="search_button flex-column m-3">
                            <Link
                                to={`/reportes/${input}`}
                                id="button"
                                className="text_fontstyle cta_bottonsstyle">Buscar</Link>
                        </div>


                        <div className="d-flex reportCards">
                            {reports.map(report => (
                                <LostPetCard
                                    key={report._id}
                                    report={report}
                                />
                            )
                            )}
                        </div>


                    </form>


                </div>
            </div>
        </>
    )
}


export default Search   