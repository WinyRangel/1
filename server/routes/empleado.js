const express = require('express');
const router = express.Router();
const empeleadoController = require('./../controllers/empleadoController')

router.post('/filtros', empeleadoController.getEmpleadoFiltro);
// router.post('/asignar', empeleadoController.asignarRecurso)
// router.put('/asignar', empeleadoController.actualizarRecurso)

module.exports = router;