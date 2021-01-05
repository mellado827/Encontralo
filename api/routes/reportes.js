const routerx = require("express-promise-router");
const reportesController = require("../controllers/reportesController");

const router = routerx();

//Agregar un reporte
router.post(
  "/",
  reportesController.subirArchivo,
  reportesController.nuevoReporte
);

//Mostrar todos los reportes
router.get("/", reportesController.mostrarReportes);

//Mostrar reportes por tipo
router.get(
  "/:comodin",
  reportesController.mostrarReportePorDepartamentoOTipo
  // reportesController.misCasos
);

router.get("/:usuario/:dep", reportesController.departamentoCasos);

//Actualizar reportes
router.patch("/:idReporte", reportesController.actualizarReporte);

//Eliminar reportes
router.delete("/:idReporte", reportesController.eliminarReporte);

module.exports = router;