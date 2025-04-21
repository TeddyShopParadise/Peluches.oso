//Semillas del detallePedido

const DetallePedido = require('../models/detallePedido_model'); 

const detallePedidoSeed = {
  precioDetallePedido: 25000.00, // Precio del detalle
  cantidadDetallePedido: 3, // Cantidad del producto
  idPedido: '60d21b4667d0d8992e610c85', // ID del pedido (ajusta según tu base de datos)
  idProducto: '60d21b4667d0d8992e610c86' // ID del producto (ajusta según tu base de datos)
};

// Verificar si el detalle del pedido ya existe
DetallePedido.findOne({ idDetallePedido: detallePedidoSeed.idDetallePedido, idProducto: detallePedidoSeed.idProducto })
  .then(existingDetalle => {
    if (existingDetalle) {
      throw new Error(`El detalle del pedido con número ${detallePedidoSeed.idDetallePedido} y producto ya existe.`);
    } else {
      return DetallePedido.create(detallePedidoSeed);
    }
  })
  .then(() => console.log('Detalle de pedido insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = detallePedidoSeed;
