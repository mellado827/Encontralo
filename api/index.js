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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// habilitar bodyparser
app.use(bodyParser.json());

// Rutas de la app
app.use('/', routes());

// carpeta publica
app.use(express.static('images'));

// puerto
app.listen(5000);

