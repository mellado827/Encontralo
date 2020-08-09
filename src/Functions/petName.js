function petName() {
    document.getElementById("pet_name").addEventListener("change", () => {
        if (document.getElementById("pet_name").value != "") {
            document.getElementById("preview_petName").textContent = `responde al nombre de ${document.getElementById("pet_name").value}.`;
        } else {
            document.getElementById("preview_petName").textContent = 'se desconoce el nombre.'
        }
    });
}

export default petName