const mongoose = require('mongoose');

// Define el esquema para la colección Detalle_Pedido
const detallePedidoSchema = new mongoose.Schema({
  numDetalle: {
    type: Number, // INTEGER en SQL
    required: true
  },
  precioDetallePedido: {
    type: String, // FLOAT o DECIMAL en SQL
    required: true
  },
  cantidadDetallePedido: {
    type: Number, // INTEGER en SQL
    required: true
  },
  pedidoNumPedido: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a Pedido por ObjectId
    ref: 'Pedido',
    required: false
  },
  idProducto: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a Producto por ObjectId
    ref: 'Producto',
    required: false
  }
}, {
  collection: 'Detalle_Pedido',
  timestamps: false
});

// Definir el índice único compuesto para numDetalle y idProducto
detallePedidoSchema.index({ numDetalle: 1, idProducto: 1 }, { unique: true });

// exportar el modelo
module.exports = mongoose.model('DetallePedido', detallePedidoSchema);
