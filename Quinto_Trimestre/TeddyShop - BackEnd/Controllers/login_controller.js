const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario_model'); 

const login = async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    // Buscar usuario por email con empleados y roles poblados
    const usuario = await Usuario.findOne({ email })
      .populate('roles')
      .populate('empleados');
      
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // VERIFICAR que el usuario tenga roles
    if (!usuario.roles || usuario.roles.length === 0) {
      console.error('❌ Usuario sin roles asignados:', usuario.email);
      return res.status(400).json({ 
        message: 'Usuario sin roles asignados. Contacte al administrador.' 
      });
    }

    // Crear el payload del JWT con TODA la información necesaria
    const payload = {
      userId: usuario._id,
      username: usuario.username,
      roles: usuario.roles.map(rol => rol.nombre),
      usuario: {
        _id: usuario._id,
        username: usuario.username,
        email: usuario.email,
        roles: usuario.roles,
        empleados: usuario.empleados
      }
    };

    // Generar el token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    // Responder con el token y la información del usuario
    res.json({ 
      token,
      usuario: {
        _id: usuario._id,
        username: usuario.username,
        email: usuario.email,
        roles: usuario.roles,
        empleados: usuario.empleados
      }
    });

  } catch (err) {
    console.error('Error en el login:', err);
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
};


module.exports = { login };