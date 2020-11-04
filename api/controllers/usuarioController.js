const Usuarios = require('../models/Usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var salt = bcrypt.genSaltSync();

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

exports.contraseña = async (req, res) => {
    try {

        const contrasenaDelLogin = req.body.contraseñaDelLogin
        const currentPassword = req.body.CurrentPassword
        const newPassword = req.body.NewPassword
        const confirmedPassword = req.body.ConfirmedPassword

        bcrypt.hash(currentPassword, salt, function (err) {
        })

        if (!bcrypt.compareSync(currentPassword, contrasenaDelLogin)) {
            res.json({ mensaje: false })
        } else {
            bcrypt.hash(newPassword, 10, function (err, newPasswordHash) {
                console.log(err)
                if (bcrypt.compareSync(currentPassword, newPasswordHash)) {
                    res.json({ mensaje: 'La contraseña nueva tiene que ser distinta de la actual. Inténtalo de nuevo.' })
                } else {
                    bcrypt.hash(confirmedPassword, 10, function (err, confirmedPasswordHash) {
                        if (bcrypt.compareSync(currentPassword, confirmedPasswordHash)) {
                            res.json({ mensaje: 'La contraseña nueva tiene que ser distinta de la actual. Inténtalo de nuevo.' })
                        }
                        if (bcrypt.compareSync(newPassword, confirmedPasswordHash)) {
                            const modifyPass = async () => {
                                const pass = await Usuarios.findByIdAndUpdate(
                                    { _id: req.params.idUsuario },
                                    { contrasena: confirmedPasswordHash }
                                )
                                res.json({ mensaje: '¡Contraseña actualizada correctamente!' })
                            }
                            modifyPass()
                        } else {
                            res.json({ mensaje: 'La contraseña nueva y su confirmación no coinciden. Inténtalo de nuevo.' })
                        }
                    })

                }
            });

        }
    }

    catch (error) {
        console.log(error)
    }
}

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

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (req.body.email.match(emailValido)) {
            var usuario = await Usuarios.findOneAndUpdate({ _id: req.params.idUsuario },
                req.body, {
                new: true
            })
            res.json(usuario)
        } else {
            res.json({ mensaje: 'Correo electrónico inválido' })
        }

    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            res.json({ mensaje: 'Datos ya existentes' })
        }
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
                celular: usuario.celular,
                _id: usuario._id
            },
                'LLAVESECRETA',
                {
                    expiresIn: '1hr'
                }
            )
            //retornar el token
            res.json({ token })
        }

    }
}