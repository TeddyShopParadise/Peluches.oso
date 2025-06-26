// models/devoluciones_model.js
const mongoose = require('mongoose');

const devolucionesSchema = new mongoose.Schema({
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido',
    required: true
  },
  
  fecha: {
    type: Date,
    default: Date.now
  },
  
  motivo: {
    type: String,
    required: true
  },
  
  items: [{
    inventario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventario',
      required: false
    },
    cantidad: {
      type: Number,
      required: true,
      min: [1, 'La cantidad mínima es 1']
    }
  }]
}, {
  collection: 'Devoluciones',
  timestamps: false
});

module.exports = mongoose.model('Devoluciones', devolucionesSchema);
