const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');

exports.registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }
    // Verificar si se ha adjuntado una imagen en la solicitud
    let imagen;
    if (req.file) {
      imagen = req.file.path; // Aquí asumo que estás utilizando multer para manejar la carga de archivos
    }

    // Generar un hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await User.create({ nombre, email, password: hashedPassword });
    res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


exports.obtenerUser = async (req, res) =>{
  console.info('obtener Registro')

  try{
      const user = await User.find();
      res.json(user);
  }catch(error){
      console.log(error);
      res.status(500).send('Hubo un error');
  }
}

exports.inicioSesion = async (req, res) => {
  try {
    const { email, password } = req.body;


    // Continuar con la autenticación si la validación de reCAPTCHA es exitosa
    const usuario = await User.findOne({ email });
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


