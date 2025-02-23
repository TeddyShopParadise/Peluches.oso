//Semillas del factura

const Factura = require('../models/factura_model'); 

const facturaSeed = {
  fechaCreacionFactura: new Date(),
  horaCreacionFactura: new Date().toLocaleTimeString(), 
  pedido: ['67180ae2e3ebf5bd0a1e3302'], 
  cliente: ['6718250470b162afd002a79a'], 
  detallesFactura: ['671824ea70b162afd002a797'], 
  metodoPago: ['67182287e2f1094696653eb8'] 
};

// Verificar si la factura ya existe en la base de datos
Factura.findOne({
  pedido: facturaSeed.pedido,
  cliente: facturaSeed.cliente
})
.then(existingFactura => {
  if (existingFactura) {
    throw new Error(`La factura para el pedido ${facturaSeed.pedido} y cliente ${facturaSeed.cliente} ya existe en la base de datos.`);
  } else {
    return Factura.create(facturaSeed);
  }
})
.then(() => console.log('Factura insertada correctamente'))
.catch(err => console.error('Error:', err.message));

module.exports = facturaSeed;
