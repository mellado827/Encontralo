const routerx = require("express-promise-router");
const comentariosController = require('../controllers/comentariosController')

const router = routerx();

//postear nuevo comentario
router.post('/', comentariosController.nuevoComentario)

//Mostrar todos los comentarios
router.get('/', comentariosController.mostrarTodosComentarios)

//Mostrar comentarios del reporte de un usuario logueado
router.get('/:caso', comentariosController.mostrarComentarios)

router.delete('/:id', comentariosController.borrarComentario)

export default router;