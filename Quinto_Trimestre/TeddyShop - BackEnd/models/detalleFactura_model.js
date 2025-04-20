const mongoose = require('mongoose');

// Define el esquema para la colección Detalle_Factura
const detalleFacturaSchema = new mongoose.Schema({
  numDetalle: {
    type: Number, // INTEGER en SQL
  },
  precioDetalleFactura: {
    type: Number, // FLOAT o DECIMAL en SQL
    required: true
  },
  cantidadDetalleFactura: {
    type: Number, // INTEGER en SQL
    required: true
  },
  inventarioIdInventario: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a Inventario por ObjectId
    ref: 'Inventario',
  },
  idProducto: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a Producto por ObjectId
    ref: 'Producto',
    required: true
  },
  facturaIdFactura: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a Factura por ObjectId
    ref: 'Factura',
    required: true
  }
}, {
  collection: 'Detalle_Factura',
  timestamps: false
});


//exportar el modelo
module.exports = mongoose.model('DetalleFactura', detalleFacturaSchema);