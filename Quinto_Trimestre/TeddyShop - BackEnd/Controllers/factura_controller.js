//Controlador para Factura
const logic = require('../Logic/factura_logic'); 
const { facturaSchemaValidation } = require('../Validations/factura_validation'); 
const Pedido = require('../models/pedido_model'); 
const Factura = require('../models/factura_model');
const DetalleFactura = require('../models/detalleFactura_model');


const crearPedidoConFacturaCompleta = async (req, res) => {
  try {
    const { 
      pedidoData, 
      detallesPedido, 
      metodoPago 
    } = req.body;


    // 1. Crear pedido
    const pedidoCreado = await require('../Logic/pedido_logic').crearPedido(pedidoData);

    // 2. Crear detalles de pedido y factura
    const detallesFacturaIds = [];
    const detallesPedidoIds = [];

    for (const detalle of detallesPedido) {
      // Crear detalle de pedido
      const detallePedido = await require('../Logic/detallePedido_logic').crearDetallePedido({
        precioDetallePedido: detalle.precio,
        cantidadDetallePedido: detalle.cantidad,
        idPedido: pedidoCreado._id,
        idProducto: detalle.idProducto
      });
      detallesPedidoIds.push(detallePedido._id);

      // Crear detalle de factura
      const detalleFactura = await require('../Logic/detalleFactura_logic').crearDetalleFactura({
        precioDetalleFactura: detalle.precio,
        cantidadDetalleFactura: detalle.cantidad,
        idProducto: detalle.idProducto,
        idInventario: detalle.idInventario
      });
      detallesFacturaIds.push(detalleFactura._id);
    }

    // 3. Crear factura con todos los detalles
    const factura = await require('../Logic/factura_logic').crearFactura({
      fechaCreacionFactura: new Date().toISOString().split('T')[0],
      horaCreacionFactura: new Date().toLocaleTimeString('es-MX'),
      pedido: pedidoCreado._id,
      detallesFactura: detallesFacturaIds,
      metodoPago: metodoPago
    });

    // 4. Actualizar pedido con detalles y factura
    const pedidoFinal = await Pedido.findByIdAndUpdate(
      pedidoCreado._id,
      {
        $set: {
          detallesPedido: detallesPedidoIds,
          facturas: [factura._id]
        }
      },
      { new: true }
    ).populate('cliente')
     .populate('detallesPedido')
     .populate('facturas');


    res.status(201).json({
      pedido: pedidoFinal,
      factura: factura,
      mensaje: "Pedido y factura creados exitosamente"
    });

  } catch (error) {
    console.error("❌ ERROR EN CREACIÓN COMPLETA:", error);
    res.status(500).json({ 
      error: "Error al crear pedido completo",
      detalle: error.message 
    });
  }
};

// Controlador para listar todas las facturas
const listarFacturas = async (req, res) => {
    try {
        const facturas = await logic.listarFacturas();
        res.json(facturas);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear una nueva factura
const crearFactura = async (req, res) => {
    const body = req.body;

    const { error, value } = facturaSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevaFactura = await logic.crearFactura(value);
        res.status(201).json(nuevaFactura);
    } catch (err) {
        console.error("Error al crear factura:", err); 
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


// Controlador para actualizar una factura
const actualizarFactura = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = facturaSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const facturaActualizada = await logic.actualizarFactura(id, value);
        if (!facturaActualizada) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.json(facturaActualizada);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener una factura por su ID
const obtenerFacturaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const factura = await logic.buscarFacturaPorId(id);
        res.json(factura);
    } catch (err) {
        if (err.message.includes('no encontrada')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar una factura por su ID
const eliminarFactura = async (req, res) => {
    const { id } = req.params;
    try {
        const facturaEliminada = await logic.eliminarFactura(id);
        res.json(facturaEliminada);
    } catch (err) {
        if (err.message.includes('no encontrada')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
const generarFacturaDesdePedido = async (req, res) => {
  try {
    const { pedidoId } = req.params;

    const pedido = await Pedido.findById(pedidoId)
      .populate({
        path: 'detallesPedido',
        populate: {
          path: 'idProducto'
        }
      })
      .populate('facturas')
      .populate('cliente');

    if (!pedido) {
      console.warn('⚠️ Pedido no encontrado');
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }


    if (pedido.facturas && pedido.facturas.length > 0) {
      const facturaId = pedido.facturas[0];
      
      const facturaExistente = await Factura.findById(facturaId)
        .populate('pedido')
        .populate('cliente')
        .populate({
          path: 'detallesFactura',
          populate: {
            path: 'idProducto',
            select: 'estiloProducto tamañoProducto disponibilidadProducto'
          }
        })
        .populate('metodoPago');
        
      return res.status(200).json(facturaExistente);
    }
  
      const detallesFacturaIds = [];
      for (const detalle of pedido.detallesPedido) {
  
        const nuevoDetalle = new DetalleFactura({
          idProducto: detalle.idProducto._id,
          idInventario: detalle.idInventario?._id,
          cantidadDetalleFactura: detalle.cantidad || 1,
          precioDetalleFactura: detalle.idInventario?.precioVenta || detalle.precio
        });
  
        const detalleGuardado = await nuevoDetalle.save();
        detallesFacturaIds.push(detalleGuardado._id);
      }
  
      const nuevaFactura = new Factura({
        fechaCreacionFactura: new Date().toISOString().split('T')[0],
        horaCreacionFactura: new Date().toLocaleTimeString('es-MX', { hour12: false }),
        pedido: pedido._id,
        cliente: pedido.cliente,
        detallesFactura: detallesFacturaIds,
        metodoPago: pedido.metodoPago || null
      });
  
      const facturaGuardada = await nuevaFactura.save();
  
      pedido.factura = facturaGuardada._id;
      await pedido.save();
  
      const facturaCompletaPopulada = await Factura.findById(facturaGuardada._id)
        .populate('pedido')
        .populate('cliente')
        .populate({
          path: 'detallesFactura',
          populate: {
            path: 'idProducto',
            select: 'estiloProducto tamañoProducto disponibilidadProducto'
          }
        })
        .populate('metodoPago');
        
      res.status(201).json(facturaCompletaPopulada);
    } catch (err) {
      console.error('💥 Error al generar factura desde pedido:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const buscarFacturaPorPedido = async (req, res) => {
  try {
    const { pedidoId } = req.params;
    const factura = await Factura.findOne({ pedido: pedidoId })
      .populate('pedido')
      .populate('cliente')
      .populate({
        path: 'detallesFactura',
        populate: {
          path: 'idProducto',
          select: 'estiloProducto tamañoProducto disponibilidadProducto'
        }
      })
      .populate('metodoPago');
    
    if (!factura) {
      return res.status(404).json({ error: 'No se encontró factura para este pedido' });
    }
    
    res.json(factura);
  } catch (err) {
    console.error('Error al buscar factura por pedido:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar los controladores
module.exports = {
    listarFacturas,
    crearFactura,
    actualizarFactura,
    obtenerFacturaPorId,
    eliminarFactura,
    generarFacturaDesdePedido,
    buscarFacturaPorPedido,
    crearPedidoConFacturaCompleta
};