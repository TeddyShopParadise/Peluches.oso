//Controlador para Factura
const logic = require('../Logic/factura_logic'); 
const { facturaSchemaValidation } = require('../Validations/factura_validation'); 
const Pedido = require('../models/pedido_model'); 
const Factura = require('../models/factura_model');
const DetalleFactura = require('../models/detalleFactura_model');

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
        console.error("Error al crear factura:", err); // <--- Agregado
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
  
      // 1. Obtener pedido con detalles
      const pedido = await Pedido.findById(pedidoId)
        .populate({
          path: "detallesPedido",
          populate: { path: "idProducto" }
        });
  
      if (!pedido.detallesPedido?.length) {
        throw new Error("El pedido no tiene productos asociados");
      }
  
      // 2. Crear la factura
      const factura = new Factura({
        pedido: pedidoId,
        metodoPago: pedido.metodoPago,
      });
      await factura.save();
  
      // 3. Crear detalles de factura vinculados
      const detallesFactura = await Promise.all(
        pedido.detallesPedido.map(async (detallePedido) => {
          const detalle = new DetalleFactura({
            precioDetalleFactura: detallePedido.precioDetallePedido,
            cantidadDetalleFactura: detallePedido.cantidadDetallePedido,
            idProducto: detallePedido.idProducto._id,
            idFactura: factura._id, // 👈 Asignar el ID de la factura
          });
          await detalle.save();
          return detalle._id;
        })
      );
  
      // 4. Actualizar la factura con los detalles
      factura.detallesFactura = detallesFactura;
      await factura.save();
  
      res.json(factura);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



// Exportar los controladores
module.exports = {
    listarFacturas,
    crearFactura,
    actualizarFactura,
    obtenerFacturaPorId,
    eliminarFactura,
    generarFacturaDesdePedido 
};