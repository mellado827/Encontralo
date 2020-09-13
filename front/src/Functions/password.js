import $ from 'jquery'

function validatePassword() {
  let password_form = document.getElementById("password_form");
  let current_password = document.getElementById("current_password");
  let new_password = document.getElementById("new_password");
  let confirm_new_password = document.getElementById("confirm_new_password");
  let passwordSyntaxis = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
  let reset_pass_confirm = document.getElementById("reset_pass_confirm");
  let areyousure_passwordModal = document.getElementById(
    "areyousure_passwordModal"
  );

  areyousure_passwordModal.style.display = "none";

  reset_pass_confirm.addEventListener("click", () => {

    if ((current_password.value == "" || new_password.value == "" ||
      confirm_new_password.value == "") || (new_password.value !== confirm_new_password.value)
      || (!current_password.value.match(passwordSyntaxis) || (!new_password.value.match(passwordSyntaxis)
        || (!confirm_new_password.value.match(passwordSyntaxis)) || (current_password.value === new_password.value &&
          current_password.value === confirm_new_password.value)))) {
      password_form.classList.add("invalid")
      password_form.classList.remove("valid")
      areyousure_passwordModal.style.display = "none";
      alert("Complete de forma correcta todos los campos")
    } else {
      areyousure_passwordModal.style.display = "block"
    }
  })


}

export default validatePassword()


