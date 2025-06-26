const mongoose = require('mongoose');

const historialPrecioSchema = new mongoose.Schema({
  precio: {
    type: Number, 
    required: true,
  
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
  estadoPrecio: {
    type: Boolean, // Usamos Boolean para representar valores BIT en SQL Server
    required: true
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto', // Relación muchos a uno con Producto
    required: false
  }
}, {
  collection: 'Historial_Precio',
  timestamps: false,
  toJSON: { getters: true }, 
  toObject: { getters: true } 
});


module.exports = mongoose.model('HistorialPrecio', historialPrecioSchema);
