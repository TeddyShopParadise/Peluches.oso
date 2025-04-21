const mongoose = require('mongoose');

// Define el esquema para la colección Cliente
const clienteSchema = new mongoose.Schema({
  nombreCliente: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  telefonoCliente: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  pedidos: [{
    type: mongoose.Schema.Types.ObjectId, // Referencia a Pedido por ObjectId
    ref: 'Pedido' // Relación uno a muchos con Pedido
  }],
  facturas: [{
    type: mongoose.Schema.Types.ObjectId, // Referencia a Factura por ObjectId
    ref: 'Factura' // Relación uno a muchos con Factura
  }]
}, {
  collection: 'Cliente',
  timestamps: false
});

//exportar el modelo
module.exports = mongoose.model('Cliente', clienteSchema);
