const Cliente = require('../models/cliente_model');
const Pedido = require('../models/pedido_model');
const Factura = require('../models/factura_model');

function separarNombreYApellido(nombreCompleto) {
    const [nombre, ...resto] = nombreCompleto.trim().split(' ');
    const apellido = resto.join(' ') || '';
    return { nombre, apellido };
}

// Crear cliente
async function crearCliente(body) {
    const clienteExistente = await Cliente.findOne({ telefonoCliente: body.telefonoCliente });
    if (clienteExistente) {
        throw new Error('Ya existe un cliente con este numero de telefono');
    }

    const { nombre, apellido } = separarNombreYApellido(body.nombreCliente);

    let cliente = new Cliente({
        nombreCliente: body.nombreCliente,  
        nombre,                            
        apellido,                        
        telefonoCliente: body.telefonoCliente,
        pedidos: body.pedidos,
        facturas: body.facturas
    });

    return await cliente.save();
}

// Actualizar cliente
async function actualizarCliente(id, body) {
    const { nombre, apellido } = separarNombreYApellido(body.nombreCliente);

    let cliente = await Cliente.findByIdAndUpdate(id, {
        $set: {
            nombreCliente: body.nombreCliente,  
            nombre,                             
            apellido,                          
            telefonoCliente: body.telefonoCliente,
            pedidos: body.pedidos,
            facturas: body.facturas
        }
    }, { new: true });

    return cliente;
}


// Listar todos los clientes
async function listarClientes() {
    let clientes = await Cliente.find()
        .populate('pedidos', 'detallePedido')
        .populate('facturas');
    return clientes;
}

// Buscar cliente por ID
async function buscarClientePorId(id) {
    try {
        const cliente = await Cliente.findById(id)
            .populate('pedidos', 'detallePedido')
            .populate('facturas');
        if (!cliente) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }
        return cliente;
    } catch (err) {
        console.error(`Error al buscar el cliente por ID: ${err.message}`);
        throw err;
    }
}

// Eliminar cliente
async function eliminarCliente(id) {
    try {
        const cliente = await Cliente.findByIdAndDelete(id);
        if (!cliente) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }
        return cliente;
    } catch (err) {
        console.error(`Error al eliminar el cliente: ${err.message}`);
        throw err;
    }
}

// Exportar funciones
module.exports = {
    crearCliente,
    actualizarCliente,
    listarClientes,
    buscarClientePorId,
    eliminarCliente,
    separarNombreYApellido
};
