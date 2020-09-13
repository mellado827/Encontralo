function validatePassword() {
    let signup_form = document.getElementById("signup_form");
    let passwordSignUpValue = document.getElementById("passwordLogin").value;
    let passwordValid = document.getElementById("passwordValid");
    let passwordSyntaxisAclaration = document.getElementById(
        "passwordSyntaxisAclaration"
    );
    let passwordSyntaxis = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

    if (passwordSignUpValue.match(passwordSyntaxis)) {
        signup_form.classList.add("valid");
        signup_form.classList.remove("invalid");
        passwordValid.innerHTML = "Contraseña válida";
        passwordValid.style.color = "#267888";
        passwordSyntaxisAclaration.innerHTML = "";
    } else {
        signup_form.classList.add("invalid");
        signup_form.classList.remove("valid");
        passwordValid.innerHTML = "Contraseña inválida.";
        passwordValid.style.color = "red";
        passwordSyntaxisAclaration.innerHTML =
            "Su contraseña debe tener al menos 8 caracteres, una mayúscula y un número.";
    }

    if (passwordSignUpValue === "") {
        signup_form.classList.remove("invalid");
        signup_form.classList.remove("valid");
        passwordValid.innerHTML = "";
    }
}

export default validatePassword