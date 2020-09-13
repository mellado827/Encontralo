function validateEmail() {
    let signup_form = document.getElementById("signup_form")
    let signUpEmailValue = document.getElementById("emailSignUp").value;
    let signUpEmailValid = document.getElementById("signUpEmailValid");
    let emailSyntaxis = /^([!#-\'*+\/-9=?A-Z^-~\\\\-]{1,64}(\.[!#-\'*+\/-9=?A-Z^-~\\\\-]{1,64})*|"([\]!#-[^-~\ \t\@\\\\]|(\\[\t\ -~]))+")@([0-9A-Z]([0-9A-Z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Z]([0-9A-Z-]{0,61}[0-9A-Za-z])?))+$/i;

    if (signUpEmailValue.match(emailSyntaxis)) {
        signup_form.classList.add("valid");
        signup_form.classList.remove("invalid");
        signUpEmailValid.innerHTML = "Correo electronico válido";
        signUpEmailValid.style.color = "#267888";
    } else {
        signup_form.classList.add("invalid");
        signup_form.classList.remove("valid");
        signUpEmailValid.innerHTML = "Correo electronico inválido";
        signUpEmailValid.style.color = "red";

    }
    if (signUpEmailValue === "") {
        signup_form.classList.remove("invalid");
        signup_form.classList.remove("valid");
        signUpEmailValid.innerHTML = "";
    }
}


export default validateEmail