const express = require('express');
const router = express.Router();

const recursoController = require('../controllers/recursoController');


router.get('/empleado', recursoController.getRecursoPorEmpleado)
router.post('/asignar', recursoController.asignarRecurso)
router.post('/filtros', recursoController.getRecursoFiltro);
router.post('/asignar/empleado', recursoController.asignarEmpleado)
router.post('/reportar/falla', recursoController.reportarFallas)
router.post('/', recursoController.crearRecurso);
router.get('/', recursoController.obtenerRecursos);
router.put(('/:id'), recursoController.actualizarRecurso);
router.get(('/:id'), recursoController.obtenerRecursoID);
router.delete(('/:id'), recursoController.eliminarRecurso);

//router.post(('/'), () => {
    //console.log('Creando recurso...');
//})

module.exports = router;

