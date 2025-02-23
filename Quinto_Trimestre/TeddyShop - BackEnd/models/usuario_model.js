const mongoose = require('mongoose');

// Define el esquema para la colección Usuario
const usuarioSchema = new mongoose.Schema({
  email: {
    type: String, // NVARCHAR en SQL
    required: true,
    unique: true 
  },
  contraseña: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  username: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  estado: {
    type: Boolean, // BIT en SQL
    required: false
  },
  empleados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: true
  }],
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roles',
    required: true
  }]
},
 {
  collection: 'Usuario',
  timestamps: false
});

//exportar el modelo
module.exports = mongoose.model('Usuario', usuarioSchema);
