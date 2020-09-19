const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//Importar cors 
const cors = require('cors')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/encontralo', {
    useNewUrlParser: true
})
// crear el servidor
const app = express();

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar cors
app.use(cors());

// Rutas de la app
app.use('/', routes());

// carpeta publica
app.use(express.static('images'));

// puerto
app.listen(5000);

