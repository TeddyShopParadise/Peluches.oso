const DetallePedido = require('../models/detallePedido_model');
const Pedido = require('../models/pedido_model');
const Producto = require('../models/producto_model');
const Inventario = require('../models/inventario_model');
const Movimiento = require('../models/movimiento_model');

async function crearDetallePedido(body) {
    const session = await DetallePedido.startSession();
    session.startTransaction();

    try {
        // Buscar el producto para validar el tamaño
        const producto = await Producto.findById(body.idProducto);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        if (!producto.tamañoProducto) {
            throw new Error('El producto no tiene tamaño definido');
        }

        // Crear el detalle del pedido
        const detallePedido = new DetallePedido({
            precioDetallePedido: body.precioDetallePedido,
            cantidadDetallePedido: body.cantidadDetallePedido,
            idPedido: body.idPedido,
            idProducto: body.idProducto
        });

        const detalleGuardado = await detallePedido.save({ session });

        // Buscar inventario relacionado al producto
        const inventario = await Inventario.findOne({ idProducto: body.idProducto }).session(session);

        if (!inventario) {
            throw new Error('No se encontró inventario asociado al producto');
        }

        // Validar stock suficiente
        if (inventario.stock < body.cantidadDetallePedido) {
            throw new Error('Stock insuficiente para completar el pedido');
        }

        // Crear movimiento por venta
        const movimiento = new Movimiento({
            fecha: new Date(),
            cantidadIngreso: 0,
            cantidadVendida: body.cantidadDetallePedido,
            inventario: inventario._id
        });

        const movimientoGuardado = await movimiento.save({ session });

        // Descontar stock y agregar movimiento al inventario
        inventario.stock -= body.cantidadDetallePedido;
        inventario.movimientos.push(movimientoGuardado._id);
        await inventario.save({ session });

        // Confirmar transacción
        await session.commitTransaction();
        session.endSession();

        return detalleGuardado;

    } catch (error) {
        // Si ocurre un error, revertimos la transacción
        await session.abortTransaction();
        session.endSession();
        console.error('Error al crear detalle y actualizar inventario/movimiento:', error);
        throw error;
    }
}



// Función asíncrona para actualizar un detalle de pedido
async function actualizarDetallePedido(id, body) {
    let detallePedido = await DetallePedido.findByIdAndUpdate(id, {
        $set: {
            precioDetallePedido: body.precioDetallePedido,
            cantidadDetallePedido: body.cantidadDetallePedido,
            idPedido: body.idPedido,
            idProducto: body.idProducto
        }
    }, { new: true });

    return detallePedido;
}

// Función asíncrona para listar todos los detalles de pedido
async function listarDetallesPedido() {
    console.log('Listando todos los detalles de pedido...');
    let detallesPedido = await DetallePedido.find()
        .populate('idPedido', 'nombreComprador') 
        .populate('idProducto', 'tamañoProducto'); 
    console.log('Detalles de pedido encontrados:', detallesPedido);
    return detallesPedido;
}


// Función asíncrona para buscar un detalle de pedido por su ID
async function buscarDetallePedidoPorId(id) {
    try {
        const detallePedido = await DetallePedido.findById(id)
            .populate('idPedido', 'nombreComprador') 
            .populate('idProducto', 'tamañoProducto'); 
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
