const Factura = require('../models/factura_model');
const DetalleFactura = require('../models/detalleFactura_model'); 
const Cliente = require('../models/cliente_model'); 
const Pedido = require('../models/pedido_model'); 
const MetodoPago = require('../models/metodoPago_model'); 

// Función asíncrona para crear una nueva factura
async function crearFactura(body) {
    const factura = new Factura({
        fechaCreacionFactura: body.fechaCreacionFactura,
        horaCreacionFactura: body.horaCreacionFactura,
        pedido: body.pedido, // Asegúrate de que sea un ObjectId válido
        cliente: body.cliente, // Asegúrate de que sea un ObjectId válido
        detallesFactura: body.detallesFactura || [], // Inicializa como array vacío si no hay detalles
        metodoPago: body.metodoPago // Puede ser null si no hay método de pago
    });

    return await factura.save();
}

// Función asíncrona para actualizar una factura
async function actualizarFactura(id, body) {
    const factura = await Factura.findByIdAndUpdate(id, {
        $set: {
            fechaCreacionFactura: body.fechaCreacionFactura,
            horaCreacionFactura: body.horaCreacionFactura,
            pedido: body.pedido,
            cliente: body.cliente,
            detallesFactura: body.detallesFactura,
            metodoPago: body.metodoPago
        }
    }, { new: true });

    return factura;
}

// Función asíncrona para listar todas las facturas
async function listarFacturas() {
    try {
        const facturas = await Factura.find()
            .populate('pedido', 'numPedido')
            .populate('cliente', 'nombreCliente')
            .populate('detallesFactura')
            .populate('metodoPago', 'nombreMetodoPago');
        return facturas;
    } catch (err) {
        console.error("Error al listar facturas:", err.message);
        throw new Error("Error al obtener facturas");  
    }
}


// Función asíncrona para buscar una factura por su ID
async function buscarFacturaPorId(id) {
    try {
        const factura = await Factura.findById(id)
            .populate('pedido', 'numPedido')
            .populate('cliente', 'nombreCliente')
            .populate('detallesFactura')
            .populate('metodoPago', 'nombreMetodoPago');
        
        if (!factura) {
            throw new Error(`Factura con ID ${id} no encontrada`);
        }
        return factura;
    } catch (err) {
        console.error(`Error al buscar la factura por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar una factura por su ID
async function eliminarFactura(id) {
    try {
        const factura = await Factura.findByIdAndDelete(id);
        if (!factura) {
            throw new Error(`Factura con ID ${id} no encontrada`);
        }
        return factura;
    } catch (err) {
        console.error(`Error al eliminar la factura: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearFactura,
    actualizarFactura,
    listarFacturas,
    buscarFacturaPorId,
    eliminarFactura
};
