const routerx = require("express-promise-router");
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middleware/auth");

const router = routerx();

//Obtener usuarios
router.get("/", auth.verifyUsuario, usuarioController.mostrarUsuarios);

//Agregar nuevos usuarios
router.post("/", auth.verifyUsuario, usuarioController.nuevoUsuario);

//Agregar nuevos usuarios
router.post("/iniciarsesion", usuarioController.autenticarUsuario);

//Mostrar un usuario en específico
router.get("/:comodin", auth.verifyUsuario, usuarioController.mostrarUsuario);

router.post("/reset/:comodin", usuarioController.enviarEmail);

//Actualizar usuario
router.put(
  "/:idUsuario",
  auth.verifyUsuario,
  usuarioController.actualizarUsuario,
  usuarioController.contraseña
);

//Eliminar usuario
router.delete(
  "/:idUsuario",
  auth.verifyUsuario,
  usuarioController.eliminarUsuario
);

module.exports = router;
