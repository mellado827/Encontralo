let username_personalinfo = document.getElementById("username_personalinfo");
let email_personalinfo = document.getElementById("email_personalinfo");
let cellphone_personalinfo = document.getElementById("cellphone_personalinfo");
let savechanges_personalinfo = document.getElementById(
    "savechanges_personalinfo"
);

let save_changes_question = document.querySelector(".modal-content");

function blankText() {

    savechanges_personalinfo.addEventListener("click", () => {
        if (
            username_personalinfo.value == "" &&
            email_personalinfo.value == "" &&
            cellphone_personalinfo.value == ""
        ) {
            save_changes_question.style.display = "none";
            alert("Error. No has modificado ningún dato");
        }
    })
}

export default blankText