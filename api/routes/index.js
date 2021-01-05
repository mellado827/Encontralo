const routerx = require("express-promise-router")
const usuariosRouter = require('./usuarios')
const reportesRouter = require('./reportes')
const comentariosController = require('../controllers/comentariosController')
const encontradosController = require('../controllers/encontradosController')

//middle para proteger rutas
const auth = require('../middleware/auth')

const router = routerx();

module.exports = function () {

    router.use('/usuarios', usuariosRouter)
    router.use('/reportes', reportesRouter)

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