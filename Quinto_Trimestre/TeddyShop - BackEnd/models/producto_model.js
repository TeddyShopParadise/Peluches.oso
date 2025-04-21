const mongoose = require('mongoose');

// Define el esquema para la colección Producto
const productoSchema = new mongoose.Schema({
  estiloProducto: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  disponibilidadProducto: {
    type: Number, // ✅ Correcto
    required: true,
    min: 0 // Valida que no sea negativo
  },
  tamañoProducto: {
    type: String, // NVARCHAR en SQL
    required: false
  },
  imagen: {
    type: String, 
    required: false
  },
  historialPrecios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HistorialPrecio' // Referencia a la colección Historial_Precio
  }],
  catalogos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalogo' // Referencia a la colección Catalogo
  }],
  categorias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria' // Referencia a la colección Categoria
  }]
}, {
  collection: 'Producto',
  timestamps: false
});

// exportar el modelo
module.exports = mongoose.model('Producto', productoSchema);
