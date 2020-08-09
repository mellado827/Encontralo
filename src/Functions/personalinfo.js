let username_personalinfo = document.getElementById("username_personalinfo");
let email_personalinfo = document.getElementById("email_personalinfo");
let cellphone_personalinfo = document.getElementById("cellphone_personalinfo");
let savechanges_personalinfo = document.getElementById(
    "savechanges_personalinfo"
);
let save_changes_question = document.querySelector(".modal-content");
let personaldata = document.getElementById("personaldata");



let cellphoneValid = document.getElementById("cellphoneValid")

function cellphoneValidation() {
    let uruguayanCellphoneSyntaxis =
        cellphone_personalinfo.value.length == 8 &&
        cellphone_personalinfo.value[0] == 0 &&
        cellphone_personalinfo.value[1] == 9 &&
        cellphone_personalinfo.value[2] > 0 &&
        cellphone_personalinfo.value[2] <= 9;

    if (uruguayanCellphoneSyntaxis == true) {
        personaldata.classList.add("valid");
        cellphoneValid.innerHTML = "Número de celular válido";
        cellphoneValid.style.color = "#267888";
        savechanges_personalinfo.addEventListener("click", () => {
            save_changes_question.style.display = "block";
        });
    } else {
        personaldata.classList.add("invalid");
        cellphoneValid.innerHTML = "Tiene que ser uruguayo, ejemplo: 099123456";
        cellphoneValid.style.color = "red";
        savechanges_personalinfo.addEventListener("click", () => {
            save_changes_question.style.display = "none";
        });
        if (cellphone_personalinfo.value == "") {
            personaldata.classList.remove("valid");
            cellphoneValid.innerHTML = "";
        }
    }
}

let usernameValid = document.getElementById("usernameValid");

function usernameValidation() {
    if (username_personalinfo.value !== "") {
        personaldata.classList.add("valid");
        usernameValid.innerHTML = "Usuario válido";
        usernameValid.style.color = "#267888";
        savechanges_personalinfo.addEventListener("click", () => {
            save_changes_question.style.display = "block";
        });
    } else {
        personaldata.classList.remove("valid");
        usernameValid.innerHTML = "";
        savechanges_personalinfo.addEventListener("click", () => {
            save_changes_question.style.display = "none";
        });
    }
}

function validateEmail() {
    let email_personalinfo = document.getElementById("email_personalinfo").value;
    let emailValid_personalinfo = document.getElementById(
        "emailValid_personalinfo"
    );
    let emailSyntaxis = /^([!#-\'*+\/-9=?A-Z^-~\\\\-]{1,64}(\.[!#-\'*+\/-9=?A-Z^-~\\\\-]{1,64})*|"([\]!#-[^-~\ \t\@\\\\]|(\\[\t\ -~]))+")@([0-9A-Z]([0-9A-Z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Z]([0-9A-Z-]{0,61}[0-9A-Za-z])?))+$/i;

    if (email_personalinfo.match(emailSyntaxis)) {
        personaldata.classList.add("valid");
        personaldata.classList.remove("invalid");
        emailValid_personalinfo.innerHTML = "Correo electronico válido";
        emailValid_personalinfo.style.color = "#267888";
        savechanges_personalinfo.addEventListener("click", () => {
            save_changes_question.style.display = "block";
        });
    } else {
        personaldata.classList.add("invalid");
        personaldata.classList.remove("valid");
        emailValid_personalinfo.innerHTML = "Correo electronico inválido";
        emailValid_personalinfo.style.color = "red";
        savechanges_personalinfo.addEventListener("click", () => {
            save_changes_question.style.display = "none";
        });
    }
    if (email_personalinfo == "") {
        personaldata.classList.remove("invalid");
        personaldata.classList.remove("valid");
        emailValid_personalinfo.innerHTML = "";
    }
}

function goBack() {
    window.history.back();
}
