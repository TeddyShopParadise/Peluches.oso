const mongoose = require('mongoose');

// Define el esquema para la colección Factura
const facturaSchema = new mongoose.Schema({
  fechaCreacionFactura: {
    type: String,
    default: () => new Date().toISOString().split('T')[0] // Fecha actual por defecto
  },
  horaCreacionFactura: {
    type: String,
    default: () => new Date().toLocaleTimeString('ES-es') // Hora actual por defecto
  },
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido', // Relación muchos a uno con Pedido
    required: false
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente', // Relación muchos a uno con Cliente
  },
  detallesFactura: [{
    type: mongoose.Schema.Types.ObjectId, // Relación uno a muchos con DetalleFactura
    ref: 'DetalleFactura'
  }],
  metodoPago: {
    type: mongoose.Schema.Types.ObjectId, // Relación uno a uno con Metodo_Pago
    ref: 'MetodoPago'
  },
}, {
  collection: 'Factura',
  timestamps: false
});

//exportar el modelo
module.exports = mongoose.model('Factura', facturaSchema);