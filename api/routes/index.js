const routerx = require("express-promise-router")
const usuariosRouter = require('./usuarios')
const reportesRouter = require('./reportes')
const comentariosRouter = require('./comentarios')

const encontradosController = require('../controllers/encontradosController')

//middle para proteger rutas
const auth = require('../middleware/auth')

const router = routerx();

module.exports = function () {

    router.use('/usuarios', usuariosRouter)
    router.use('/reportes', reportesRouter)
    router.use('/comentarios', comentariosRouter)

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