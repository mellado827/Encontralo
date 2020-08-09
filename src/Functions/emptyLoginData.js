function emptyDataLogin() {
    if (document.getElementById("emailLogin").value === "" && document.getElementById("passwordLogin").value === "") {
        return alert("Ingrese su correo y contraseña");

    }

    if (document.getElementById("emailLogin").value === "") {
        return alert("Ingrese su correo electrónico");

    }

    if (document.getElementById("passwordLogin").value === "") {
        return alert("Ingrese su contraseña");

    }
}

export default emptyDataLogin