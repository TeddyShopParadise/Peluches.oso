//Semillas del metodo pago

const MetodoPago = require('../models/metodoPago_model'); 

const metodoPagoSeed = {
  nombreMetodoPago: 'Tarjeta de Crédito'
};

// Verificar si el método de pago ya existe
MetodoPago.findOne({ nombreMetodoPago: metodoPagoSeed.nombreMetodoPago, factura: metodoPagoSeed.factura })
  .then(existingMetodoPago => {
    if (existingMetodoPago) {
      throw new Error(`El método de pago "${metodoPagoSeed.nombreMetodoPago}" ya existe para la factura con ID ${metodoPagoSeed.factura}.`);
    } else {
      return MetodoPago.create(metodoPagoSeed);
    }
  })
  .then(() => console.log('Método de pago insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = metodoPagoSeed;
