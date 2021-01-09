const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportesSchema = new Schema({
  usuario: {
    type: Schema.ObjectId,
    ref: "Usuarios",
  },
  tipoMascota: {
    type: String,
    enum: ["Perro", "Gato", "Conejo", "Loro"],
    required: true,
  },
  estado: {
    type: String,
    enum: ["Perdido", "Encontrado", "Robado"],
    required: true,
  },
  raza: {
    type: String,
    trim: true,
  },
  nombre: {
    type: String,
    trim: true,
  },
  sexo: {
    type: String,
    enum: ["Macho", "Hembra"],
    required: true,
  },
  imagen: {
    type: String,
  },
  descripcion: {
    type: String,
    trim: true,
    required: true,
  },
  tieneChip: {
    type: String,
    enum: ["Si", "No se", "No"],
    required: true,
  },
  fecha: {
    type: String,
  },
  hora: {
    type: String,
  },
  departamento: {
    type: String,
    enum: [
      "Artigas",
      "Canelones",
      "Cerro Largo",
      "Colonia",
      "Durazno",
      "Flores",
      "Florida",
      "Lavalleja",
      "Maldonado",
      "Montevideo",
      "Paysandu",
      "Rio Negro",
      "Rocha",
      "Salto",
      "San Jose",
      "Soriano",
      "Tacuarembo",
      "Treinta y Tres",
    ],
    required: true,
  },
  localidad: {
    type: String,
    trim: true,
    required: true,
  },
  lugar: {
    type: String,
    trim: true,
    required: true,
  },
  file0: {
    type: String,
  },
  idUsuario: {
    type: String,
  },
  nombreUsuario: {
    type: String,
    trim: true,
  },
  descripcionUsuario: {
    type: String,
    trim: true,
  },
  informacionADifundir: {
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
});

module.exports = mongoose.model("Reportes", reportesSchema);
