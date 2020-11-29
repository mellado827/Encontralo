const Reportes = require('../models/Reportes')
const multer = require('multer')
const shortid = require('shortid')

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../images/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('images');

// Sube un archivo 
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    })
}

//Agregar un reporte
exports.nuevoReporte = async (req, res, next) => {

    try {

        // console.log(req.ima)

        // if (req.file.filename) {
        //     reporte.imagen = req.file.filename
        // }
        const reporte = new Reportes(req.body)

        await reporte.save()
        res.status(200).json({ mensaje: 'Se agregó un nuevo reporte' })

    } catch (error) {
        console.log(error)
        next()
    }
}

//Mostrar reportes
exports.mostrarReportes = async (req, res, next) => {
    try {

        //Obtener reportes
        const reportes = await Reportes.find({})
        res.json(reportes)


    } catch (error) {
        console.log(error)
        next()
    }
}

//Mostrar reportes por departamento o tipo de mascota
exports.mostrarReportePorDepartamentoOTipo = async (req, res, next) => {

    try {

        const reportePorDepartamento = await Reportes.find({
            departamento: req.params.comodin
        })

        const reportePorTipo = await Reportes.find({
            tipoMascota: req.params.comodin
        })

        const reportePorIDpublico = await Reportes.find({
            idPublico: req.params.comodin
        })

        const casosPorUsuario = await Reportes.find({
            usuario: req.params.comodin
        })

        // const reporteEnEspecifico = await Reportes.findById(req.params.comodin)

        res.json({
            reportePorDepartamento,
            reportePorTipo,
            reportePorIDpublico,
            casosPorUsuario,
            // reporteEnEspecifico
        })

    } catch (error) {
        console.log(error)
        next()
    }

}

exports.departamentoCasos = async (req, res, next) => {
    try {
        const departamentoCasosPorUsuario = await Reportes.find({
            usuario: req.params.usuario,
            departamento: req.params.dep
        })

        const casosPorUsuarioByID = await Reportes.find({
            usuario: req.params.usuario,
            idPublico: req.params.dep
        })

        const casosPorUsuarioByTipoMascota = await Reportes.find({
            usuario: req.params.usuario,
            tipoMascota: req.params.dep
        })

        res.json({
            departamentoCasosPorUsuario,
            casosPorUsuarioByID,
            casosPorUsuarioByTipoMascota
        })
    } catch (error) {
        console.log(error)
        next()
    }


}

exports.mostrarReporte = async (req, res, next) => {

    const reporte = await Reportes.findById(req.params.idReporte)

    try {
        if (!reporte) {
            res.json({ mensaje: 'No hay resultados' })
        } else {
            res.json(reporte)
        }

    } catch (error) {
        console.log(error)
        next()
    }

}




//Actualizar reportes
exports.actualizarReporte = async (req, res, next) => {
    try {

        let nuevoReporte = req.body

        let reporte = await Reportes.findOneAndUpdate({ idPublico: req.params.idReporte }, nuevoReporte)

        res.json(reporte)

    } catch (error) {
        // console.log(error)
        next()
    }
}

//Eliminar un reporte
exports.eliminarReporte = async (req, res, next) => {
    try {

        await Reportes.findByIdAndDelete({ _id: req.params.idReporte })
        res.json({ mensaje: 'Se ha eliminado el producto' })

    } catch (error) {
        console.log(error)
        next()
    }
}