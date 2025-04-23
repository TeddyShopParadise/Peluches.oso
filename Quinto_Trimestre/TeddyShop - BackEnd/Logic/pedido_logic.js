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
  
      const pedido = new Pedido({
        nombreComprador: body.nombreComprador,
        numeroComprador: body.numeroComprador,
        nombreAgendador: body.nombreAgendador,
        numeroAgendador: body.numeroAgendador,
        localidad: body.localidad,
        direccion: body.direccion,
        barrio: body.barrio,
        cliente: cliente._id,
        estado: body.estado || "pendiente",
        detallesPedido: [],
        facturas: []
      });
  
      const pedidoGuardado = await pedido.save();
  
      const detallesIds = await Promise.all(body.detallesPedido.map(async (detalle) => {
        const producto = await Producto.findById(detalle.idProducto);
        if (!producto) throw new Error(`Producto con ID ${detalle.idProducto} no encontrado`);
  
        const detallePedido = new DetallePedido({
          precioDetallePedido: detalle.precioDetallePedido,
          cantidadDetallePedido: detalle.cantidadDetallePedido,
          idPedido: pedidoGuardado._id,
          idProducto: detalle.idProducto
        });
  
        const detalleGuardado = await detallePedido.save();
        return detalleGuardado._id;
      }));
  
      pedidoGuardado.detallesPedido = detallesIds;
      await pedidoGuardado.save();
  
      const factura = new Factura({
        idPedido: pedidoGuardado._id,
        fecha: new Date(),
        totalFactura: body.totalFactura || 0, 
        estado: "emitida"
      });
  
      const facturaGuardada = await factura.save();
  
      pedidoGuardado.facturas.push(facturaGuardada._id);
      await pedidoGuardado.save();
  
      cliente.pedidos.push(pedidoGuardado._id);
      cliente.facturas.push(facturaGuardada._id);
      await cliente.save();
  
      return pedidoGuardado;
    } catch (err) {
      console.error('Error al crear pedido:', err.message);
      throw new Error(`Error al crear el pedido: ${err.message}`);
    }
  };

// Actualizar pedido
async function actualizarPedido(id, body) {
    const detallesIds = await Promise.all(body.detallesPedido.map(async (detalleId) => {
        const detalle = await DetallePedido.findById(detalleId);
        if (!detalle) throw new Error(`DetallePedido con ID ${detalleId} no encontrado`);

        const producto = await Producto.findById(detalle.idProducto);
        if (!producto) throw new Error(`Producto con ID ${detalle.idProducto} no encontrado`);
        if (!producto.tamañoProducto) throw new Error(`El producto con ID ${detalle.idProducto} no tiene tamaño definido`);

        return detalle._id;
    }));

    const pedidoActualizado = await Pedido.findByIdAndUpdate(id, {
        $set: {
            nombreComprador: body.nombreComprador,
            numeroComprador: body.numeroComprador,
            nombreAgendador: body.nombreAgendador,
            numeroAgendador: body.numeroAgendador,
            localidad: body.localidad,
            direccion: body.direccion,
            barrio: body.barrio,
            cliente: body.cliente,           
            estado: body.estado, 
            detallesPedido: detallesIds,
            facturas: body.facturas || []
        }
    }, { new: true });

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

// Actualizar estado del pedido
async function actualizarEstado(id, nuevoEstado) {
    const pedido = await Pedido.findByIdAndUpdate(
        id,
        { estado: nuevoEstado },
        { new: true }
    );

    if (!pedido) throw new Error(`Pedido con ID ${id} no encontrado`);
    return pedido;
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
    agregarFacturaAPedido
};
