const Encontrados = require("../models/Encontrados");

//Reportar un animal como encontrado
exports.nuevoAnimalEncontrado = async (req, res, next) => {
  try {
    const encontrado = new Encontrados(req.body);
    await encontrado.save();
    res.status(200).json({ mensaje: "Se agregó un nuevo reporte" });
  } catch (error) {
    console.log(error);
    next();
  }
};

//Obtener todos los animales encontrados
exports.allAnimalesEncontrados = async (req, res, next) => {
  try {
    const obtenerTodosAnimalesEncontrados = await Encontrados.find({});
    res.json(obtenerTodosAnimalesEncontrados);
  } catch (error) {
    console.log(error);
    next();
  }
};

//Animales encontrados por usuario
exports.animalesEncontradosPorUsuario = async (req, res, next) => {
  try {
    const casosPorUsuario = await Encontrados.find({
      idUsuario: req.params.usuario,
    });

    const casosPorDepartamento = await Encontrados.find({
      departamento: req.params.usuario,
    });

    const casosPorTipo = await Encontrados.find({
      tipoMascota: req.params.usuario,
    });

    res.json({ casosPorUsuario, casosPorDepartamento, casosPorTipo });
  } catch (error) {
    console.log(error);
    next();
  }
};

//Animales encontrados por departamento, ID público o tipo de mascota
exports.departamentoTipoID = async (req, res, next) => {
  try {
    const casosPorDepartamento = await Encontrados.find({
      usuario: req.params.usuario,
      departamento: req.params.comodin,
    });

    const casosPorTipo = await Encontrados.find({
      usuario: req.params.usuario,
      tipoMascota: req.params.comodin,
    });

    res.json({ casosPorDepartamento, casosPorTipo });
  } catch (error) {
    console.log(error);
    next();
  }
};
