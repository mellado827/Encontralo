function cellphoneValidation() {
    let signup_form = document.getElementById("signup_form");
    let cellphoneValid = document.getElementById("cellphoneValid");
    let user_cellphone = document.getElementById("user_cellphone")
    let uruguayanCellphoneSyntaxis =
        user_cellphone.value.length == 8 &&
        user_cellphone.value[0] == 0 &&
        user_cellphone.value[1] == 9 &&
        user_cellphone.value[2] > 0 && user_cellphone.value[2] <= 9;

    if (uruguayanCellphoneSyntaxis === true) {
        signup_form.classList.add("valid");
        signup_form.classList.remove("invalid");
        cellphoneValid.innerHTML = "Número de celular válido";
        cellphoneValid.style.color = "#267888";
    } else {
        signup_form.classList.add("invalid");
        signup_form.classList.remove("valid");
        cellphoneValid.innerHTML = "Tiene que ser uruguayo, ejemplo: 099123456";
        cellphoneValid.style.color = "red";
    }
    if (user_cellphone.value === "") {
        signup_form.classList.remove("valid");
        cellphoneValid.innerHTML = "";
    }
}

export default cellphoneValidation