const nodemailer = require('../nodemailer');
const Contacto = require('../models/Contacto');
exports.enviarCorreo = async (req, res) => {
    try {
      const { asunto, nombre, correo, descripcion } = req.body;
  
      const nuevoContacto = new Contacto({
        asunto,
        nombre,
        correo,
        descripcion
      });
  
      await nuevoContacto.save();
  
      res.status(201).json({ mensaje: 'Correo enviado correctamente' });
    } catch (error) {
        res.status(404).json({ mensaje: 'Error en el servidor' });      
    }
  };

  exports.obtenerComentario = async (req, res) => {
    try{
        const comentario = await Marca.find({}, 'nombre');
        res.json(marca)
    }catch(error){
        console.log(error);
        res.status(500).send('Error')
    }
}