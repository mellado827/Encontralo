function personalData() {

    let username_personalinfo = document.getElementById("username_personalinfo")
    let cellphone_personalinfo = document.getElementById("cellphone_personalinfo")
    let save_changes_question = document.getElementById("save_changes_modal")
    let emailSyntaxis = /^([!#-\'*+\/-9=?A-Z^-~\\\\-]{1,64}(\.[!#-\'*+\/-9=?A-Z^-~\\\\-]{1,64})*|"([\]!#-[^-~\ \t\@\\\\]|(\\[\t\ -~]))+")@([0-9A-Z]([0-9A-Z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Z]([0-9A-Z-]{0,61}[0-9A-Za-z])?))+$/i;
    let email_personalinfo = document.getElementById("email_personalinfo").value;


    save_changes_question.style.display = "none"

    let uruguayanCellphoneSyntaxis =
        cellphone_personalinfo.value.length == 9 &&
        cellphone_personalinfo.value[0] == 0 &&
        cellphone_personalinfo.value[1] == 9 &&
        cellphone_personalinfo.value[2] > 0 &&
        cellphone_personalinfo.value[2] <= 9;

    if (uruguayanCellphoneSyntaxis == true || email_personalinfo.match(emailSyntaxis) || username_personalinfo.value != "") {
        save_changes_question.style.display = "block";
    } else {
        save_changes_question.style.display = "none";
        alert("Ingresa de forma correcta el dato")
    }

}
export default personalData