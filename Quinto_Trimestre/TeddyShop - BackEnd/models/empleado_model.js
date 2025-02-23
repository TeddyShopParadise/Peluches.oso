const mongoose = require('mongoose');

// Define el esquema para la colección Empleado
const empleadoSchema = new mongoose.Schema({
  dniEmpleado: {
    type: Number,
    required: true,
    unique: true // Atributo único, no como clave primaria
  },
  telefonoEmpleado: {
    type: Number,
    required: true
  },
  nombreEmpleado: {
    type: String,
    required: true
  },
  compania: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Compañia', // Relación uno a muchos con Compañia
    required: true
  },
}, {
  collection: 'Empleado',
  timestamps: false
});

// exportar el modelo
module.exports = mongoose.model('Empleado', empleadoSchema);
