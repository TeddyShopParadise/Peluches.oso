const DetallePedido = require('../models/detallePedido_model'); 
const Factura = require('../models/factura_model'); 
const Cliente = require('../models/cliente_model'); 
const Pedido = require('../models/pedido_model')


// Función asíncrona para crear un nuevo pedido
async function crearPedido(body) {
    const pedido = new Pedido({
        tamañoOso: body.tamañoOso,
        nombreComprador: body.nombreComprador,
        numeroComprador: body.numeroComprador,
        nombreAgendador: body.nombreAgendador,
        numeroAgendador: body.numeroAgendador,
        localidad: body.localidad,
        direccion: body.direccion,
        barrio: body.barrio,
        cliente: body.cliente,
        apellidoAgendador: body.apellidoAgendador,
        apellidoComprador: body.apellidoComprador,
        detallesPedido: body.detallesPedido || [],
        facturas: body.facturas || [],
    });

    return await pedido.save();
}

// Función asíncrona para actualizar un pedido
async function actualizarPedido(id, body) {
    const pedido = await Pedido.findByIdAndUpdate(id, {
        $set: {
            tamañoOso: body.tamañoOso,
            nombreComprador: body.nombreComprador,
            numeroComprador: body.numeroComprador,
            nombreAgendador: body.nombreAgendador,
            numeroAgendador: body.numeroAgendador,
            localidad: body.localidad,
            direccion: body.direccion,
            barrio: body.barrio,
            cliente: body.cliente,
            apellidoAgendador: body.apellidoAgendador,
            apellidoComprador: body.apellidoComprador,
            detallesPedido: body.detallesPedido || [],
            facturas: body.facturas || []
        }
    }, { new: true });

    return pedido;
}

// Función asíncrona para listar todos los pedidos
async function listarPedidos() {
    const pedidos = await Pedido.find()
        .populate('cliente', 'nombre email') // Personaliza según tu modelo de Cliente
        .populate('detallesPedido')
        .populate('facturas')
    return pedidos;
}

// Función asíncrona para buscar un pedido por su ID
async function buscarPedidoPorId(id) {
    try {
        const pedido = await Pedido.findById(id)
            .populate('cliente', 'nombre email')
            .populate('detallesPedido')
            .populate('facturas')

        if (!pedido) {
            throw new Error(`Pedido con ID ${id} no encontrado`);
        }
        return pedido;
    } catch (err) {
        console.error(`Error al buscar el pedido por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un pedido por su ID
async function eliminarPedido(id) {
    try {
        const pedido = await Pedido.findByIdAndDelete(id);
        if (!pedido) {
            throw new Error(`Pedido con ID ${id} no encontrado`);
        }
        return pedido;
    } catch (err) {
        console.error(`Error al eliminar el pedido: ${err.message}`);
        throw err;
    }
}


//Funcion para actualizar el estado de un pedido
async function actualizarEstado(id, nuevoEstado) {
    const pedido = await Pedido.findByIdAndUpdate(
        id,
        { estado: nuevoEstado },
        { new: true }
    );

    if (!pedido) {
        throw new Error(`Pedido con ID ${id} no encontrado`);
    }

    return pedido;
}

module.exports = {
    crearPedido,
    actualizarPedido,
    listarPedidos,
    buscarPedidoPorId,
    eliminarPedido,
    actualizarEstado
};
