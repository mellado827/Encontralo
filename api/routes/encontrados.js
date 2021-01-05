const routerx = require("express-promise-router");
const encontradosController = require('../controllers/encontradosController')

const router = routerx();

//publicar un animal encontrado
router.post('/', encontradosController.nuevoAnimalEncontrado)

//obtener todos los animales encontrados
router.get('/', encontradosController.allAnimalesEncontrados)

router.get('/:usuario', encontradosController.animalesEncontradosPorUsuario)

//obtener animales encontrados por: departamento, ID público y tipo de mascota
router.get('/:usuario/:comodin', encontradosController.departamentoTipoID)

export default router;