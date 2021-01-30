const express = require("express");
const routes = require("./routes");
const path = require('path');
const morgan = require("morgan");
const database = require("./config/database");
require("dotenv").config();

//coneccion a la base de datos
database.connectDatabase();

//Importar cors
const cors = require("cors");

// crear el servidor
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// habilitar bodyparser
app.use(express.urlencoded({extended:true}));
//configurando direccion de archivos estaticos publicos
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Rutas de la app
app.use("/", routes);

// carpeta publica
app.use(express.static("images"));

// puerto
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
  console.log('Server runing on port ' + app.get('port'));
});
