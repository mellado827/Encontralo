const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Usuarios = require('./Usuarios')
const Reportes = require('./Reportes')

const comentariosSchema = new Schema({
    comentario: {
        required: true,
        type: String,
        trim: true
    },
    usuarioRemitente: {
        required: true,
        type: String,
        trim: true
    },
    casoComentado: {
        required: true,
        type: String,
        trim: true
    },
    fechaComentario: {
        required: true,
        type: String
    },
    // usuarioDestino: {
    //     required: true,
    //     type: String
    // }
})

module.exports = mongoose.model('Comentarios', comentariosSchema)