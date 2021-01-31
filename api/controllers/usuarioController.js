const Usuarios = require("../models/Usuarios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync();
const nodeMailer = require("nodemailer");
require("dotenv").config();
const configEmail = require("../config/email");
// const token = require('../services/token');

let transporter = nodeMailer.createTransport({
  host: configEmail.host,
  port: configEmail.port,
  // secure: false,
  auth: {
    user: configEmail.user,
    pass: configEmail.pass,
  },
});

//Nuevo usuario
exports.nuevoUsuario = async (req, res, next) => {
  const usuario = new Usuarios(req.body);
  usuario.contrasena = await bcrypt.hash(req.body.contrasena, 10);

  try {
    //almacenar el registro
    await usuario.save();
    res.json({ mensaje: "Registro exitoso" });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      res.json({
        mensaje: error.keyValue.nickname
          ? `El usuario ${error.keyValue.nickname} ya está en uso`
          : `Hubo un error` && error.keyValue.email
          ? `El email ${error.keyValue.email} ya está en uso`
          : `Hubo un error` && error.keyValue.celular
          ? `El número 0${error.keyValue.celular} ya está en uso`
          : `Hubo un error`,
      });
    }
  }
};

exports.contraseña = async (req, res) => {
  try {
    const contrasenaDelLogin = req.body.contraseñaDelLogin;
    const currentPassword = req.body.CurrentPassword;
    const newPassword = req.body.NewPassword;
    const confirmedPassword = req.body.ConfirmedPassword;

    bcrypt.hash(currentPassword, salt, function (err) {});

    if (!bcrypt.compareSync(currentPassword, contrasenaDelLogin)) {
      res.json({ mensaje: false });
    } else {
      bcrypt.hash(newPassword, 10, function (err, newPasswordHash) {
        console.log(err);
        if (bcrypt.compareSync(currentPassword, newPasswordHash)) {
          res.json({
            mensaje:
              "La contraseña nueva tiene que ser distinta de la actual. Inténtalo de nuevo.",
          });
        } else {
          bcrypt.hash(
            confirmedPassword,
            10,
            function (err, confirmedPasswordHash) {
              if (bcrypt.compareSync(currentPassword, confirmedPasswordHash)) {
                res.json({
                  mensaje:
                    "La contraseña nueva tiene que ser distinta de la actual. Inténtalo de nuevo.",
                });
              }
              if (bcrypt.compareSync(newPassword, confirmedPasswordHash)) {
                const modifyPass = async () => {
                  const pass = await Usuarios.findByIdAndUpdate(
                    { _id: req.params.idUsuario },
                    { contrasena: confirmedPasswordHash }
                  );
                };
                modifyPass();
                pass &&
                  res.json({
                    mensaje: "¡Contraseña actualizada correctamente!",
                  });
              } else {
                res.json({
                  mensaje:
                    "La contraseña nueva y su confirmación no coinciden. Inténtalo de nuevo.",
                });
              }
            }
          );
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.mostrarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.find({});
    res.json(usuarios);
  } catch (error) {
    console.log(error);
  }
};

exports.mostrarUsuario = async (req, res, next) => {
  const usuario = await Usuarios.findById(req.params.comodin);
  if (!usuario) {
    res.json({ mensaje: "No existe ese usuario" });
    next();
  }
  res.json(usuario);
};

exports.enviarEmail = async (req, res, next) => {
  const consultaEmail = await Usuarios.findOne({ email: req.params.comodin });
  // console.log(consultaEmail)
  try {
    if (consultaEmail) {
      const email = consultaEmail.email;

      const token = jwt.sign(
        {
          _id: consultaEmail._id,
        },
        "LLAVESECRETA",
        {
          expiresIn: "1hr",
        }
      );

      let emailOptions = {
        from: "noreply@encontralo.org",
        to: email,
        subject: "Recuperación de cuenta - Encontralo",
        html: `<h1>Recuperación de cuenta</h1>
                    <h3>¡Hola ${consultaEmail.nickname}! Vimos que no te acordás de la contraseña de tu cuenta en Encontralo, por eso te enviamos este email.
                    Te vamos a pedir que le des click al siguiente link para que puedas cambiar tu contraseña: </h3>
                    <a href="http://localhost:3000/recuperarcuenta/${token}">Recuperar cuenta</a>`,
      };

      transporter.sendMail(emailOptions, function (err, info) {
        if (err) {
          console.log(err.message);
          res.status(404).send({
            message: "No se pudo enviar el email. Intentalo de nuevo",
          });
        } else {
          console.log("Sent: " + info.response);
          res.status(200).json(email);
        }
      });
    } else {
      res.status(404).json({
        mensaje: "No existe un usuario con ese email. Intentalo de nuevo",
      });
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

//Actualizar usuario

exports.actualizarUsuario = async (req, res, next) => {
  // bcrypt.hash(currentPassword, salt, function (err) {});
  // let contrasena = await bcrypt.hash(req.body.NewPassword, 10);

  try {
    async function modifyPass() {
      const newPassword = req.body.NewPassword;

      bcrypt.hash(newPassword, 10, async function (err, newPasswordHash) {
        const pass = await Usuarios.findByIdAndUpdate(
          { _id: req.params.idUsuario },
          { contrasena: newPasswordHash }
        );
        res.status(200).json({ message: "¡Cambio de contraseña exitoso!" });
      });
    }

    let email = req.body.email;

    email ? matchFn() : modifyPass();

    async function matchFn() {
      var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.match(emailValido)) {
        var usuario = await Usuarios.findOneAndUpdate(
          { _id: req.params.idUsuario },
          req.body,
          {
            new: true,
          }
        );
        return res.json(usuario);
      } else {
        return res.json({ mensaje: "Correo electrónico inválido" });
      }
    }
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.json({ mensaje: "Datos ya existentes" });
    }
    next();
  }
};

//Eliminar usuario
exports.eliminarUsuario = async (req, res, next) => {
  try {
    await Usuarios.findOneAndDelete(
      { _id: req.params.idUsuario },
      res.json({ mensaje: "Usuario eliminado" })
    );
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.autenticarUsuario = async (req, res, next) => {
  //buscar el usuario
  const { email, contrasena } = req.body;

  const usuario = await Usuarios.findOne({ email: email });

  console.log(usuario);

  if (!usuario) {
    //Si el usuario no existe
    await res.status(404).json({ mensaje: "Ese usuario no existe" });
    next();
  } else {
    //Si el usuario existe, verificar si el pass es correcto o incorrecto
    if (!bcrypt.compareSync(contrasena, usuario.contrasena)) {
      //Si el pass es incorrecto
      await res.status(401).json({ mensaje: "Contraseña incorrecta" });
    } else {
      // let tokenReturn = await token.encode(usuario._id,usuario.nickname);
      //Si el pass es correcto, firmar el token
      const token = jwt.sign(
        {
          email: usuario.email,
          nickname: usuario.nickname,
          celular: usuario.celular,
          _id: usuario._id,
        },
        "LLAVESECRETA",
        {
          expiresIn: "1hr",
        }
      );
      //retornar el token
      res.json({ token });
    }
  }
};
