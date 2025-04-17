//Semillas del detallePedido

const DetallePedido = require('../models/detallePedido_model'); 

const detallePedidoSeed = {
  numDetalle: 1, // Número del detalle
  precioDetallePedido: 25000.00, // Precio del detalle
  cantidadDetallePedido: 3, // Cantidad del producto
  pedidoNumPedido: '60d21b4667d0d8992e610c85', // ID del pedido (ajusta según tu base de datos)
  idProducto: '60d21b4667d0d8992e610c86' // ID del producto (ajusta según tu base de datos)
};

// Verificar si el detalle del pedido ya existe
DetallePedido.findOne({ numDetalle: detallePedidoSeed.numDetalle, idProducto: detallePedidoSeed.idProducto })
  .then(existingDetalle => {
    if (existingDetalle) {
      throw new Error(`El detalle del pedido con número ${detallePedidoSeed.numDetalle} y producto ya existe.`);
    } else {
      return DetallePedido.create(detallePedidoSeed);
    }
  })
  .then(() => console.log('Detalle de pedido insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = detallePedidoSeed;
