function finalValidationSignUp() {
    let user_cellphone = document.getElementById("user_cellphone")
    let username = document.getElementById("username")
    let signUpEmailValue = document.getElementById("emailSignUp").value;
    let passwordSignUpValue = document.getElementById("passwordLogin").value;
    let uruguayanCellphoneSyntaxis =
        user_cellphone.value.length == 9 &&
        user_cellphone.value[0] == 0 &&
        user_cellphone.value[1] == 9 &&
        user_cellphone.value[2] > 0 && user_cellphone.value[2] <= 9;
    let passwordSyntaxis = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
    let emailSyntaxis = /^([!#-\'*+\/-9=?A-Z^-~\\\\-]{1,64}(\.[!#-\'*+\/-9=?A-Z^-~\\\\-]{1,64})*|"([\]!#-[^-~\ \t\@\\\\]|(\\[\t\ -~]))+")@([0-9A-Z]([0-9A-Z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Z]([0-9A-Z-]{0,61}[0-9A-Za-z])?))+$/i;

    if (username.value !== "" &&
        uruguayanCellphoneSyntaxis === true &&
        signUpEmailValue.match(emailSyntaxis) &&
        passwordSignUpValue.match(passwordSyntaxis)) {
        return alert("Registro válido")
    } else {
        return alert("Registro inválido")
    }
}

export default finalValidationSignUp

// signUpEmailValue.match(emailSyntaxis) &&
// passwordSignUpValue.match(passwordSyntaxis) &&
// uruguayanCellphoneSyntaxis === true)