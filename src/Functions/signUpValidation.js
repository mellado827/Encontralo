import $ from 'jquery'

let emailSignUp = document.getElementById("emailSignUp");
let passwordSignUp = document.getElementById("passwordSignUp");
let username = document.getElementById("username");
let validUser = document.getElementById("validUser");
let user_cellphone = document.getElementById("user_cellphone");
let validCellphone = document.getElementById("cellphoneValid");
let signup_form = document.getElementById("signup_form");
let signup_button = document.getElementById("signup_button");

function isNumber(e) {
  e = e || window.event;
  var charCode = e.which ? e.which : e.keyCode;
  return /\d/.test(String.fromCharCode(charCode));
}

function cellphoneValidation() {
  let uruguayanCellphoneSyntaxis =
    user_cellphone.value.length == 8 &&
    user_cellphone.value[0] == 0 &&
    user_cellphone.value[1] == 9 &&
    user_cellphone.value[2] > 0 &&
    user_cellphone.value[2] <= 9;

  if (uruguayanCellphoneSyntaxis == true) {
    signup_form.classList.add("valid");
    validCellphone.innerHTML = "Número de celular válido";
    validCellphone.style.color = "#267888";
  } else {
    signup_form.classList.add("invalid");
    validCellphone.innerHTML = "Tiene que ser uruguayo, ejemplo: 099123456";
    validCellphone.style.color = "red";
  }
  if (user_cellphone.value == "") {
    signup_form.classList.remove("valid");
    validCellphone.innerHTML = "";
  }
}

function UsernameValidation() {
  if (username.value != "") {
    signup_form.classList.add("valid");
    validUser.innerHTML = "Usuario válido";
    validUser.style.color = "#267888";
  } else {
    signup_form.classList.remove("valid");
    validUser.innerHTML = "";
  }
}

function validateEmail() {
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
  if (signUpEmailValue == "") {
    signup_form.classList.remove("invalid");
    signup_form.classList.remove("valid");
    signUpEmailValid.innerHTML = "";
  }
}

function validatePassword() {
  let passwordSignUpValue = document.getElementById("passwordSignUp").value;
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

  if (passwordSignUpValue == "") {
    signup_form.classList.remove("invalid");
    signup_form.classList.remove("valid");
    passwordValid.innerHTML = "";
  }
}

function seePassword() {
  $("#see_password").click(function () {
    if (passwordSignUp.type === "password") {
      passwordSignUp.type = "text";
    } else {
      passwordSignUp.type = "password";
    }
  });
}

export default seePassword

function emptySignUpData() {
  $("#signup_button").click(function () {
    if (
      emailSignUp.value == "" ||
      passwordSignUp.value == "" ||
      username.value == "" ||
      user_cellphone.value == ""
    ) {
      alert("Ingrese todos los datos");
      return false;
    }
  });
}

emptySignUpData();
