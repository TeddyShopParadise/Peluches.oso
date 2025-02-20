const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario_model'); 

const usuarioSeed = [
  {
    _id: new mongoose.Types.ObjectId('64df1ac42b3d1e5f8c9a4b2f'),
    email: 'Administrador@example.com', // Reemplaza con un email único
    telefono: '3101234567', // Número de teléfono
    contraseña: 'contraseñaSegura123', // Contraseña (asegúrate de encriptarla en un entorno real)
    username: 'Administrador', // Nombre de usuario
    estado: true, // Estado del usuario
    roles: '64df1a8f1c2b4e1d9a2b3c4f' // ID del rol
  },
  {
    _id: new mongoose.Types.ObjectId('64df1b194d3e2c5a7f1b9a8e'),
    email: 'Empleado@example.com', // Reemplaza con un email único
    telefono: '3204875521', // Número de teléfono
    contraseña: 'contraseñaSegura123',
    username: 'Empleado', // Contraseña (asegúrate de encriptarla en un entorno real)
    estado: true, // Estado del usuario
    roles: '64df1a9e1b7d4a5e8c6d9e2b' // ID del rol
  }
];

// Función para insertar usuarios si no existen
const insertUsuarios = async () => {
  try {
    for (const usuario of usuarioSeed) {
      // Verifica si el usuario ya existe
      const existingUsuario = await Usuario.findOne({ email: usuario.email });
      if (existingUsuario) {
        console.log(`El usuario con email "${usuario.email}" ya existe.`);
      } else {
        // Cifra la contraseña antes de crear el usuario
        const salt = await bcrypt.genSalt(10);
        usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);
        
        // Crea el usuario con la contraseña cifrada
        await Usuario.create(usuario);
        console.log(`Usuario "${usuario.username}" insertado correctamente.`);
      }
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
};

insertUsuarios();

module.exports = usuarioSeed;