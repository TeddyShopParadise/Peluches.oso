const mongoose = require('mongoose');

// Define el esquema para la colección Pedido
const pedidoSchema = new mongoose.Schema({
  nombreComprador: {
    type: String, // NVARCHAR en SQL
    required: false
  },
  numeroComprador: {
    type: String, // NVARCHAR en SQL
    required: false
  },
  nombreAgendador: {
    type: String, // NVARCHAR en SQL
    required: false
  },
  numeroAgendador: {
    type: String, // NVARCHAR en SQL
    required: false
  },
  localidad: {
    type: String, // NVARCHAR en SQL
    required: false
  },
  direccion: {
    type: String, // NVARCHAR en SQL
    required: false
  },
  barrio: {
    type: String, // NVARCHAR en SQL
    required: false
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente', // Referencia a la colección Cliente
  },
 
  detallesPedido: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DetallePedido' // Referencia a la colección DetallePedido
  }],
  facturas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Factura' // Referencia a la colección Factura
  }],

  estado: {
    type: String,
    enum: ['pendiente', 'en_proceso', 'realizado'],
    default: 'en_proceso'
  },
  
}, {
  collection: 'Pedido',
  timestamps: false
});



//exportar el modelo
module.exports = mongoose.model('Pedido', pedidoSchema);
