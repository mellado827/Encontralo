const routerx = require("express-promise-router");
const usuarioController = require("../controllers/usuarioController");
// const auth = require("../middleware/auth");

const router = routerx();

//Obtener usuarios
router.get("/", usuarioController.mostrarUsuarios);

//Agregar nuevos usuarios
router.post("/", usuarioController.nuevoUsuario);

//Agregar nuevos usuarios
router.post("/iniciarsesion", usuarioController.autenticarUsuario);

//Mostrar un usuario en específico
router.get("/:comodin", usuarioController.mostrarUsuario);

router.post("/reset/:comodin", usuarioController.enviarEmail);

//Actualizar usuario
router.put(
  "/:idUsuario",
  usuarioController.actualizarUsuario,
  usuarioController.contraseña
);

//Eliminar usuario
router.delete("/:idUsuario", usuarioController.eliminarUsuario);

module.exports = router;
