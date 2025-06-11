// services/devolucionesService.js
const mongoose     = require('mongoose');
const Devoluciones = require('../models/devoluciones_model');
const Inventario   = require('../models/inventario_model');
const Movimiento   = require('../models/movimiento_model');
const Pedido       = require('../models/pedido_model');

async function crearDevolucion(body) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const devolucion = await Devoluciones.create([{
      pedido:  body.pedido,
      fecha:   body.fecha,
      motivo:  body.motivo,
      items:   body.items
    }], { session });

    for (const { inventario: invId, cantidad } of body.items) {
      const inv = await Inventario.findById(invId).session(session);
      if (!inv) throw new Error(`Inventario ${invId} no encontrado`);

      inv.stock += cantidad;

      const mov = new Movimiento({
        fecha:                new Date(),
        cantidadIngreso:      cantidad,
        cantidadVendida:      0,
        descripcionMovimiento: `Devolución #${devolucion[0]._id}`,
        inventario:           inv._id
      });

      inv.movimientos.push(mov._id);
      await Promise.all([
        inv.save({ session }),
        mov.save({ session })
      ]);
    }

    await session.commitTransaction();
    session.endSession();

    return Devoluciones
      .findById(devolucion[0]._id)
      .populate('pedido')
      .populate('items.inventario')
      .lean();

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
}
async function listarDevoluciones() {
  return Devoluciones
    .find()
    .populate('pedido')
    .populate('items.inventario')
    .sort({ fecha: -1 })
    .lean();
}

async function buscarDevolucionPorId(id) {
  const dev = await Devoluciones
    .findById(id)
    .populate('pedido')
    .populate('items.inventario')
    .lean();
  if (!dev) throw new Error(`Devolución con ID ${id} no encontrada`);
  return dev;
}

async function buscarDevolucionesPorPedido(pedidoId) {
  return Devoluciones
    .find({ pedido: pedidoId })
    .populate('items.inventario')
    .lean();
}

async function eliminarDevolucion(id) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const dev = await Devoluciones.findById(id).session(session);
    if (!dev) throw new Error(`Devolución ${id} no encontrada`);

    for (const { inventario: invId, cantidad } of dev.items) {
      const inv = await Inventario.findById(invId).session(session);
      if (!inv) continue;

      inv.stock -= cantidad;
      await inv.save({ session });

      await Movimiento.deleteMany({
        inventario: invId,
        descripcionMovimiento: { $regex: `Devolución.*${dev._id}` }
      }).session(session);
    }

    await Devoluciones.findByIdAndDelete(id).session(session);
    await session.commitTransaction();
    session.endSession();

    return { mensaje: 'Devolución eliminada y stock revertido' };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
}

module.exports = {
  crearDevolucion,
  listarDevoluciones,
  buscarDevolucionPorId,
  buscarDevolucionesPorPedido,
  eliminarDevolucion
};
