const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario_model'); 

const login = async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email }).populate('roles');
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Crear el payload del JWT
    const payload = {
      userId: usuario._id,
      username: usuario.username,
      roles: usuario.roles.map(role => role.nombre), 
    };

    // Generar el token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Responder con el token
    res.json({ token });

  } catch (err) {
    console.error('Error en el login:', err);
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
};

module.exports = { login };
