const Usuarios = require('../models/Usuarios')

//Nuevo usuario
exports.nuevoUsuario = async (req, res, next) => {
    const usuario = new Usuarios(req.body)

    try {
        //almacenar el registro
        await usuario.save()
        res.json({ mensaje: 'Registro exitoso' })

    } catch (error) {

        if (error.code === 11000) {
            res.json({
                mensaje: error.keyValue.nickname ? `El usuario ${error.keyValue.nickname} está registrado` : `Hubo un error` &&
                    error.keyValue.email ? `El email ${error.keyValue.email} está registrado` : `Hubo un error` &&
                        error.keyValue.celular ? `El número ${error.keyValue.celular} está registrado` : `Hubo un error`
            })
        }
    }

}

//Mostrar clientes

exports.mostrarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.find({})
        res.json(usuarios)

    } catch (error) {
        console.log(error)
    }
}

//Mostrar cliente
exports.mostrarUsuario = async (req, res, next) => {
    const usuario = await Usuarios.findById(req.params.idUsuario)

    if (!usuario) {
        res.json({ mensaje: 'No existe ese usuario' })
        next()
    }
    //Mostrar
    res.json(usuario)
}

//Actualizar usuario

exports.actualizarUsuario = async (req, res, next) => {
    try {
        const usuario = await Usuarios.findOneAndUpdate({ _id: req.params.idUsuario },
            req.body, {
            new: true
        })

        res.json(usuario)

    } catch (error) {
        console.log(error)
        next()
    }
}

//Eliminar usuario
exports.eliminarUsuario = async (req, res, next) => {
    try {

        await Usuarios.findOneAndDelete({ _id: req.params.idUsuario },
            res.json({ mensaje: 'Usuario eliminado' }))

    } catch (error) {
        console.log(error)
        next()
    }
}