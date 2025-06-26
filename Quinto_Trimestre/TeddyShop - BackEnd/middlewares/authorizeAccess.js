// middleware/auth.js (Backend)
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario_model'); 

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acceso requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Obtener información completa del usuario con empleados y roles
    const usuario = await Usuario.findById(decoded.userId || decoded.id)
      .populate('empleados')
      .populate('roles')
      .select('-contraseña');

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

module.exports = { authenticateToken };