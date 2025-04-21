const Cliente = require('../models/cliente_model'); 

const clienteSeed = {
  nombreCliente: 'Ana Gómez',
  telefonoCliente: '3145678901',
  pedidos: [], // Si tienes IDs de Pedido, agréguelos aquí
  facturas: [] // Si tienes IDs de Factura, agréguelos aquí
};

// Verificar si el DNI ya existe en la base de datos
Cliente.findOne({ telefonoCliente:clienteSeed.telefonoCliente })
  .then(existingCliente => {
    if (existingCliente) {
      throw new Error(`El cliente con DNI ${clienteSeed.telefonoCliente} ya existe en la base de datos.`);
    } else {
      return Cliente.create(clienteSeed);
    }
  })
  .then(() => console.log('Cliente insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = clienteSeed;
