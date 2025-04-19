const Roles = require('../models/roles_model');
const Usuario = require('../models/usuario_model'); 

// Función asíncrona para crear un nuevo rol
async function crearRol(body) {
    const rol = new Roles({
        estado: body.estado,
        nombre: body.nombre,
        usuarios: body.usuarios || [] 
    });

    return await rol.save();
}

// Función asíncrona para actualizar un rol
async function actualizarRol(id, body) {
    const rol = await Roles.findByIdAndUpdate(id, {
        $set: {
            estado: body.estado,
            nombre: body.nombre,
            usuarios: body.usuarios || [] 
        }
    }, { new: true });

    return rol;
}

// Función asíncrona para listar todos los roles
async function listarRoles() {
    const roles = await Roles.find()
    return roles;
}

// Función asíncrona para buscar un rol por su ID
async function buscarRolPorId(id) {
    try {
        const rol = await Roles.findById(id).populate('usuarios', 'username email');
        
        if (!rol) {
            throw new Error(`Rol con ID ${id} no encontrado`);
        }
        return rol;
    } catch (err) {
        console.error(`Error al buscar el rol por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un rol por su ID
async function eliminarRol(id) {
    try {
        const rol = await Roles.findByIdAndDelete(id);
        if (!rol) {
            throw new Error(`Rol con ID ${id} no encontrado`);
        }
        return rol;
    } catch (err) {
        console.error(`Error al eliminar el rol: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearRol,
    actualizarRol,
    listarRoles,
    buscarRolPorId,
    eliminarRol
};
