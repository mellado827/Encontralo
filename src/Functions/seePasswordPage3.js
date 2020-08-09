function seePasswordPage3() {

    let confirm_new_password = document.getElementById("confirm_new_password")

    if (confirm_new_password.type === "password") {
        confirm_new_password.type = "text";
    } else {
        confirm_new_password.type = "password";
    }
}


export default seePasswordPage3