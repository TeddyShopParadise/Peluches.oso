//Semillas del detalle factura

const DetalleFactura = require('../models/detalleFactura_model'); 

const detalleFacturaSeed = {
  precioDetalleFactura: 29.999,
  cantidadDetalleFactura: 3,
  idInventario: '60d5f4847c31a91b8c8b4569', // Reemplaza con un ID válido de Inventario
  idProducto: '60d5f4847c31a91b8c8b4568', // Reemplaza con un ID válido de Producto
  idFactura: '60d5f4847c31a91b8c8b4578' // Reemplaza con un ID válido de Factura
};

// Verificar si el detalle ya existe en la base de datos
DetalleFactura.findOne({
  idProducto: detalleFacturaSeed.idProducto
})
.then(existingDetalle => {
  if (existingDetalle) {
    throw new Error(`El detalle de factura con id ${detalleFacturaSeed._id} y producto ${detalleFacturaSeed.idProducto} ya existe en la base de datos.`);
  } else {
    return DetalleFactura.create(detalleFacturaSeed);
  }
})
.then(() => console.log('Detalle de factura insertado correctamente'))
.catch(err => console.error('Error:', err.message));

module.exports = detalleFacturaSeed;
