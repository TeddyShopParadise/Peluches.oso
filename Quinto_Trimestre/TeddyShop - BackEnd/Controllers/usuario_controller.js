//Controlador para Usuario
const logic = require('../Logic/usuario_logic'); 
const { usuarioSchemaValidation } = require('../Validations/usuario_validation'); 
const bcrypt = require('bcrypt'); 

// Controlador para listar todos los usuarios
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await logic.listarUsuarios();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo usuario
const crearUsuario = async (req, res) => {
    const body = req.body;

    const { error, value } = usuarioSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    value.contraseña = await bcrypt.hash(value.contraseña, salt);

    try {
        console.log("Datos recibidos:", req.body);
        const nuevoUsuario = await logic.crearUsuario(value);
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un usuario
const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = usuarioSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Encriptar la nueva contraseña si se proporciona
    if (value.contraseña) {
        const salt = await bcrypt.genSalt(10);
        value.contraseña = await bcrypt.hash(value.contraseña, salt);
    }

    try {
        const usuarioActualizado = await logic.actualizarUsuario(id, value);
        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuarioActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un usuario por su ID
const obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await logic.buscarUsuarioPorId(id);
        res.json(usuario);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un usuario por su ID
const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuarioEliminado = await logic.eliminarUsuario(id);
        res.json(usuarioEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
// Exportar los controladores
module.exports = {
    listarUsuarios,
    crearUsuario,
    actualizarUsuario,
    obtenerUsuarioPorId,
    eliminarUsuario
};
