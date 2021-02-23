const routerx = require("express-promise-router");
const reportesController = require("../controllers/reportesController");
const multiparty = require("connect-multiparty");

let md_upload = multiparty({ uploadDir: "upload/images" });
const router = routerx();

//Agregar un reporte
// router.post("/", md_upload, reportesController.upload);

router.post(
  "/",
  reportesController.nuevoReporte,
);

//Mostrar todos los reportes
router.get("/", reportesController.mostrarReportes);

// router.post("/", md_upload, reportesController.upload);
router.put("/:id", md_upload, reportesController.upload);

//Mostrar reportes por tipo
router.get("/:comodin", reportesController.mostrarReportePorDepartamentoOTipo);

router.get("/:usuario/:dep", reportesController.departamentoCasos);

//Actualizar reportes
router.patch("/:idReporte", reportesController.actualizarReporte);

//Eliminar reportes
router.delete("/:idReporte", reportesController.eliminarReporte);

module.exports = router;
