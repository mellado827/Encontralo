const routerx = require("express-promise-router")
const usuariosRouter = require('./usuarios')
const reportesRouter = require('./reportes')
const comentariosRouter = require('./comentarios')
const encontradosRouter = require('./encontrados')

//middle para proteger rutas
const auth = require('../middleware/auth')

const router = routerx();

module.exports = function () {

    router.use('/usuarios', usuariosRouter)
    router.use('/reportes', reportesRouter)
    router.use('/comentarios', comentariosRouter)
    router.use('/encontrados', encontradosRouter)

    return router

}