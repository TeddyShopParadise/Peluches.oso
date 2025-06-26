const Usuario = require('../models/usuario_model');
const Empleado = require('../models/empleado_model');
const Roles = require('../models/roles_model');

// Función asíncrona para crear un nuevo usuario
async function crearUsuario(body) {
    let usuario = new Usuario({
        email: body.email,
        contraseña: body.contraseña, 
        username: body.username,
        estado: body.estado,
        empleados: body.empleados, 
        roles: body.roles 
    });

    return await usuario.save();
}

// Función asíncrona para actualizar un usuario
async function actualizarUsuario(id, body) {
    let usuario = await Usuario.findByIdAndUpdate(id, {
        $set: {
            email: body.email,
            contraseña: body.contraseña, 
            username: body.username,
            estado: body.estado,
            empleados: body.empleados, 
            roles: body.roles 
        }
    }, { new: true })
    .populate('roles', 'nombre')
    .populate('empleados', 'nombreEmpleado'); 

    return usuario;
}

// Función asíncrona para listar todos los usuarios
async function listarUsuarios() {
    return await Usuario.find()
        .populate('roles', 'nombre')
        .populate('empleados', 'nombreEmpleado'); 
}

async function buscarUsuarioPorId(id) {
    try {
        const usuario = await Usuario.findById(id)
            .populate('roles', 'nombre')
            .populate('empleados', 'nombreEmpleado'); 
        if (!usuario) {
            throw new Error(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    } catch (err) {
        console.error(`Error al buscar el usuario por ID: ${err.message}`);
        throw err;
    }
}
// Función asíncrona para eliminar un usuario por su ID
async function eliminarUsuario(id) {
    try {
        const usuario = await Usuario.findByIdAndDelete(id);
        if (!usuario) {
            throw new Error(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    } catch (err) {
        console.error(`Error al eliminar el usuario: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearUsuario,
    actualizarUsuario,
    listarUsuarios,
    buscarUsuarioPorId,
    eliminarUsuario
};
