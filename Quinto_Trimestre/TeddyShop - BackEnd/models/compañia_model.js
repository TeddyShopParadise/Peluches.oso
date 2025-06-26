const mongoose = require('mongoose');

// Define el esquema para la colección Compañia
const compañiaSchema = new mongoose.Schema({
  NIT: {
    type: Number, // INTEGER en SQL
    required: true
  },
  telefonoEmpresa: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  nombreEmpresa: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  direccionEmpresa: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  catalogos: [{
    type: mongoose.Schema.Types.ObjectId, // Relación uno a muchos con Catalogo
    ref: 'Catalogo',
    required: false
  }],
  empleados: [{
    type: mongoose.Schema.Types.ObjectId, // Relación uno a muchos con Empleado
    ref: 'Empleado',
    required: false
  }]
}, {
  collection: 'Compañia',
  timestamps: false
});

//exportar el modelo
module.exports = mongoose.model('Compañia', compañiaSchema);
