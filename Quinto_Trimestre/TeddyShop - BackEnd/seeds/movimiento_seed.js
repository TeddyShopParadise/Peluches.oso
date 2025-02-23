//Semillas del movimiento

const Movimiento = require('../models/movimiento_model'); 

const movimientoSeed = {
  fecha: new Date(), // Fecha actual
  cantidadIngreso: 100, // Cantidad ingresada al inventario
  cantidadVendida: 50, // Cantidad vendida
  inventario: '60d21b4667d0d8992e610c85' 
};

// Verificar si el movimiento ya existe
Movimiento.findOne({ fecha: movimientoSeed.fecha, inventario: movimientoSeed.inventario })
  .then(existingMovimiento => {
    if (existingMovimiento) {
      throw new Error(`El movimiento ya existe para la fecha ${movimientoSeed.fecha} en el inventario.`);
    } else {
      return Movimiento.create(movimientoSeed);
    }
  })
  .then(() => console.log('Movimiento insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = movimientoSeed;
