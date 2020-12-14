const Usuarios = require('../models/Usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var salt = bcrypt.genSaltSync();
// const nodeMailer = require('nodemailer');

// let transporter = nodeMailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'autoreplyencontralo@gmail.com',
//         pass: 'autoreplyencontralo1|23'
//     },
// });

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

exports.mostrarUsuario = async (req, res, next) => {
    const usuario = await Usuarios.findById(req.params.comodin)
    if (!usuario) {
        res.json({ mensaje: 'No existe ese usuario' })
        next()
    }
    res.json(usuario)
}

// exports.resetPassword = async (req, res, next) => {

//     const consultaEmail = await Usuarios.find({ email: req.params.comodin })
//     var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

//     try {
//         if (consultaEmail.length > 0) {
//             consultaEmail.forEach(element => {
//                 const email = element.email
//                 if (email.match(emailValido)) {
//                     let emailOptions = {
//                         from: 'autoreplyencontralo@gmail.com',
//                         to: email,
//                         subject: 'Recuperación de cuenta - Encontralo',
//                         html: `<h1>Recuperación de cuenta</h1>
//                     <h3>¡Hola ${element.nickname}! Vimos que no te acordás de la contraseña de tu cuenta en Encontralo, por eso te enviamos este email. 
//                     Te vamos a pedir que le des click al siguiente link para que puedas cambiar tu contraseña: </h3>
//                     <a href="http://localhost:3000/recuperarcuenta/${email}">Recuperar cuenta</a>`
//                     }

//                     transporter.sendMail(emailOptions, function (err, info) {
//                         if (err) {
//                             console.log(err.message)
//                             return;
//                         } else {
//                             console.log("Sent: " + info.response)
//                             res.status(200).json(email)
//                             const newPassword = req.body.NewPassword
//                             const confirmedPassword = req.body.ConfirmedPassword

//                             bcrypt.hash(newPassword, 10, function (err, newPasswordHash) {
//                                 if (err) {
//                                     console.log(err)
//                                 } else {
//                                     bcrypt.hash(confirmedPassword, 10, function (err, confirmedPasswordHash) {
//                                         if (err) {
//                                             console.log(err)
//                                         } else {
//                                             if (bcrypt.compareSync(newPassword, confirmedPasswordHash)) {
//                                                 const modifyPass = async () => {
//                                                     const newpass = await Usuarios.findOneAndUpdate(
//                                                         { email: req.params.comodin },
//                                                         { contrasena: confirmedPasswordHash }
//                                                     )
//                                                     res.status(200).json({ mensaje: '¡Contraseña actualizada correctamente!' })
//                                                     console.log("probá ahora")
//                                                 }
//                                                 modifyPass()
//                                             } else {
//                                                 res.status(404).json({ mensaje: 'Error' })
//                                             }
//                                         }
//                                     })
//                                 }
//                             })
//                         }

//                     })
//                 } else {
//                     res.json({ mensaje: 'Email inválido. Intentalo de nuevo' })
//                 }
//             });
//         } else {
//             res.status(404).json({ mensaje: 'No existe un usuario con ese email. Intentalo de nuevo' })
//         }
//     } catch (error) {
//         console.log(error)
//         next()
//     }

// }

//Actualizar usuario

exports.actualizarUsuario = async (req, res, next) => {
    try {
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
        await res.status(404).json({ mensaje: 'Ese usuario no existe' })
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
