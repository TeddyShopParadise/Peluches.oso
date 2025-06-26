const Compañia = require('../models/compañia_model');
const Catalogo = require('../models/catalogo_model');
const Empleado = require('../models/empleado_model');

// Función asíncrona para crear una nueva compañía
async function crearCompañia(body) {
    let compañia = new Compañia({
        NIT: body.NIT,
        telefonoEmpresa: body.telefonoEmpresa,
        nombreEmpresa: body.nombreEmpresa,
        direccionEmpresa: body.direccionEmpresa,
        catalogos: body.catalogos,
        empleados: body.empleados
    });

    return await compañia.save();
}

// Función asíncrona para actualizar una compañía
async function actualizarCompañia(id, body) {
    let compañia = await Compañia.findByIdAndUpdate(id, {
        $set: {
            NIT: body.NIT,
            telefonoEmpresa: body.telefonoEmpresa,
            nombreEmpresa: body.nombreEmpresa,
            direccionEmpresa: body.direccionEmpresa,
            catalogos: body.catalogos,
            empleados: body.empleados
        }
    }, { new: true });

    return compañia;
}

// Función asíncrona para listar todas las compañías
async function listarCompañias() {
    let compañias = await Compañia.find()
        .populate('catalogos', 'nombreCatalogo') 
        .populate('empleados', 'nombreEmpleado dniEmpleado'); 
    return compañias;
}

// Función asíncrona para buscar una compañía por su ID
async function buscarCompañiaPorId(id) {
    try {
        const compañia = await Compañia.findById(id)
            .populate('catalogos', 'nombreCatalogo') 
            .populate('empleados', 'nombreEmpleado dniEmpleado'); 
        if (!compañia) {
            throw new Error(`Compañía con ID ${id} no encontrada`);
        }
        return compañia;
    } catch (err) {
        console.error(`Error al buscar la compañía por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar una compañía por su ID
async function eliminarCompañia(id) {
    try {
        const compañia = await Compañia.findByIdAndDelete(id);
        if (!compañia) {
            throw new Error(`Compañía con ID ${id} no encontrada`);
        }
        return compañia;
    } catch (err) {
        console.error(`Error al eliminar la compañía: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearCompañia,
    actualizarCompañia,
    listarCompañias,
    buscarCompañiaPorId,
    eliminarCompañia
};
