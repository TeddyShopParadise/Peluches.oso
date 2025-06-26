const mongoose = require('mongoose');

// Define el esquema para la colección Movimiento
const movimientoSchema = new mongoose.Schema({
  fecha: {
    type: Date, // DATETIME en SQL
    required: true
  },
  cantidadIngreso: {
    type: Number, // INTEGER en SQL
    required: true
  },
  cantidadVendida: {
    type: Number, // INTEGER en SQL
    required: true
  },
  inventario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventario', // Referencia a la colección Inventario
    required: true
  }
}, {
  collection: 'Movimiento',
  timestamps: false
});

// exportar el modelo
module.exports = mongoose.model('Movimiento', movimientoSchema);
