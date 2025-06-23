const Movimiento = require('../models/movimiento_model'); 
const Inventario = require ('../models/inventario_model'); 

// Función asíncrona para crear un nuevo movimiento
async function crearMovimiento(body) {
    const movimiento = new Movimiento({
        fecha: body.fecha,
        cantidadIngreso: body.cantidadIngreso,
        cantidadVendida: body.cantidadVendida,
        inventario: body.inventario 
    });

    const movimientoGuardado = await movimiento.save();

    const inventario = await Inventario.findById(body.inventario);
    if (!inventario) {
        throw new Error('Inventario no encontrado para el movimiento');
    }

    inventario.stock += body.cantidadIngreso;
    inventario.stock -= body.cantidadVendida;

    inventario.movimientos.push(movimientoGuardado._id);

    await inventario.save();

    return movimientoGuardado;
}

// Función asíncrona para actualizar un movimiento
async function actualizarMovimiento(id, body) {
    const movimientoAnterior = await Movimiento.findById(id);
    if (!movimientoAnterior) {
        throw new Error(`Movimiento con ID ${id} no encontrado`);
    }

    const inventario = await Inventario.findById(movimientoAnterior.inventario);
    if (!inventario) {
        throw new Error('Inventario no encontrado para el movimiento');
    }

    inventario.stock -= movimientoAnterior.cantidadIngreso;
    inventario.stock += movimientoAnterior.cantidadVendida;

    inventario.stock += body.cantidadIngreso;
    inventario.stock -= body.cantidadVendida;

    await inventario.save();

    const movimiento = await Movimiento.findByIdAndUpdate(id, {
        $set: {
            fecha: body.fecha,
            cantidadIngreso: body.cantidadIngreso,
            cantidadVendida: body.cantidadVendida,
            inventario: body.inventario 
        }
    }, { new: true });

    return movimiento;
}

// Función asíncrona para listar todos los movimientos
async function listarMovimientos() {
    const movimientos = await Movimiento.find()
        .populate('inventario'); 
    return movimientos;
}

// Función asíncrona para buscar un movimiento por su ID
async function buscarMovimientoPorId(id) {
    try {
        const movimiento = await Movimiento.findById(id)
            .populate('inventario'); 

        if (!movimiento) {
            throw new Error(`Movimiento con ID ${id} no encontrado`);
        }
        return movimiento;
    } catch (err) {
        console.error(`Error al buscar el movimiento por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un movimiento por su ID
async function eliminarMovimiento(id) {
    try {
        const movimiento = await Movimiento.findByIdAndDelete(id);
        if (!movimiento) {
            throw new Error(`Movimiento con ID ${id} no encontrado`);
        }

        const inventario = await Inventario.findById(movimiento.inventario);
        if (inventario) {
            inventario.stock -= movimiento.cantidadIngreso;
            inventario.stock += movimiento.cantidadVendida;
            inventario.movimientos = inventario.movimientos.filter(movId => movId.toString() !== id);

            await inventario.save();
        }

        return movimiento;
    } catch (err) {
        console.error(`Error al eliminar el movimiento: ${err.message}`);
        throw err;
    }
}

// Función de diagnóstico para verificar las referencias entre movimientos e inventarios
async function diagnosticarMovimientos() {
    try {
        
        const totalMovimientos = await Movimiento.countDocuments();
        
        const totalInventarios = await Inventario.countDocuments();
        
        const movimientos = await Movimiento.find({}).lean();
        
        let movimientosSinInventario = 0;
        let movimientosConInventarioInvalido = 0;
        let movimientosValidos = 0;
        
        // Obtener todos los IDs de inventarios válidos
        const inventariosValidos = await Inventario.find({}, '_id').lean();
        const idsInventariosValidos = inventariosValidos.map(inv => inv._id.toString());
        
        for (const movimiento of movimientos) {
           
            if (!movimiento.inventario) {
                console.log(`  ❌ Sin referencia a inventario`);
                movimientosSinInventario++;
            } else {
                const inventarioRefStr = movimiento.inventario.toString();
                if (idsInventariosValidos.includes(inventarioRefStr)) {
                    movimientosValidos++;
                } else {
                    console.log(`  ❌ Referencia inválida (inventario no existe)`);
                    movimientosConInventarioInvalido++;
                }
            }
        }
      
        const inventarios = await Inventario.find({}).populate('movimientos').lean();
        
        for (const inventario of inventarios) {
            
            if (inventario.movimientos && inventario.movimientos.length > 0) {
                for (const mov of inventario.movimientos) {
                    if (mov) {
                    } else {
                        console.log(`    ❌ Referencia a movimiento inexistente`);
                    }
                }
            }
        }
        
        return {
            totalMovimientos,
            totalInventarios,
            movimientosValidos,
            movimientosSinInventario,
            movimientosConInventarioInvalido
        };
        
    } catch (error) {
        console.error('Error en diagnóstico:', error);
        throw error;
    }
}

// Función para limpiar movimientos huérfanos
async function limpiarMovimientosHuerfanos() {
    try {
        
        const inventariosValidos = await Inventario.find({}, '_id').lean();
        const idsInventariosValidos = inventariosValidos.map(inv => inv._id.toString());
        
        const todosMovimientos = await Movimiento.find({}).lean();
        const movimientosHuerfanos = [];
        
        for (const movimiento of todosMovimientos) {
            if (!movimiento.inventario || !idsInventariosValidos.includes(movimiento.inventario.toString())) {
                movimientosHuerfanos.push(movimiento._id);
            }
        }
                
        if (movimientosHuerfanos.length > 0) {
            const resultado = await Movimiento.deleteMany({
                _id: { $in: movimientosHuerfanos }
            });
            
            return resultado.deletedCount;
        }
        
        return 0;
        
    } catch (error) {
        console.error('Error en limpieza:', error);
        throw error;
    }
}

module.exports = {
    crearMovimiento,
    actualizarMovimiento,
    listarMovimientos,
    buscarMovimientoPorId,
    eliminarMovimiento,
    limpiarMovimientosHuerfanos,
     diagnosticarMovimientos

};
