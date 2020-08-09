function actualAge() {

    let date = new Date
    let age = 21
    let actualDay = date.getDate()
    let actualMonth = date.getMonth()
    if (actualDay === 2 && actualMonth === 10) return age + 1
    else return age
}

export default actualAge