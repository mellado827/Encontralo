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

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use('/', routes())

app.listen(5000)