const mongoose = require('mongoose');

// Define el esquema para la colección Detalle_Pedido
const detallePedidoSchema = new mongoose.Schema({
  precioDetallePedido: {
    type: Number, 
    required: true
  },
  cantidadDetallePedido: {
    type: Number, 
    required: true
  },
  idPedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido',
    required: false
  },
  idProducto: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Producto',
    required: false
  },
    idInventario: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventario', required: false }  

}, {
  collection: 'Detalle_Pedido',
  timestamps: false
});

detallePedidoSchema.index({ idPedido: 1, idProducto: 1 });

// exportar el modelo
module.exports = mongoose.model('DetallePedido', detallePedidoSchema);
