const Usuarios = require('../models/Usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//Nuevo usuario
exports.nuevoUsuario = async (req, res, next) => {
    const usuario = new Usuarios(req.body)
    usuario.contrasena = await bcrypt.hash(req.body.contrasena, 10)


    try {
        //almacenar el registro
        await usuario.save()
        res.json({ mensaje: 'Registro exitoso' })

    } catch (error) {

        console.log(error)

        if (error.code === 11000) {
            res.json({
                mensaje: error.keyValue.nickname ? `El usuario ${error.keyValue.nickname} ya está en uso` : `Hubo un error` &&
                    error.keyValue.email ? `El email ${error.keyValue.email} ya está en uso` : `Hubo un error` &&
                        error.keyValue.celular ? `El número 0${error.keyValue.celular} ya está en uso` : `Hubo un error`
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

exports.autenticarUsuario = async (req, res, next) => {
    //buscar el usuario
    const { email, contrasena } = req.body

    const usuario = await Usuarios.findOne({ email })

    if (!usuario) {
        //Si el usuario no existe
        await res.status(401).json({ mensaje: 'Ese usuario no existe' })
        next()
    } else {
        //Si el usuario existe, verificar si el pass es correcto o incorrecto
        if (!bcrypt.compareSync(contrasena, usuario.contrasena)) {
            //Si el pass es incorrecto
            await res.status(401).json({ mensaje: 'Contraseña incorrecta' })
        } else {
            // Si el pass es correcto, firmar el token
            const token = jwt.sign({
                email: usuario.email,
                nickname: usuario.nickname,
                _id: usuario._id
            },
                'LLAVESECRETA',
                {
                    expiresIn: '1h'
                }
            )
            //retornar el token
            res.json({ token })
        }

    }
}