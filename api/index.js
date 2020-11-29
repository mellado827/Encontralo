const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//Importar cors 
const cors = require('cors')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/encontralo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.clear()
    console.log("------------------------------------------------------")
    console.log("Base de datos iniciada satisfactoriamente - Encontralo")
    console.log("------------------------------------------------------")

}).catch(err => {
    console.log("Error al conectar con la BD: " + err)
})
// crear el servidor
const app = express();
mongoose.set('useCreateIndex', true)

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

