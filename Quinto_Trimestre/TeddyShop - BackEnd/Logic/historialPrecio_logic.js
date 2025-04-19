const HistorialPrecio = require('../models/historialPrecio_model');
const Producto = require('../models/producto_model');

// Función asíncrona para crear un nuevo historial de precio
async function crearHistorialPrecio(body) {
    const historialPrecio = new HistorialPrecio({
        precio: body.precio,
        fechaInicio: body.fechaInicio,
        fechaFin: body.fechaFin,
        estadoPrecio: body.estadoPrecio,
       // producto: body.producto // Se espera un ObjectId de Producto
    });

    return await historialPrecio.save();
}

// Función asíncrona para actualizar un historial de precio
async function actualizarHistorialPrecio(id, body) {
    const historialPrecio = await HistorialPrecio.findByIdAndUpdate(id, {
        $set: {
            precio: body.precio,
            fechaInicio: body.fechaInicio,
            fechaFin: body.fechaFin,
            estadoPrecio: body.estadoPrecio,
            //producto: body.producto // Se espera un ObjectId de Producto
        }
    }, { new: true });

    return historialPrecio;
}

// Función asíncrona para listar todos los historiales de precios
async function listarHistorialPrecios() {
    const historialesPrecio = await HistorialPrecio.find()
        .populate('producto');
    return historialesPrecio;
}

// Función asíncrona para buscar un historial de precio por su ID
async function buscarHistorialPrecioPorId(id) {
    try {
        const historialPrecio = await HistorialPrecio.findById(id)
            .populate('producto'); 

        if (!historialPrecio) {
            throw new Error(`Historial de precio con ID ${id} no encontrado`);
        }
        return historialPrecio;
    } catch (err) {
        console.error(`Error al buscar el historial de precio por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un historial de precio por su ID
async function eliminarHistorialPrecio(id) {
    try {
        const historialPrecio = await HistorialPrecio.findByIdAndDelete(id);
        if (!historialPrecio) {
            throw new Error(`Historial de precio con ID ${id} no encontrado`);
        }
        return historialPrecio;
    } catch (err) {
        console.error(`Error al eliminar el historial de precio: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearHistorialPrecio,
    actualizarHistorialPrecio,
    listarHistorialPrecios,
    buscarHistorialPrecioPorId,
    eliminarHistorialPrecio
};
