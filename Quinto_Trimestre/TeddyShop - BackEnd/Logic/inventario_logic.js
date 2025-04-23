const Inventario = require('../models/inventario_model');

// Función asíncrona para crear un inventario
const Movimiento = require('../models/movimiento_model');

async function crearInventario(body) {
    // Validar que los precios sean positivos
    if (body.precioVenta <= 0 || body.precioCompra <= 0) {
        throw new Error('Los precios deben ser valores positivos');
    }

    // Validar que precioVenta > precioCompra
    if (body.precioVenta <= body.precioCompra) {
        throw new Error('El precio de venta debe ser mayor al precio de compra');
    }

    // Validar stocks
    if (body.stockMinimo > body.stockMaximo) {
        throw new Error('El stock mínimo no puede ser mayor al stock máximo');
    }

    try {
        // Crear inventario
        const inventario = new Inventario({
            stockMinimo: body.stockMinimo,
            precioVenta: body.precioVenta,
            precioCompra: body.precioCompra,
            stock: body.stock,
            stockMaximo: body.stockMaximo,
            idProducto: body.idProducto
        });

        const inventarioGuardado = await inventario.save();

        // Crear movimiento inicial con cantidad igual al stock inicial
        const movimientoInicial = new Movimiento({
            fecha: new Date(),
            cantidadIngreso: body.stock,
            cantidadVendida: 0,
            inventario: inventarioGuardado._id
        });

        const movimientoGuardado = await movimientoInicial.save();

        // Asociar el movimiento al inventario
        inventarioGuardado.movimientos.push(movimientoGuardado._id);
        await inventarioGuardado.save();

        return inventarioGuardado;

    } catch (error) {
        console.error('Error creando inventario y movimiento inicial:', error);
        throw error;
    }
}

// Función asíncrona para actualizar un inventario
async function actualizarInventario(id, body) {
    let inventario = await Inventario.findByIdAndUpdate(id, {
        $set: {
            stockMinimo: body.stockMinimo,
            precioVenta: body.precioVenta,
            precioCompra: body.precioCompra,
            stock: body.stock,
            stockMaximo: body.stockMaximo,
            idDevolucion: body.idDevolucion,
            idProducto: body.idProducto,
            detalleFacturas: body.detalleFacturas,
            movimientos: body.movimientos
        }
    }, { new: true });

    if (!inventario) {
        throw new Error(`Inventario con ID ${id} no encontrado`);
    }

    return inventario;
}

// Función asíncrona para listar todos los inventarios
async function listarInventarios() {
    let inventarios = await Inventario.find()
        .populate('idDevolucion', 'descripcion')
        .populate('idProducto', 'nombreProducto')
        .populate('detalleFacturas', 'detalle')
        .populate('movimientos', 'descripcionMovimiento');
    return inventarios;
}

// Función asíncrona para buscar un inventario por su ID
async function buscarInventarioPorId(id) {
    try {
        const inventario = await Inventario.findById(id)
            .populate('idDevolucion', 'descripcion')
            .populate('idProducto', 'nombreProducto')
            .populate('detalleFacturas', 'detalle')
            .populate('movimientos', 'descripcionMovimiento');

        if (!inventario) {
            throw new Error(`Inventario con ID ${id} no encontrado`);
        }
        return inventario;
    } catch (err) {
        console.error(`Error al buscar el inventario por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un inventario por su ID
async function eliminarInventario(id) {
    try {
        const inventario = await Inventario.findByIdAndDelete(id);
        if (!inventario) {
            throw new Error(`Inventario con ID ${id} no encontrado`);
        }
        return inventario;
    } catch (err) {
        console.error(`Error al eliminar el inventario: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para obtener el inventario por idProducto
async function obtenerInventarioPorProducto(idProducto) {
    try {
        // Buscar el inventario que tenga el idProducto correspondiente
        const inventario = await Inventario.findOne({ idProducto: idProducto });
        
        // Si no se encuentra, retornamos null
        if (!inventario) {
            return null;
        }
        
        return inventario;
    } catch (error) {
        console.error('Error al buscar inventario por idProducto:', error);
        throw error;
    }
}

module.exports = {
    crearInventario,
    actualizarInventario,
    listarInventarios,
    buscarInventarioPorId,
    eliminarInventario,
    obtenerInventarioPorProducto
};
