const Factura = require('../models/factura_model');
const DetalleFactura = require('../models/detalleFactura_model');
const Cliente = require('../models/cliente_model');
const Pedido = require('../models/pedido_model');
const MetodoPago = require('../models/metodoPago_model');
const { agregarFacturaAPedido } = require('./pedido_logic');

// Crear factura
async function crearFactura(body) {
  const facturaExistente = await Factura.findOne({ pedido: body.pedido });

  if (facturaExistente) {
    if (body.detallesFactura && body.detallesFactura.length > 0) {
      const nuevosDetalles = body.detallesFactura.filter(
        detalle => !facturaExistente.detallesFactura.includes(detalle)
      );

      if (nuevosDetalles.length > 0) {
        facturaExistente.detallesFactura.push(...nuevosDetalles);
        if (body.metodoPago) {
          facturaExistente.metodoPago = body.metodoPago;
        }
        await facturaExistente.save();
      }
    }

    return facturaExistente;
  }

  const pedidoAsociado = await Pedido.findById(body.pedido);
  if (!pedidoAsociado) {
    throw new Error('Pedido no encontrado al crear factura');
  }

  const factura = new Factura({
    fechaCreacionFactura: body.fechaCreacionFactura || new Date().toISOString().split('T')[0],
    horaCreacionFactura: body.horaCreacionFactura || new Date().toLocaleTimeString('es-MX'),
    pedido: body.pedido,
    cliente: pedidoAsociado.cliente, 
    detallesFactura: body.detallesFactura || [],
    metodoPago: body.metodoPago
  });

  const facturaGuardada = await factura.save();

  await agregarFacturaAPedido(facturaGuardada.pedido, facturaGuardada._id);

  await Cliente.findByIdAndUpdate(pedidoAsociado.cliente, {
    $push: { facturas: facturaGuardada._id }
  });

  return facturaGuardada;
}


// Actualizar factura
async function actualizarFactura(id, body) {
    
    const facturaOriginal = await Factura.findById(id);
    if (!facturaOriginal) {
        console.error(`❌ FACTURA ${id} NO ENCONTRADA`);
        throw new Error(`Factura con ID ${id} no encontrada`);
    }


    if (facturaOriginal.pedido.toString() !== body.pedido) {
        const facturaExistente = await Factura.findOne({ pedido: body.pedido });
        if (facturaExistente) {
            console.error("❌ EL NUEVO PEDIDO YA TIENE FACTURA");
            throw new Error('El nuevo pedido ya tiene una factura generada.');
        }
    }

    const factura = await Factura.findByIdAndUpdate(id, {
        $set: {
            fechaCreacionFactura: body.fechaCreacionFactura,
            horaCreacionFactura: body.horaCreacionFactura,
            pedido: body.pedido,
            cliente: body.cliente,
            detallesFactura: body.detallesFactura,
            metodoPago: body.metodoPago
        }
    }, { new: true });


    return factura;
}
// listarFacturas 
async function listarFacturas() {
  try {
    const facturas = await Factura.find()
      .populate('pedido', 'numPedido')
      .populate('cliente', 'nombreCliente')
      .populate({
        path: 'detallesFactura',
        populate: [
          { path: 'idProducto', select: 'estiloProducto disponibilidadProducto tamañoProducto' },
          { path: 'idInventario', select: 'stock precioVenta precioCompra' }
        ]
      })
      .populate('metodoPago', 'nombreMetodoPago')
      .lean();

    return facturas;
  } catch (err) {
    console.error("❌ ERROR AL LISTAR FACTURAS:", err.message);
    console.error("❌ STACK TRACE:", err.stack);
    throw new Error("Error al obtener facturas");
  }
}

// buscarFacturaPorId 
async function buscarFacturaPorId(id) {
  try {
    const factura = await Factura.findById(id)
      .populate('pedido', 'numPedido')
      .populate('cliente', 'nombreCliente')
      .populate({
        path: 'detallesFactura',
        populate: [
          { path: 'idProducto', select: 'estiloProducto disponibilidadProducto tamañoProducto' },
          { path: 'idInventario', select: 'stock precioVenta precioCompra' }
        ]
      })
      .populate('metodoPago', 'nombreMetodoPago')
      .lean();

    if (!factura) {
      console.error(`❌ FACTURA ${id} NO ENCONTRADA`);
      return null;
    }

    return factura;
  } catch (err) {
    console.error(`❌ ERROR AL BUSCAR LA FACTURA POR ID: ${err.message}`);
    console.error("❌ STACK TRACE:", err.stack);
    throw err;
  }
}

// Eliminar factura
async function eliminarFactura(id) {
    try {
        
        const factura = await Factura.findByIdAndDelete(id);
        if (!factura) {
            console.error(`❌ FACTURA ${id} NO ENCONTRADA PARA ELIMINAR`);
            throw new Error(`Factura con ID ${id} no encontrada`);
        }
                return factura;
    } catch (err) {
        console.error(`❌ ERROR AL ELIMINAR LA FACTURA: ${err.message}`);
        console.error("❌ STACK TRACE:", err.stack);
        throw err;
    }
}

module.exports = {
    crearFactura,
    actualizarFactura,
    listarFacturas,
    buscarFacturaPorId,
    eliminarFactura
};