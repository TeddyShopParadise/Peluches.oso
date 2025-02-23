//Semillas del inventario

const Inventario = require('../models/inventario_model'); 

const inventarioSeed = {
    idInventario: 1, 
    stockMinimo: '10', 
    precioVenta: 29.99, 
    precioCompra: 19.99, 
    stock: '50', 
    stockMaximo: '100', 
    idDevolucion: null, 
    productoIdProducto: '60d21b4667d0d8992e610c85', 
    detalleFacturas: [], 
    movimientos: [] 
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
