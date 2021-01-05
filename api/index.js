const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const database = require("./config/database");

//coneccion a la base de datos
database.connectDatabase();

//Importar cors 
const cors = require('cors')

// crear el servidor
const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// habilitar bodyparser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// Rutas de la app
app.use('/', routes());

// carpeta publica
app.use(express.static('images'));

// puerto
app.listen(5000);

