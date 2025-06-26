const mongoose = require('mongoose');

// Define el esquema para la colección Catalogo
const catalogoSchema = new mongoose.Schema({
  nombreCatalogo: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  descripcionCatalogo: {
    type: String, // NVARCHAR en SQL
    required: false
  },
  disponibilidadCatalogo: {
    type: Boolean, // Atributo "DisponibilidadCatalogo"
    required: true,
    default: true
  },
  imagen: {
    type: String, 
    required: false
  },
  compania: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Compañia', // Relación uno a uno con Compañia
    required: false
  },
  productos: [{
    type: mongoose.Schema.Types.ObjectId, // Relación muchos a muchos con Producto
    ref: 'Producto',
    required: false
  }],
}, {
  collection: 'Catalogo',
  timestamps: false
});

// exportar el modelo
module.exports = mongoose.model('Catalogo', catalogoSchema);
