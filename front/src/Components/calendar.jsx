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

        if (date && date.value != "") {
            let fecha = `${(date.getDate()) + "/" + (date.getMonth() + 1) + "/" + (date.getFullYear())}`
            console.log(fecha)
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
                isClearable={selectedInputDate}
                dateFormat="dd/MM/yyyy"
                maxDate={currentDay}
            />
        </div>
    )
}

export default Calendar