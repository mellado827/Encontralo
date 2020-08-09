function UsernameValidation() {

    let username = document.getElementById("username")
    let signup_form = document.getElementById("signup_form")
    let validUser = document.getElementById("validUser")

    if (username.value !== "") {
        signup_form.classList.add("valid");
        validUser.innerHTML = "Usuario válido";
        validUser.style.color = "#267888";
    } else {
        signup_form.classList.remove("valid");
        validUser.innerHTML = "";
    }
}

export default UsernameValidation 