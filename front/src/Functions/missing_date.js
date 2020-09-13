function missingDate() {
    let missing_date = document.getElementById("missing_date")
    let preview_date = document.getElementById("preview_date")

    missing_date.value != ""
        ? preview_date.textContent = `el día ${missing_date.value}`
        : preview_date.textContent = ``


}

export default missingDate