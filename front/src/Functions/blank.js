function blank() {

    let save_changes_question = document.getElementById("save_changes_modal")
    let username_personalinfo = document.getElementById("username_personalinfo")
    let email_personalinfo = document.getElementById("email_personalinfo")
    let cellphone_personalinfo = document.getElementById("cellphone_personalinfo")

    save_changes_question.style.display = "none"

    if (
        username_personalinfo.value == "" &&
        email_personalinfo.value == "" &&
        cellphone_personalinfo.value == ""
    ) {
        save_changes_question.style.display = "none"
        alert("Error. No has modificado ningún dato");

    }
    else {
        save_changes_question.style.display = "block";
    }
}

export default blank