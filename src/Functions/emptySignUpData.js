function emptySignUpData() {

    if (document.getElementById("emailSignUp").value === "" ||
        document.getElementById("passwordLogin").value === "" ||
        document.getElementById("username").value === "" ||
        document.getElementById("user_cellphone").value === "") {
        alert("Ingrese todos los datos");
        return false;
    } else {
        alert("Ya sabe");
        return true;
    }

}

export default emptySignUpData