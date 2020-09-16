const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usuariosSchema = new Schema({
    nickname: {
        type: String,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    contrasena: {
        type: String,
        trim: true
    },
    celular: {
        type: Number
    }
})

module.exports = mongoose.model('Usuarios', usuariosSchema)