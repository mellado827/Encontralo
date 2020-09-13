const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')

module.exports = function () {
    //Agregar nuevos usuarios
    router.post('/usuarios', usuarioController.nuevoUsuario)

    //Obtener usuarios
    router.get('/usuarios', usuarioController.mostrarUsuarios)

    //Mostrar un usuario en específico
    router.get('/usuarios/:idUsuario', usuarioController.mostrarUsuario)

    //Actualizar usuario
    router.put('/usuarios/:idUsuario', usuarioController.actualizarUsuario)

    //Eliminar usuario
    router.delete('/usuarios/:idUsuario', usuarioController.eliminarUsuario)

    return router

}