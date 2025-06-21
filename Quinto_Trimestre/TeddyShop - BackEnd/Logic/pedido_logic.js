const mongoose = require('mongoose');
const DetallePedido = require('../models/detallePedido_model');
const Producto = require('../models/producto_model');
const Factura = require('../models/factura_model');
const Cliente = require('../models/cliente_model');
const Pedido = require('../models/pedido_model');
const { separarNombreYApellido } = require('./cliente_logic'); 



// Crear nuevo pedido
const crearPedido = async (body) => {
    try {
      let cliente = await Cliente.findOne({ telefonoCliente: body.numeroComprador });
  
      if (!cliente) {
        const { nombre, apellido } = separarNombreYApellido(body.nombreComprador);
        const nuevoCliente = new Cliente({
          nombreCliente: body.nombreComprador,
          nombre,
          apellido,
          telefonoCliente: body.numeroComprador,
          pedidos: [],
          facturas: []
        });
        cliente = await nuevoCliente.save();
      }
  
      // CREAR PEDIDO SIN FACTURA INICIAL
      const pedido = new Pedido({
        nombreComprador: body.nombreComprador,
        numeroComprador: body.numeroComprador,
        nombreAgendador: body.nombreAgendador,
        numeroAgendador: body.numeroAgendador,
        localidad: body.localidad,
        direccion: body.direccion,
        barrio: body.barrio,
        cliente: cliente._id,
        estado: body.estado || "en_proceso",
        detallesPedido: [], // Se llenará después
        facturas: [] // Se llenará después
      });
  
      const pedidoGuardado = await pedido.save();
  
      // Actualizar cliente con el pedido
      cliente.pedidos.push(pedidoGuardado._id);
      await cliente.save();
  
      return pedidoGuardado;
    } catch (err) {
      console.error('Error al crear pedido:', err.message);
      throw new Error(`Error al crear el pedido: ${err.message}`);
    }
};

// NUEVA FUNCIÓN para agregar detalle al pedido
const agregarDetallePedido = async (idPedido, idDetallePedido) => {
    try {
        const pedidoActualizado = await Pedido.findByIdAndUpdate(
            idPedido,
            { $push: { detallesPedido: idDetallePedido } },
            { new: true }
        );

        if (!pedidoActualizado) {
            throw new Error(`Pedido con ID ${idPedido} no encontrado`);
        }

        return pedidoActualizado;
    } catch (err) {
        console.error(`Error al agregar detalle al pedido: ${err.message}`);
        throw err;
    }
};

// Actualizar pedido
async function actualizarPedido(id, body) {
  // Validar ID del pedido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`ID de pedido inválido: ${id}`);
  }

  // Preparar campos actualizables
  const camposActualizables = {
    nombreComprador: body.nombreComprador,
    numeroComprador: body.numeroComprador,
    nombreAgendador: body.nombreAgendador,
    numeroAgendador: body.numeroAgendador,
    localidad: body.localidad,
    direccion: body.direccion,
    barrio: body.barrio
  };

  // Actualizar solo los campos permitidos
  const pedidoActualizado = await Pedido.findByIdAndUpdate(
    id,
    { $set: camposActualizables },
    { new: true, runValidators: true }
  );

  if (!pedidoActualizado) {
    throw new Error(`Pedido con ID ${id} no encontrado`);
  }

  return pedidoActualizado;
}

// Listar todos los pedidos
async function listarPedidos() {
    const pedidos = await Pedido.find()
        .populate('cliente', 'telefonoCliente')
        .populate({
            path: 'detallesPedido',
            populate: { path: 'idProducto' }
        })
        .populate({
            path: 'facturas',
            options: { sort: { fecha: -1 } } 
        });

    return pedidos;
}

// Buscar pedido por ID
async function buscarPedidoPorId(id) {
    try {
        const pedido = await Pedido.findById(id)
            .populate('cliente', 'telefonoCliente')
            .populate({
                path: 'detallesPedido',
                populate: { path: 'idProducto' }
            })
            .populate('facturas');

        if (!pedido) throw new Error(`Pedido con ID ${id} no encontrado`);
        return pedido;
    } catch (err) {
        console.error(`Error al buscar el pedido por ID: ${err.message}`);
        throw err;
    }
}

// Eliminar pedido
async function eliminarPedido(id) {
    try {
        const pedido = await Pedido.findByIdAndDelete(id);
        if (!pedido) throw new Error(`Pedido con ID ${id} no encontrado`);
        return pedido;
    } catch (err) {
        console.error(`Error al eliminar el pedido: ${err.message}`);
        throw err;
    }
}


// Reemplazar la función actualizarEstado existente con esta:
async function actualizarEstado(id, nuevoEstado, motivoCancelacion = null) {
    try {
        const pedidoAnterior = await Pedido.findById(id);
        if (!pedidoAnterior) throw new Error(`Pedido con ID ${id} no encontrado`);

        const pedido = await Pedido.findByIdAndUpdate(
            id,
            { estado: nuevoEstado },
            { new: true }
        );

        return pedido;
    } catch (err) {
        console.error(`Error al actualizar estado del pedido: ${err.message}`);
    }
}

// Agregar factura a pedido
async function agregarFacturaAPedido(idPedido, idFactura) {
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
        idPedido,
        { $push: { facturas: idFactura } },
        { new: true }
    );

    if (!pedidoActualizado) throw new Error(`Pedido con ID ${idPedido} no encontrado`);
    return pedidoActualizado;
}

module.exports = {
    crearPedido,
    actualizarPedido,
    listarPedidos,
    buscarPedidoPorId,
    eliminarPedido,
    actualizarEstado,
    agregarFacturaAPedido,
    agregarDetallePedido
};
