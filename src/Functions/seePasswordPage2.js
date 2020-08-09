function seePasswordPage2() {

    let new_password = document.getElementById("new_password")

    if (new_password.type === "password") {
        new_password.type = "text";
    } else {
        new_password.type = "password";
    }
}


export default seePasswordPage2