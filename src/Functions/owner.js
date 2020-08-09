function owner() {
    let preview_ownerName = document.getElementById("preview_ownerName")
    let owner_name = document.getElementById("owner_name")
    let owner_description = document.getElementById("owner_description")
    let preview_ownerdescription = document.getElementById("preview_ownerdescription")

    owner_name.value !== ""
        ? preview_ownerName.textContent = `El/la responsable es: ${owner_name.value}`
        : preview_ownerName.textContent = ``

    owner_description.value !== ""
        ? preview_ownerdescription.textContent = `, algunos datos adicionales del/la responsable: ${owner_description.value}`
        : preview_ownerdescription.textContent = ``
}

export default owner