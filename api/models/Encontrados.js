const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const encontradosSchema = new Schema({
  tipoMascota: {
    type: String,
  },
  estado: {
    type: String,
  },
  raza: {
    type: String,
  },
  nombre: {
    type: String,
  },
  sexo: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  tieneChip: {
    type: String,
  },
  fecha: {
    type: String,
  },
  hora: {
    type: String,
  },
  departamento: {
    type: String,
  },
  localidad: {
    type: String,
  },
  lugar: {
    type: String,
  },
  imagen: {
    type: String,
  },
  nombreUsuario: {
    type: String,
  },
  descripcionUsuario: {
    type: String,
  },
  informacionADifundir: {
    type: String,
  },
  idUsuario: {
    type: String,
  },
  idPublico: {
    type: String,
  },
  usuario: {
    type: String,
  },
  emailUsuario: {
    type: String,
  },
  celularUsuario: {
    type: String,
  },
  fechaEncontrado: {
    type: String,
  },
});

module.exports = mongoose.model("Encontrados", encontradosSchema);
