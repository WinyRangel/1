//Rutas empleado
const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

//api empleados
router.post('/',  proveedorController.crearProveedor);
router.get('/', proveedorController.obtenerProveedores);
router.put('/:id', proveedorController.actualizarProveedor);
router.get('/:id', proveedorController.obtenerProveedor);
router.delete('/:id', proveedorController.eliminarProveedor);

//Estados
module.exports = router;