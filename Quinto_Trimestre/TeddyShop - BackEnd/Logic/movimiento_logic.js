const Movimiento = require('../models/movimiento_model'); 
const Inventario = require ('../models/inventario_model'); 

// Función asíncrona para crear un nuevo movimiento
async function crearMovimiento(body) {
    const movimiento = new Movimiento({
        fecha: body.fecha,
        cantidadIngreso: body.cantidadIngreso,
        cantidadVendida: body.cantidadVendida,
        inventario: body.inventario // Se espera un ObjectId de Inventario
    });

    const movimientoGuardado = await movimiento.save();

    // Actualizar stock en el inventario
    const inventario = await Inventario.findById(body.inventario);
    if (!inventario) {
        throw new Error('Inventario no encontrado para el movimiento');
    }

    inventario.stock += body.cantidadIngreso;
    inventario.stock -= body.cantidadVendida;

    // Guardar el movimiento en el array de movimientos del inventario
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

    // Revertir el efecto anterior del movimiento
    inventario.stock -= movimientoAnterior.cantidadIngreso;
    inventario.stock += movimientoAnterior.cantidadVendida;

    // Aplicar el nuevo efecto del movimiento actualizado
    inventario.stock += body.cantidadIngreso;
    inventario.stock -= body.cantidadVendida;

    await inventario.save();

    const movimiento = await Movimiento.findByIdAndUpdate(id, {
        $set: {
            fecha: body.fecha,
            cantidadIngreso: body.cantidadIngreso,
            cantidadVendida: body.cantidadVendida,
            inventario: body.inventario // Se espera un ObjectId de Inventario
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

        // Ajustar el stock del inventario
        const inventario = await Inventario.findById(movimiento.inventario);
        if (inventario) {
            inventario.stock -= movimiento.cantidadIngreso;
            inventario.stock += movimiento.cantidadVendida;

            // Eliminar referencia al movimiento
            inventario.movimientos = inventario.movimientos.filter(movId => movId.toString() !== id);

            await inventario.save();
        }

        return movimiento;
    } catch (err) {
        console.error(`Error al eliminar el movimiento: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearMovimiento,
    actualizarMovimiento,
    listarMovimientos,
    buscarMovimientoPorId,
    eliminarMovimiento
};
