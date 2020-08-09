function previewButtonDisplay() {

    let img = document.getElementById("img")
    document.getElementById("preview_button").style.display = "none";

    document.addEventListener("change", () => {
        if (
            document.getElementById("pet_type").value !== "selection" &&
            document.getElementById("itwas").value !== "selection" &&
            document.getElementById("pet_sex").value !== "selection" &&
            document.getElementById("pet_description").value !== "" &&
            (document.getElementById("chipAfirmative").checked == true ||
                document.getElementById("chipUncertain").checked == true ||
                document.getElementById("chipNegative").checked == true) &&
            document.getElementById("select_departament").value != "selection" &&
            document.getElementById("zone").value !== "" &&
            document.getElementById("last_placePet").value != "" &&
            img.src !== "https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
        ) {
            document.getElementById("preview_button").style.display = "block";
        } else {
            document.getElementById("preview_button").style.display = "none";
        }

    })

}

export default previewButtonDisplay