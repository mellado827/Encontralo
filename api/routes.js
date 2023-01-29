const express = require('express')
const routes = express.Router()
const {cloudinary} = require('./utils/cloudinary')

//obtener todos los animales perdidos
routes.get('/',(req,res) => {
    req.getConnection((error, connection) => {
        if(error) return res.send(error)

        connection.query('SELECT * FROM perdidos', (error, pets) => {
            if(error) return res.send(error)
            res.json(pets)
        })
    })
})

//upload image to cloudinary
routes.post('/image', async (req,res) => {
   try {
    var image = req.body.data

     const uploadedResponse = await cloudinary.uploader.upload(image, {
         upload_preset: 'ml_default'
     })

    if(uploadedResponse.url) {
        res.status(200).json({ url: uploadedResponse.url });
    }
        
   } catch (error) {
    console.error(error)
    res.status(500).json({
        msg: 'noo'
    })
   }
})

//upload lost pet
routes.post('/', (req,res) => {
     req.getConnection((error, connection) => {
         if(error) return res.send(error)

         connection.query('INSERT INTO perdidos SET ?',[req.body], (error, rows) => {
            console.log(req.body)
             if(error) return res.send(error)
             console.log('post hecho!')
             res.send('post hecho')
         })
     })
})

//upload found pet
routes.post('/encontrados', (req,res) => {
    req.getConnection((error, connection) => {
        if(error) return res.send(error)

        connection.query('INSERT INTO encontrados SET ?',[req.body], (error, rows) => {
            if(error) return console.log(error)
            console.log(console.log(rows))
            res.send('post hecho')
        })
    })
})


//actualizar animal perdido
routes.put('/:id',(req,res) => {
try {
    req.getConnection((error, connection) => {
        if(error) return console.log(error)

        connection.query('UPDATE PERDIDOS SET ? WHERE idPerdidos = ?',[req.body, req.params.id], (error, rows) => {
            if(error) return res.send(error)
            console.log(req.body)
            res.send('update hecho!')
        })
    })
} catch (error) {
    console.error(error)
}
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