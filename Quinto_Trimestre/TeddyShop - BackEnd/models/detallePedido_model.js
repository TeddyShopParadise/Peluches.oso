const mongoose = require('mongoose');

// Define el esquema para la colección Detalle_Pedido
const detallePedidoSchema = new mongoose.Schema({
  precioDetallePedido: {
    type: Number, // FLOAT o DECIMAL en SQL
    required: true
  },
  cantidadDetallePedido: {
    type: Number, // INTEGER en SQL
    required: true
  },
  idPedido: {
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

detallePedidoSchema.index({ idPedido: 1, idProducto: 1 });

// exportar el modelo
module.exports = mongoose.model('DetallePedido', detallePedidoSchema);
