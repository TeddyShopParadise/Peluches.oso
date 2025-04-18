const DetallePedido = require('../models/detallePedido_model');
const Pedido = require('../models/pedido_model');
const Producto = require('../models/producto_model');

// Función asíncrona para crear un nuevo detalle de pedido
async function crearDetallePedido(body) {
    let detallePedido = new DetallePedido({
        numDetalle: body.numDetalle,
        precioDetallePedido: body.precioDetallePedido,
        cantidadDetallePedido: body.cantidadDetallePedido,
        pedidoNumPedido: body.pedidoNumPedido,
        idProducto: body.idProducto
    });

    return await detallePedido.save();
}

// Función asíncrona para actualizar un detalle de pedido
async function actualizarDetallePedido(id, body) {
    let detallePedido = await DetallePedido.findByIdAndUpdate(id, {
        $set: {
            numDetalle: body.numDetalle,
            precioDetallePedido: body.precioDetallePedido,
            cantidadDetallePedido: body.cantidadDetallePedido,
            pedidoNumPedido: body.pedidoNumPedido,
            idProducto: body.idProducto
        }
    }, { new: true });

    return detallePedido;
}

// Función asíncrona para listar todos los detalles de pedido
async function listarDetallesPedido() {
    let detallesPedido = await DetallePedido.find()
        .populate('pedidoNumPedido', 'numeroPedido') // Reemplazar con los campos relevantes de Pedido
        .populate('idProducto', 'nombreProducto'); // Reemplazar con los campos relevantes de Producto
    return detallesPedido;
}

// Función asíncrona para buscar un detalle de pedido por su ID
async function buscarDetallePedidoPorId(id) {
    try {
        const detallePedido = await DetallePedido.findById(id)
            .populate('pedidoNumPedido', 'numeroPedido') // Reemplazar con los campos relevantes de Pedido
            .populate('idProducto', 'nombreProducto'); // Reemplazar con los campos relevantes de Producto
        if (!detallePedido) {
            throw new Error(`Detalle de Pedido con ID ${id} no encontrado`);
        }
        return detallePedido;
    } catch (err) {
        console.error(`Error al buscar el detalle de pedido por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un detalle de pedido por su ID
async function eliminarDetallePedido(id) {
    try {
        const detallePedido = await DetallePedido.findByIdAndDelete(id);
        if (!detallePedido) {
            throw new Error(`Detalle de Pedido con ID ${id} no encontrado`);
        }
        return detallePedido;
    } catch (err) {
        console.error(`Error al eliminar el detalle de pedido: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearDetallePedido,
    actualizarDetallePedido,
    listarDetallesPedido,
    buscarDetallePedidoPorId,
    eliminarDetallePedido
};
