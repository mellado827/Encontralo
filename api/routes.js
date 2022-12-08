const express = require('express')
const routes = express.Router()

//obtener todos los animales perdidos
routes.get('/',(req,res) => {
    req.getConnection((error, connection) => {
        if(error) return res.send(error)

        connection.query('SELECT * FROM perdidos', (error, rows) => {
            if(error) return res.send(error)

            res.json(rows)
        })
    })
})

//añadir animal perdido
routes.post('/',(req,res) => {
    req.getConnection((error, connection) => {
        if(error) return res.send(error)

        connection.query('INSERT INTO perdidos SET ?',[req.body], (error, rows) => {
            if(error) return res.send(error)

            res.send('post hecho!')
        })
    })
})

//actualizar animal perdido
routes.put('/:id',(req,res) => {
    req.getConnection((error, connection) => {
        if(error) return res.send(error)

        connection.query('UPDATE PERDIDOS SET ? WHERE idPerdidos = ?',[req.body, req.params.id], (error, rows) => {
            if(error) return res.send(error)

            res.send('update hecho!')
        })
    })
})

//eliminar animal perdido
routes.delete('/:id',(req,res) => {
    req.getConnection((error, connection) => {
        if(error) return res.send(error)

        connection.query('DELETE FROM perdidos where idPerdidos = ?',[req.params.id], (error, rows) => {
            if(error) return res.send(error)

            res.send('delete hecho!')
        })
    })
})

module.exports = routes