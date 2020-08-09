import React, { useState } from 'react'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

const Calendar = () => {

    const [selectedDate, setSelectedDate] = useState(null)
    const [currentDay] = useState(new Date());

    const selectedInputDate = date => {
        setSelectedDate(date);

        if (date && document.getElementById("preview_date") != null) {
            document.getElementById("preview_date").textContent =
                ` el día ${(date.getDate()) + "/" + (date.getMonth() + 1) + "/" + (date.getFullYear())}`
        }
    };

    return (

        <div className="d-flex justify-content-center text_fontstyle">
            <Datepicker
                id="missing_date"
                placeholderText="Introduce la fecha"
                selected={selectedDate}
                onChange={selectedInputDate}
                locale="es"
                dateFormat="dd/MM/yyyy"
                isClearable
                maxDate={currentDay}
            />
        </div >
    )
}

export default Calendar