const mongoose = require('mongoose');

// Define el esquema para la colección Detalle_Factura
const detalleFacturaSchema = new mongoose.Schema({
  precioDetalleFactura: {
    type: Number, // FLOAT o DECIMAL en SQL
    required: true
  },
  cantidadDetalleFactura: {
    type: Number, // INTEGER en SQL
    required: true
  },
  idInventario: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a Inventario por ObjectId
    ref: 'Inventario',
  },
  idProducto: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a Producto por ObjectId
    ref: 'Producto',
    required: true
  },
  idFactura: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a Factura por ObjectId
    ref: 'Factura',
    required: false
  }
}, {
  collection: 'Detalle_Factura',
  timestamps: false
});
detalleFacturaSchema.index({ idProducto: 1, idFactura: 1 });



//exportar el modelo
module.exports = mongoose.model('DetalleFactura', detalleFacturaSchema);