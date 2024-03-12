const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/registro', authController.registro);
router.get('/registro', authController.obtenerUser);
router.post('/inicio-sesion', authController.inicioSesion);

module.exports = router;
