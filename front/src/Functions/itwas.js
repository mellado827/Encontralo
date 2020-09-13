function itwas() {
    let itwas = document.getElementById("itwas")
    let preview_itwas = document.getElementById("preview_itwas")

    switch (itwas.value) {
        case "stolen":
            preview_itwas.textContent = `Robaron `
            break;

        case "lost":
            preview_itwas.textContent = `Se perdió `
            break;

        case "founded":
            preview_itwas.textContent = `Se encontró `
            break;

        default:
            preview_itwas.textContent = `Se perdió `
            break;
    }

}

export default itwas