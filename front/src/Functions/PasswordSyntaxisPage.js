function passwordSyntaxisPage() {

    let current_password = document.getElementById("current_password").value
    let new_password = document.getElementById("new_password").value
    let confirm_new_password = document.getElementById("confirm_new_password").value
    let passwordSyntaxis = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

    document.getElementById("areyousure_passwordModal").style.display = "none"

    if (current_password.match(passwordSyntaxis) && current_password !== "" &&
        new_password.match(passwordSyntaxis) && new_password !== "" &&
        confirm_new_password.match(passwordSyntaxis) && confirm_new_password !== "" &&
        new_password == confirm_new_password && current_password != new_password && current_password != confirm_new_password) {
        return document.getElementById("areyousure_passwordModal").style.display = "block"
    } else {
        return alert('Ingrese bien todos los campos')
    }
}

export default passwordSyntaxisPage
