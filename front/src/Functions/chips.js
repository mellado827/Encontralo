function chips() {
    document.addEventListener("change", () => {
        if (document.getElementById("chipAfirmative").checked == true)
            document.getElementById("preview_chipText").textContent = " Tiene chip.";
    })

    document.addEventListener("change", () => {
        if (document.getElementById("chipNegative").checked == true)
            document.getElementById("preview_chipText").textContent = " No tiene chip.";

    })

    document.addEventListener("change", () => {
        if (document.getElementById("chipUncertain").checked == true)
            document.getElementById("preview_chipText").textContent = " No se sabe si tiene chip.";
    })

}

export default chips