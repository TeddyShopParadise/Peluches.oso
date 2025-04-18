const mongoose = require('mongoose');

// Define el esquema para la colección Metodo_Pago
const metodoPagoSchema = new mongoose.Schema({
  nombreMetodoPago: {
    type: String, // NVARCHAR en SQL se representa como String en Mongoose
    required: true
  }
}, {
  collection: 'Metodo_Pago',
  timestamps: false
});

//exportar el modelo
module.exports = mongoose.model('MetodoPago', metodoPagoSchema);
