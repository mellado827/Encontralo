function previewButtonData() {
    document.getElementById("preview_petType").textContent = `${document.getElementById("pet_type").value} `
    document.getElementById("preview_departament").textContent = `${document.getElementById("select_departament").value}`

    switch (document.getElementById("select_departament").value) {
        case "San José":
            document.getElementById("hastag_preview_departament").textContent = ` #SanJose `
            break;
        case "Río Negro":
            document.getElementById("hastag_preview_departament").textContent = ` #RioNegro `
            break;
        case "Cerro Largo":
            document.getElementById("hastag_preview_departament").textContent = ` #CerroLargo `
            break;
        case "Treinta y tres":
            document.getElementById("hastag_preview_departament").textContent = ` #TreintayTres `
            break;
        default:
            document.getElementById("hastag_preview_departament").textContent = ` #${document.getElementById("select_departament").value} `
            break;
    }

    document.getElementById("preview_zone").textContent = `${document.getElementById("zone").value}`
    document.getElementById("preview_place").textContent = `${document.getElementById("last_placePet").value}`
    if (document.getElementById("missing_hour").value != "") {
        document.getElementById("preview_missing_hour").textContent = ` a las ${document.getElementById("missing_hour").value} `
    } else {
        document.getElementById("preview_missing_hour").textContent = ``
    }

    document.getElementById("preview_petDescription").textContent = ` ${document.getElementById("pet_description").value} `

}

export default previewButtonData