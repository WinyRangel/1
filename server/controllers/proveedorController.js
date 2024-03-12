const Proveedor = require ("../models/Proveedor");

exports.crearProveedor = async (req, res) => {
    console.info('crearEmpleado')
    try{
        let proveedor;
        //crear proveedor
        proveedor = new Proveedor(req.body);

        await proveedor.save();
        res.send(proveedor);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.actualizarProveedor = async (req, res) =>{
    console.info('actualizarProveedor')

    try{
        console.info('id: ' + req.params.id)
        const { nombre, direccion, codigoC, codigoI, telefono, moneda, IVA} = req.body;
        let proveedor = await Proveedor.findById(req.params.id);
        console.info(proveedor)
        if(!proveedor){
            res.status(404).json({msg: 'No existe este el proveedor'})
            
        }
        proveedor.nombre = nombre;
        proveedor.direccion = direccion;
        proveedor.codigoC = codigoC;            
        proveedor.codigoI = codigoI;
        proveedor.telefono = telefono;
        proveedor.email = email;
        proveedor.moneda = moneda;
        proveedor.IVA = IVA;
            proveedor = await Proveedor.findOneAndUpdate({_id: req.params.id}, proveedor, { new: true })
            res.json(proveedor);
        }
        catch (error){
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    }


    exports.obtenerProveedor = async (req, res) =>{
        console.info('obtenerProveedor')
        console.info(req.params)
        try{
                let proveedor = await Proveedor.findById(req.params.id);
                if(!proveedor){
                    res.status(404).json({msg: 'No existe este proveedor'})
    
                }
               
                res.json(proveedor);
            }
            catch (error){
                console.log(error);
                res.status(500).send('Hubo un error');
            }
        }
    
        
     
    exports.eliminarProveedor = async (req, res) =>{
        console.info('eliminar Proveedor')

        try {
            let proveedor = await Proveedor.findById(req.params.id);
    
            if(!proveedor) {
                res.status(404).json({ msg: 'No existe el proveedor' })
            }
           
            await Proveedor.findOneAndDelete({ _id: req.params.id })
            res.json({ msg: 'Proveedor eliminado con exito' });
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
        }

