function previewButtonData() {
    document.getElementById("preview_petType").textContent = `${document.getElementById("pet_type").value} `
    document.getElementById("preview_departament").textContent = `${document.getElementById("select_departament").value}`
    document.getElementById("hastag_preview_departament").textContent = ` #${document.getElementById("select_departament").value} `
    document.getElementById("preview_zone").textContent = `${document.getElementById("zone").value}`
    document.getElementById("preview_place").textContent = `${document.getElementById("last_placePet").value}`
    document.getElementById("preview_missing_hour").textContent = ` a las ${document.getElementById("missing_hour").value} `
    document.getElementById("preview_petDescription").textContent = ` ${document.getElementById("pet_description").value} `

}

export default previewButtonData