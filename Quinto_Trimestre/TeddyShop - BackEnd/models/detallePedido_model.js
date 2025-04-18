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
    required: true
  },
  productoIdProducto: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a Producto por ObjectId
    ref: 'Producto',
    required: true
  }
}, {
  collection: 'Detalle_Pedido',
  timestamps: false
});

// Definir el índice único compuesto para numDetalle y productoIdProducto
detallePedidoSchema.index({ numDetalle: 1, productoIdProducto: 1 }, { unique: true });

// exportar el modelo
module.exports = mongoose.model('DetallePedido', detallePedidoSchema);
