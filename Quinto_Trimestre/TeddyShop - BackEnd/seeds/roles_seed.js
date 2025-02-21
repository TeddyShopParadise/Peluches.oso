const mongoose = require('mongoose');
const Roles = require('../models/roles_model'); 

const rolesSeed = [
  {
    _id: new mongoose.Types.ObjectId('64df1a8f1c2b4e1d9a2b3c4f'), 
    estado: true,
    nombre: 'Administrador',
    usuarios: []
  },
  {
    _id: new mongoose.Types.ObjectId('64df1a9e1b7d4a5e8c6d9e2b'), 
    estado: true,
    nombre: 'Empleado',
    usuarios: []
  }
];

// Función para insertar roles si no existen
const insertRoles = async () => {
  try {
    for (const role of rolesSeed) {
      const existingRole = await Roles.findOne({ nombre: role.nombre });
      if (existingRole) {
        console.log(`El rol "${role.nombre}" ya existe.`);
      } else {
        await Roles.create(role);
        console.log(`Rol "${role.nombre}" insertado correctamente.`);
      }
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
};

insertRoles();

module.exports = rolesSeed;
