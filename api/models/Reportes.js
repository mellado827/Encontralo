const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reportesSchema = new Schema({
    usuario: {
        type: Schema.ObjectId,
        ref: 'Usuarios'
    },
    tipoMascota: {
        type: String,
        enum: ['Perro', 'Gato'],
        required: true
    },
    estado: {
        type: String,
        enum: ['Perdido', 'Encontrado', 'Robado'],
        required: true
    },
    raza: {
        type: String,
        trim: true
    },
    nombre: {
        type: String,
        trim: true
    },
    sexo: {
        type: String,
        enum: ['Macho', 'Hembra'],
        required: true
    },
    imagen: {
        type: String,
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    tieneChip: {
        type: String,
        enum: ['Si', 'No se', 'No'],
        required: true
    },
    fecha: {
        type: String
    },
    hora: {
        type: String
    },
    departamento: {
        type: String,
        enum: ['Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Montevideo', 'Paysandú', 'Río Negro', 'Rocha', 'Salto', 'San José', 'Soriano', 'Tacuarembó', 'Treinta y Tres'],
        required: true
    },
    localidad: {
        type: String,
        trim: true,
        required: true
    },
    lugar: {
        type: String,
        trim: true,
        required: true
    },
    nombreUsuario: {
        type: String,
        trim: true
    },
    descripcionUsuario: {
        type: String,
        trim: true
    },
    informacionADifundir: {
        type: String
    },
    idPublico: {
        type: String
    },
})

module.exports = mongoose.model('Reportes', reportesSchema)