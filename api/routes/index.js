const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
const reportesController = require('../controllers/reportesController')
const comentariosController = require('../controllers/comentariosController')
const encontradosController = require('../controllers/encontradosController')

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
    router.get('/usuarios/:comodin',
        usuarioController.mostrarUsuario)

    // router.put('/usuarios/:comodin',
    // usuarioController.resetPassword)

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
        reportesController.mostrarReportePorDepartamentoOTipo,
        // reportesController.misCasos
    )

    router.get('/reportes/:usuario/:dep',
        reportesController.departamentoCasos)

    //Actualizar reportes
    router.patch('/reportes/:idReporte',
        reportesController.actualizarReporte)

    //Eliminar reportes
    router.delete('/reportes/:idReporte',
        reportesController.eliminarReporte)

    //----- COMENTARIOS ------
    //postear nuevo comentario
    router.post('/comentarios', comentariosController.nuevoComentario)

    //Mostrar todos los comentarios
    router.get('/comentarios', comentariosController.mostrarTodosComentarios)

    //Mostrar comentarios del reporte de un usuario logueado
    router.get('/comentarios/:caso', comentariosController.mostrarComentarios)

    router.delete('/comentarios/:id', comentariosController.borrarComentario)

    //----- ENCONTRADOS -----
    //publicar un animal encontrado
    router.post('/encontrados', encontradosController.nuevoAnimalEncontrado)

    //obtener todos los animales encontrados
    router.get('/encontrados', encontradosController.allAnimalesEncontrados)

    router.get('/encontrados/:usuario', encontradosController.animalesEncontradosPorUsuario)

    //obtener animales encontrados por: departamento, ID público y tipo de mascota
    router.get('/encontrados/:usuario/:comodin', encontradosController.departamentoTipoID)

    return router

}