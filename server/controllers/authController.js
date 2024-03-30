const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { transporter } = require('../nodemailer'); // Ajusta la ruta según tu estructura de carpetas
const { body, validationResult } = require('express-validator');

exports.registro = async (req, res) => {
  try {
    const { nombre, email, password, username } = req.body;
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }
    const usuarioExistente1 = await User.findOne({ username });
    if (usuarioExistente1) {
      return res.status(400).json({ mensaje: 'El nombre de usuario ya está registrado' });
    }
    // Verificar si se ha adjuntado una imagen en la solicitud
    let imagen;
    if (req.file) {
      imagen = req.file.path; // Aquí asumo que estás utilizando multer para manejar la carga de archivos
    }

    // Generar un hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await User.create({ nombre, email, password: hashedPassword, username, rol: 'usuario'});
   await usuario.save();

   res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario });
 } catch (error) {
   console.error(error);
   res.status(500).json({ mensaje: 'Error en el servidor' });
 }
};


exports.obtenerUser = async (req, res) =>{
  console.info('obtener Registro')

  try{
      // Verificar el rol del usuario antes de permitir la operación
      if (req.user.rol !== 'administrador') {
        return res.status(403).json({ mensaje: 'No tienes permiso para realizar esta acción' });
      }

      const user = await User.find();
      res.json(user);
  } catch(error){
      console.log(error);
      res.status(500).send('Hubo un error');
  }
}

exports.inicioSesion = async (req, res) => {
  try {
    const { password, username } = req.body;


    // Continuar con la autenticación si la validación de reCAPTCHA es exitosa
    const usuario = await User.findOne({ username });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar la contraseña utilizando bcrypt.compare
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ usuarioId: usuario._id }, 'secreto', { expiresIn: '120ms' });

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// authController.js


const resetPasswordEmail = (user, token) => {
  const resetUrl = `${process.env.BASE_URL}/auth/reset-password/${token}`; 
  
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Restablecer contraseña</title>
    </head>
    <body style="font-family: Arial, sans-serif;">
      <p>Hola ${user.nombre},</p>
      <p>Ha solicitado restablecer su contraseña. Haga clic en el siguiente enlace para restablecer su contraseña:</p>
      <p><a href="${resetUrl}" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a></p>
      <p>Si no ha solicitado restablecer su contraseña, ignore este correo electrónico.</p>
      <p>Atentamente,</p>
      <p>El equipo de soporte.</p>
    </body>
  </html>
  `;
};


exports.recuperarContrasena = async (req, res) => {
  try {
    const emailRules = [
      body('email').isEmail().withMessage('Por favor ingrese un correo electrónico válido'),
    ];

    const validationResults = validationResult(req);
    if (!validationResults.isEmpty()) {
      return res.status(400).json({ errors: validationResults.array() });
    }

    const { email } = req.body;
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const token = jwt.sign({ usuarioId: usuario._id }, 'secreto', { expiresIn: '1h' });
    usuario.resetPassword = { token, expires: Date.now() + 3600000 }; // 1 hora de expiración
    await usuario.save();

    // Envía el correo electrónico con el enlace de restablecimiento de contraseña
    const mailOptions = {
      from: 'actunity24@gmail.com',
      to: usuario.email,
      subject: 'Restablecer contraseña',
      html: resetPasswordEmail(usuario, token)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error en el servidor' });
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ mensaje: 'Se ha enviado un correo electrónico con las instrucciones para restablecer tu contraseña' });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};