const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
const reportesController = require('../controllers/reportesController')

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

    //*REPORTES*

    //Agregar un reporte
    router.post('/reportes',
        reportesController.subirArchivo,
        reportesController.nuevoReporte)

    //Mostrar reportes
    router.get('/reportes', reportesController.mostrarReportes)

    //Mostrar un reporte 
    router.get('/reportes/:idReporte', reportesController.mostrarReporte)

    //Actualizar reportes
    router.put('/reportes/:idReporte',
        reportesController.subirArchivo,
        reportesController.actualizarReporte)

    //Eliminar reportes
    router.delete('/reportes/:idReporte',
        reportesController.eliminarReporte)

    return router

}