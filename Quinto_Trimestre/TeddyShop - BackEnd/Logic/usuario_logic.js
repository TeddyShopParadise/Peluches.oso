const Usuario = require('../models/usuario_model');
const Empleado = require('../models/empleado_model');
const Roles = require('../models/roles_model');

// Función asíncrona para crear un nuevo usuario
async function crearUsuario(body) {
    let usuario = new Usuario({
        email: body.email,
        telefono: body.telefono,
        contraseña: body.contraseña, 
        username: body.username,
        estado: body.estado,
        roles: body.roles
    });

    return await usuario.save();
}

// Función asíncrona para actualizar un usuario
async function actualizarUsuario(id, body) {
    let usuario = await Usuario.findByIdAndUpdate(id, {
        $set: {
            email: body.email,
            telefono: body.telefono,
            contraseña: body.contraseña, 
            username: body.username,
            estado: body.estado,
            roles: body.roles
        }
    }, { new: true });

    return usuario;
}

// Función asíncrona para listar todos los usuarios
async function listarUsuarios() {
    let usuarios = await Usuario.find()
        .populate('roles', 'nombre'); 
    return usuarios;
}

// Función asíncrona para buscar un usuario por su ID
async function buscarUsuarioPorId(id) {
    try {
        const usuario = await Usuario.findById(id)
            .populate('roles', 'nombre');
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
