function race() {
    document.addEventListener("change", () => {
        if (document.getElementById("race").value != "") {
            document.getElementById("preview_race").textContent = `de raza ${document.getElementById("race").value} `
        } else {
            document.getElementById("preview_race").textContent = ``
        }
    });
}

export default race

