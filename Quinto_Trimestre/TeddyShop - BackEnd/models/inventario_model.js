const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventarioSchema = new Schema({
    stockMinimo: {
        type: Number,
        required: true
    },
    precioVenta: {
        type: Number, 
        required: true,
    },
    precioCompra: {
        type: Number, 
    required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    stockMaximo: {
        type: Number,
        required: true
    },  
    idDevolucion: {
        type: Schema.Types.ObjectId,
        ref: 'Devoluciones', 
        required: false
    },
    idProducto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto', 
        required: false
    },
    detalleFacturas: [{
        type: Schema.Types.ObjectId,
        ref: 'DetalleFactura' 
    }],
    movimientos: [{
        type: Schema.Types.ObjectId,
        ref: 'Movimiento' 
    }]
}, { 
    collection: 'Inventario' 
});

module.exports = mongoose.model('Inventario', inventarioSchema);
