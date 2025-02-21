const mongoose = require('mongoose');

// Define el esquema para la colección Roles
const rolesSchema = new mongoose.Schema({
  estado: {
    type: Boolean, // BIT en SQL
    required: true
  },
  nombre: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  usuarios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',// Referencia a la colección Usuario
    required: false
  }]
}, {
  collection: 'Roles',
  timestamps: false
});

// exportar el modelo
module.exports = mongoose.model('Roles', rolesSchema);
