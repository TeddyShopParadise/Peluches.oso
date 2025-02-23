//Semillas del historial precio

const HistorialPrecio = require('../models/historialPrecio_model'); 

const historialPrecioSeed = {
  precio: 19.99, 
  fechaInicio: new Date('2024-01-01'), 
  fechaFin: new Date('2024-12-31'),
  estadoPrecio: true 
};


// Verificar si el registro ya existe
HistorialPrecio.findOne({ producto: historialPrecioSeed.producto, fechaInicio: historialPrecioSeed.fechaInicio })
  .then(existingHistorial => {
    if (existingHistorial) {
      throw new Error(`El historial de precio para el producto con ID ${historialPrecioSeed.producto} ya existe.`);
    } else {
      return HistorialPrecio.create(historialPrecioSeed);
    }
  })
  .then(() => console.log('Historial de precio insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = historialPrecioSeed;
