import $ from 'jquery'

function enablePersonalInfoData() {
    $("#username_personalinfo").prop("disabled", false).focus();
    $("#email_personalinfo").prop("disabled", false).focus();
    $("#cellphone_personalinfo").prop("disabled", false).focus();
}

export default enablePersonalInfoData

