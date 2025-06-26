const MetodoPago = require('../models/metodoPago_model'); 
const Factura = require('../models/factura_model'); 

// Función asíncrona para crear un nuevo método de pago
async function crearMetodoPago(body) {
    const metodoPago = new MetodoPago({
        nombreMetodoPago: body.nombreMetodoPago
    });

    return await metodoPago.save();
}

// Función asíncrona para actualizar un método de pago
async function actualizarMetodoPago(id, body) {
    const metodoPago = await MetodoPago.findByIdAndUpdate(id, {
        $set: {
            nombreMetodoPago: body.nombreMetodoPago
        }
    }, { new: true });

    return metodoPago;
}

// Función asíncrona para listar todos los métodos de pago
async function listarMetodosPago() {
    const metodosPago = await MetodoPago.find()
    return metodosPago;
}

// Función asíncrona para buscar un método de pago por su ID
async function buscarMetodoPagoPorId(id) {
    try {
        const metodoPago = await MetodoPago.findById(id)
        if (!metodoPago) {
            throw new Error(`Método de pago con ID ${id} no encontrado`);
        }
        return metodoPago;
    } catch (err) {
        console.error(`Error al buscar el método de pago por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un método de pago por su ID
async function eliminarMetodoPago(id) {
    try {
        const metodoPago = await MetodoPago.findByIdAndDelete(id);
        if (!metodoPago) {
            throw new Error(`Método de pago con ID ${id} no encontrado`);
        }
        return metodoPago;
    } catch (err) {
        console.error(`Error al eliminar el método de pago: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearMetodoPago,
    actualizarMetodoPago,
    listarMetodosPago,
    buscarMetodoPagoPorId,
    eliminarMetodoPago
};
