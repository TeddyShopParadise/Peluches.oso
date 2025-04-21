 //Semillas del pedido

 const Pedido = require('../models/pedido_model'); 

const pedidoSeed = {
  nombreComprador: 'Juan Pérez', // Nombre del comprador
  numeroComprador: '3001234567', // Número de contacto del comprador
  nombreAgendador: 'Ana Gómez', // Nombre del agendador
  numeroAgendador: '3109876543', // Número de contacto del agendador
  localidad: 'Bogotá', // Localidad
  direccion: 'Calle 123 #45-67', // Dirección
  barrio: 'Chapinero', // Barrio
  cliente: '60d21b4667d0d8992e610c85', // ID del cliente (ajusta según tu base de datos)
  detallesPedido: [], // Aquí puedes agregar IDs de detalles de pedido si los tienes
  facturas: [], // Aquí puedes agregar IDs de facturas si los tienes

};

// Verificar si el pedido ya existe
Pedido.findOne({ nombreComprador: pedidoSeed.nombreComprador, numeroComprador: pedidoSeed.numeroComprador })
  .then(existingPedido => {
    if (existingPedido) {
      throw new Error(`El pedido de ${pedidoSeed.nombreComprador} ya existe.`);
    } else {
      return Pedido.create(pedidoSeed);
    }
  })
  .then(() => console.log('Pedido insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = pedidoSeed;
