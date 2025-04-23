const Factura = require('../models/factura_model');
const DetalleFactura = require('../models/detalleFactura_model');
const Cliente = require('../models/cliente_model');
const Pedido = require('../models/pedido_model');
const MetodoPago = require('../models/metodoPago_model');
const { agregarFacturaAPedido } = require('./pedido_logic');

// Crear factura
async function crearFactura(body) {
  // Verificar si el pedido ya tiene una factura asociada
  const facturaExistente = await Factura.findOne({ pedido: body.pedido });
  if (facturaExistente) {
    // Si ya existe una factura, no la volvemos a crear, sino que la devolvemos
    return facturaExistente; // Retorna la factura existente
  }

  // Si no existe una factura, procedemos a crearla
  const factura = new Factura({
    fechaCreacionFactura: body.fechaCreacionFactura,
    horaCreacionFactura: body.horaCreacionFactura,
    pedido: body.pedido,
    cliente: body.cliente,
    detallesFactura: body.detallesFactura || [],
    metodoPago: body.metodoPago
  });

  const facturaGuardada = await factura.save();
  await agregarFacturaAPedido(facturaGuardada.pedido, facturaGuardada._id);

  return facturaGuardada;
}
// Actualizar factura
async function actualizarFactura(id, body) {
    const facturaOriginal = await Factura.findById(id);
    if (!facturaOriginal) throw new Error(`Factura con ID ${id} no encontrada`);

    if (facturaOriginal.pedido.toString() !== body.pedido) {
        const facturaExistente = await Factura.findOne({ pedido: body.pedido });
        if (facturaExistente) {
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

// Listar facturas con populate + lean() para obtener objetos puros de JS
async function listarFacturas() {
    try {
      const facturas = await Factura.find()
        .populate('pedido', 'numPedido')
        .populate('cliente', 'nombreCliente')
        .populate({
          path: 'detallesFactura',
          populate: [
            { path: 'idProducto', select: 'estiloProducto disponibilidadProducto' },
            { path: 'idInventario', select: 'stock precioVenta precioCompra' }
          ]
        })
        .populate('metodoPago', 'nombreMetodoPago')
        .lean();
  
      // Imprime TODO el objeto con identación
      console.log('Facturas con detalles completos:\n', JSON.stringify(facturas, null, 2));
      return facturas;
    } catch (err) {
      console.error("Error al listar facturas:", err.message);
      throw new Error("Error al obtener facturas");
    }
  }
  

// Buscar factura por ID con populate profundo
async function buscarFacturaPorId(id) {
    try {
      const factura = await Factura.findById(id)
        .populate('pedido', 'numPedido')
        .populate('cliente', 'nombreCliente')
        .populate({
          path: 'detallesFactura',
          populate: [
            { path: 'idProducto', select: 'estiloProducto disponibilidadProducto' },
            { path: 'idInventario', select: 'stock precioVenta precioCompra' }
          ]
        })
        .populate('metodoPago', 'nombreMetodoPago')
        .lean();
  
      console.log('Factura completa:\n', JSON.stringify(factura, null, 2));
      return factura;
    } catch (err) {
      console.error(`Error al buscar la factura por ID: ${err.message}`);
      throw err;
    }
  }
  
// Eliminar factura
async function eliminarFactura(id) {
    try {
        const factura = await Factura.findByIdAndDelete(id);
        if (!factura) {
            throw new Error(`Factura con ID ${id} no encontrada`);
        }
        return factura;
    } catch (err) {
        console.error(`Error al eliminar la factura: ${err.message}`);
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
