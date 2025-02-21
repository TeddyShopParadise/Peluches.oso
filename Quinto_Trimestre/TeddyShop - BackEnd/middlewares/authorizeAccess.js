const jwt = require('jsonwebtoken');

const authorizeAccess = (...allowedRoles) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userRoles = decoded.roles; 
      const hasAccess = userRoles.some(role => allowedRoles.includes(role));
      if (!hasAccess) {
        return res.status(403).json({ message: 'Acceso denegado. Permisos insuficientes.' });
      }
      req.user = decoded; // Agregar el usuario al objeto req para usos posteriores
      next();
    } catch (err) {
      res.status(403).json({ message: 'Token no válido.' });
    }
  };
};

module.exports = authorizeAccess;
