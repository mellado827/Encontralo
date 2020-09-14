const Reportes = require('../models/Reportes')
const multer = require('multer')
const shortid = require('shortid')

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../images')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1]
            cb(null, `${shortid.generate()}.${extension}`)
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

const upload = multer(configuracionMulter).single('imagen')

exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next()
    })
}

//Agregar un reporte
exports.nuevoReporte = async (req, res, next) => {
    const reporte = new Reportes(req.body)

    try {

        if (req.file.filename) {
            reporte.imagen = req.file.filename
        }

        await reporte.save()
        res.json({ mensaje: 'Se agregó un nuevo reporte' })

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

exports.mostrarReporte = async (req, res, next) => {
    const reporte = await Reportes.findById(req.params.idReporte)

    if (!reporte) {
        res.json({ mensaje: 'Ese reporte no existe' })
        return next()
    }

    // Mostrar reporte
    res.json(reporte)
}

//Actualizar reportes
exports.actualizarReporte = async (req, res, next) => {
    try {

        let nuevoReporte = req.body

        if (req.file) {
            nuevoReporte.imagen = req.file.filename
        } else {
            let reporteAnterior = await Reportes.findById(req.params.idReporte)
            nuevoReporte.imagen = reporteAnterior.imagen
        }

        let reporte = await Reportes.findOneAndUpdate({ _id: req.params.idReporte },
            nuevoReporte, {
            new: true,
        })

        res.json(reporte)

    } catch (error) {
        console.log(error)
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