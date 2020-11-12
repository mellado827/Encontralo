const Comentarios = require('../models/Comentarios')

//Agregar un reporte
exports.nuevoComentario = async (req, res, next) => {
    try {
        const comentario = new Comentarios(req.body)
        await comentario.save()
        const mensaje = "Nuevo comentario creado"
        res.json({ mensaje: mensaje })
        console.log(mensaje)

    } catch (error) {
        console.log(error)
        next()
    }
}

exports.mostrarTodosComentarios = async (req, res, next) => {
    try {

        const comentarios = await Comentarios.find({})
        res.json(comentarios)

    } catch (error) {
        console.log(error)
        next()
    }
}

exports.mostrarComentarios = async (req, res, next) => {
    try {
        const comentario = await Comentarios.find({
            casoComentado: req.body.caso
        })
        res.json(comentario)

    } catch (error) {
        console.log(error)
        next()
    }
}