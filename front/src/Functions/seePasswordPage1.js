function seePasswordPage() {

    let current_password = document.getElementById("current_password")

    if (current_password.type === "password") {
        current_password.type = "text";
    } else {
        current_password.type = "password";
    }
}


export default seePasswordPage