function seePassword() {
  if (document.getElementById("passwordLogin").type === "password") {
    return document.getElementById("passwordLogin").type = "text";
  } else {
    return document.getElementById("passwordLogin").type = "password";
  }
}

export default seePassword
