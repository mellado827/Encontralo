const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
const reportesController = require('../controllers/reportesController')

//middle para proteger rutas
const auth = require('../middleware/auth')

module.exports = function () {
    //Agregar nuevos usuarios
    router.post('/usuarios',
        usuarioController.nuevoUsuario)

    //Agregar nuevos usuarios
    router.post('/iniciarsesion', usuarioController.autenticarUsuario)

    //Obtener usuarios
    router.get('/usuarios',
        // auth,
        usuarioController.mostrarUsuarios)

    //Mostrar un usuario en específico
    router.get('/usuarios/:idUsuario',
        usuarioController.mostrarUsuario)

    //Actualizar usuario
    router.put('/usuarios/:idUsuario',
        usuarioController.actualizarUsuario,
        usuarioController.contraseña)

    //Eliminar usuario
    router.delete('/usuarios/:idUsuario', usuarioController.eliminarUsuario)

    //*REPORTES*

    //Agregar un reporte
    router.post('/reportes',
        reportesController.subirArchivo,
        reportesController.nuevoReporte)

    //Mostrar todos los reportes
    router.get('/reportes', reportesController.mostrarReportes)

    //Mostrar reportes por tipo
    router.get('/reportes/:comodin',
        reportesController.mostrarReportePorDepartamentoOTipo
    )

    //Actualizar reportes
    router.put('/reportes/:idReporte',
        reportesController.subirArchivo,
        reportesController.actualizarReporte)

    //Eliminar reportes
    router.delete('/reportes/:idReporte',
        reportesController.eliminarReporte)

    return router

}