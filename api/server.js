//default config ---
const express = require('express')
const mysql = require('mysql')
const myconexion = require('express-myconnection')
const cors = require('cors')

const routes = require('./routes')

const app = express()
app.set('port',process.env.PORT || 9000)

//database connection
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'encontralo',
}

//middleware ---
app.use(myconexion(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())

//routes ---
app.get('/', (req,res) => {
    res.send('Welcome to the API!')
})

app.use('/api', routes)

//server running ---
app.listen(app.get('port'), ()=> {
    console.log("server is running on port",app.get('port'))
})