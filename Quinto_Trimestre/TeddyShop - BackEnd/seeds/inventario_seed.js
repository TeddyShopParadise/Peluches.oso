//Semillas del inventario

const Inventario = require('../models/inventario_model'); 

const inventarioSeed = {
    stockMinimo: 10, 
    precioVenta: 29.99, 
    precioCompra: 19.99, 
    stock: 50, 
    stockMaximo: 10, 
    idDevolucion: null, 
    idProducto: null, 
    detalleFacturas: null, 
    movimientos: null
};

// Verificar si el inventario ya existe
Inventario.findOne({ idInventario: inventarioSeed.idInventario })
    .then(existingInventario => {
        if (existingInventario) {
            throw new Error(`El inventario con ID ${inventarioSeed.idInventario} ya existe.`);
        } else {
            return Inventario.create(inventarioSeed);
        }
    })
    .then(() => console.log('Inventario insertado correctamente'))
    .catch(err => console.error('Error:', err.message));

module.exports = inventarioSeed;
