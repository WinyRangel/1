const mongoose = require('mongoose');

const ProveedorSchema = mongoose.Schema({
    idProveedor: {
        type: Number,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        require: true
    },
    codigoC: {
        type: String,
        require:false
    },    
    CodigoI: {
        type: String,
        require:false
    },
    email: {
        type: String,
        require:false
    },
    telefono: {
        type: Number,
        require:false
    }  
});

module.exports = mongoose.model('Proveedor', ProveedorSchema);