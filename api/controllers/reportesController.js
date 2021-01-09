const Reportes = require("../models/Reportes");
const { fs, exists } = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const normalize = require("normalize-path");
const { EEXIST } = require("constants");

//Agregar un reporte
exports.nuevoReporte = async (req, res, next) => {
  try {
    const reporte = new Reportes(req.body);
    await reporte.save();
    res.status(200).json({ mensaje: "Se agregó un nuevo reporte" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.upload = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(404).send({ status: "Error", message: "file_name" });
    }

    let file_path = normalize(req.files.imagen.path);
    let file_split = file_path.split("/");
    let file_name = file_split[2];
    let ext_split = file_name.split(".");
    let file_ext = ext_split[1];

    //comprueba la extension
    if (
      file_ext != "png" &&
      file_ext != "PNG" &&
      file_ext != "jpg" &&
      file_ext != "jpeg" &&
      file_ext != "gif"
    ) {
      //borra el archivo subido
      fs.unlink(file_path, (err) => {
        return res.status(404).send({
          status: "error",
          message: "La extensión de la imagen no es válida",
        });
      });
    } else {
      const result = await cloudinary.uploader.upload(file_path);
      if (result.url) {
        await Reportes.findOneAndUpdate(
          { idPublico: req.params.id },
          { imagen: result.url }
        ).then((reporteNuevo) => {
          if (reporteNuevo) {
            res.status(200).json(reporteNuevo);
            console.log("La imagen ha sido modificada");
          } else {
            res.status(402).send({
              status: "error",
              message: "Error al actualizar la imagen",
            });
          }
        });
      } else {
        console.log("ERROR: upload image: ", result);
        res.status(404).send({
          status: "error",
          message: "Error al guardar la imagen",
        });
      }
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

//Mostrar reportes
exports.mostrarReportes = async (req, res, next) => {
  try {
    //Obtener reportes
    const reportes = await Reportes.find({});
    res.json(reportes);
  } catch (error) {
    console.log(error);
    next();
  }
};

//Mostrar reportes por departamento o tipo de mascota
exports.mostrarReportePorDepartamentoOTipo = async (req, res, next) => {
  try {
    const reportePorDepartamento = await Reportes.find({
      departamento: req.params.comodin,
    });

    const reportePorTipo = await Reportes.find({
      tipoMascota: req.params.comodin,
    });

    const reportePorIDpublico = await Reportes.find({
      idPublico: req.params.comodin,
    });

    const casosPorUsuario = await Reportes.find({
      idUsuario: req.params.comodin,
    });

    res.json({
      reportePorDepartamento,
      reportePorTipo,
      reportePorIDpublico,
      casosPorUsuario,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.departamentoCasos = async (req, res, next) => {
  try {
    const departamentoCasosPorUsuario = await Reportes.find({
      usuario: req.params.usuario,
      departamento: req.params.dep,
    });

    const casosPorUsuarioByID = await Reportes.find({
      usuario: req.params.usuario,
      idPublico: req.params.dep,
    });

    const casosPorUsuarioByTipoMascota = await Reportes.find({
      usuario: req.params.usuario,
      tipoMascota: req.params.dep,
    });

    res.json({
      departamentoCasosPorUsuario,
      casosPorUsuarioByID,
      casosPorUsuarioByTipoMascota,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarReporte = async (req, res, next) => {
  const reporte = await Reportes.find({ idPublico: req.params.idReporte });

  try {
    if (!reporte) {
      res.json({ mensaje: "No hay resultados" });
    } else {
      res.json(reporte);
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

//Actualizar reportes
exports.actualizarReporte = async (req, res, next) => {
  try {
    let nuevoReporte = req.body;

    let reporte = await Reportes.findOneAndUpdate(
      { idPublico: req.params.idReporte },
      nuevoReporte
    );

    res.json(reporte);
  } catch (error) {
    // console.log(error)
    next();
  }
};

//Eliminar un reporte
exports.eliminarReporte = async (req, res, next) => {
  try {
    await Reportes.findOneAndRemove({ idPublico: req.params.idReporte });
    res.json({ mensaje: "Se ha eliminado el producto" });
  } catch (error) {
    console.log(error);
    next();
  }
};
