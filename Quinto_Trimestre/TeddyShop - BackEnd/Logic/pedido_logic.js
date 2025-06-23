const mongoose = require('mongoose');
const DetallePedido = require('../models/detallePedido_model');
const DetalleFactura = require('../models/detalleFactura_model');
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
        detallesPedido: [], 
        facturas: [] 
      });
  
      const pedidoGuardado = await pedido.save();
  
      cliente.pedidos.push(pedidoGuardado._id);
      await cliente.save();
  
      return pedidoGuardado;
    } catch (err) {
      console.error('Error al crear pedido:', err.message);
      throw new Error(`Error al crear el pedido: ${err.message}`);
    }
};

// FUNCIÓN para agregar detalle al pedido
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
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`ID de pedido inválido: ${id}`);
  }

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
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID de pedido inválido o no proporcionado');
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {

    const facturas = await Factura.find({ pedido: id })
                                   .select('detallesFactura')
                                   .session(session);
 

    const detalleFacturaIds = facturas
      .flatMap(f => f.detallesFactura || [])
      .map(dfId => dfId.toString());

    const delDetFact = await DetalleFactura.deleteMany({ 
      _id: { $in: detalleFacturaIds } 
    }).session(session);

    const delFact = await Factura.deleteMany({ pedido: id })
                                  .session(session);

    const delDetPed = await DetallePedido.deleteMany({ idPedido: id })
                                         .session(session);

    const result = await Pedido.deleteOne({ _id: id })
                               .session(session);
    if (result.deletedCount === 0) {
      throw new Error('Pedido no encontrado');
    }

    await session.commitTransaction();
    session.endSession();
    return { message: 'Pedido y todos sus datos relacionados eliminados.' };

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('❌ Error en eliminarPedido:', err);
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
