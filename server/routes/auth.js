const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/registro', authController.registro);
router.post('/inicio-sesion', authController.inicioSesion);
router.post('/recuperar-contrasena/:token', authController.recuperarContrasena);
router.post('/recuperar-contrasena', authController.recuperarContrasena);

module.exports = router;
