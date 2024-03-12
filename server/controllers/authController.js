const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    const token = jwt.sign({ usuarioId: usuario._id }, 'secreto', { expiresIn: '1h' }); // Aquí deberías usar un secreto seguro y una expiración adecuada

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};




const axios = require('axios');

exports.verificarCaptcha = async (req, res) => {
  const { secretKey, responseToken } = req.body;
  
  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', {
      secret: secretKey,
      response: responseToken
    });

    if (response.data.success) {
      // Token reCAPTCHA válido, continuar con el proceso de inicio de sesión o registro
      res.status(200).json({ mensaje: 'Token reCAPTCHA válido' });
    } else {
      // Token reCAPTCHA inválido
      res.status(400).json({ mensaje: 'Token reCAPTCHA inválido' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
