const mongoose = require('mongoose');

// Define el esquema para la colección Pedido
const pedidoSchema = new mongoose.Schema({
  nombreComprador: {
    type: String, 
    required: false
  },
  numeroComprador: {
    type: String, 
    required: false
  },
  nombreAgendador: {
    type: String, 
    required: false
  },
  numeroAgendador: {
    type: String, 
    required: false
  },
  localidad: {
    type: String, 
    required: false
  },
  direccion: {
    type: String, 
    required: false
  },
  barrio: {
    type: String, 
    required: false
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente', 
  },
 
  detallesPedido: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DetallePedido' 
  }],
  facturas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Factura' 
  }],

  estado: {
    type: String,
    enum: ['cancelado', 'en_proceso', 'realizado'],
    default: 'en_proceso'
  },
  
}, {
  collection: 'Pedido',
  timestamps: false
});

//exportar el modelo
module.exports = mongoose.model('Pedido', pedidoSchema);
