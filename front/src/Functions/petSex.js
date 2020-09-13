function petSex() {
    document.addEventListener("change", () => {
        if ((document.getElementById("pet_sex").value == "female") && (document.getElementById("pet_type").value == "perro")) {
            document.getElementById("un").textContent = " una "
            document.getElementById("preview_petType").textContent = " perra "
        }

        if ((document.getElementById("pet_sex").value == "male") && (document.getElementById("pet_type").value == "perro")) {
            document.getElementById("un").textContent = " un "
            document.getElementById("preview_petType").textContent = " perro "
        }

        if ((document.getElementById("pet_sex").value == "male") && (document.getElementById("pet_type").value == "gato")) {
            document.getElementById("un").textContent = " un "
            document.getElementById("preview_petType").textContent = " gato "
        }

        if ((document.getElementById("pet_sex").value == "female") && (document.getElementById("pet_type").value == "gato")) {
            document.getElementById("un").textContent = " una "
            document.getElementById("preview_petType").textContent = " gata "
        }
    })

}

export default petSex