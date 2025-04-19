const Empleado = require('../models/empleado_model');
const Compania = require('../models/compañia_model'); 

// Función asíncrona para crear un nuevo empleado
async function crearEmpleado(body) {
    const empleado = new Empleado({
        dniEmpleado: body.dniEmpleado,
        telefonoEmpleado: body.telefonoEmpleado,
        nombreEmpleado: body.nombreEmpleado,
        compania: body.compania, 
    });

    return await empleado.save();
}

// Función asíncrona para actualizar un empleado
async function actualizarEmpleado(id, body) {
    const empleado = await Empleado.findByIdAndUpdate(id, {
        $set: {
            dniEmpleado: body.dniEmpleado,
            telefonoEmpleado: body.telefonoEmpleado,
            nombreEmpleado: body.nombreEmpleado,
            compania: body.compania, 
            usuario: body.usuario,
        }
    }, { new: true });

    return empleado;
}

// Función asíncrona para listar todos los empleados
async function listarEmpleados() {
    const empleados = await Empleado.find()
        .populate('compania', 'nombreEmpresa') 
    return empleados;
}

// Función asíncrona para buscar un empleado por su ID
async function buscarEmpleadoPorId(id) {
    try {
        const empleado = await Empleado.findById(id)
            .populate('compania', 'nombreEmpresa')
        
        if (!empleado) {
            throw new Error(`Empleado con ID ${id} no encontrado`);
        }
        return empleado;
    } catch (err) {
        console.error(`Error al buscar el empleado por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un empleado por su ID
async function eliminarEmpleado(id) {
    try {
        const empleado = await Empleado.findByIdAndDelete(id);
        if (!empleado) {
            throw new Error(`Empleado con ID ${id} no encontrado`);
        }
        return empleado;
    } catch (err) {
        console.error(`Error al eliminar el empleado: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearEmpleado,
    actualizarEmpleado,
    listarEmpleados,
    buscarEmpleadoPorId,
    eliminarEmpleado
};
