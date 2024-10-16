//Logica de el controlador de los roles
const logic = require('../Logic/roles_logic'); // Asegúrate de importar la lógica
const { rolSchemaValidation } = require('../Validations/roles_validation'); // Importa la validación

// Controlador para listar todos los roles
const listarRoles = async (req, res) => {
    try {
        const roles = await logic.listarRoles();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo rol
const crearRol = async (req, res) => {
    const body = req.body;

    const { error, value } = rolSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoRol = await logic.crearRol(value);
        res.status(201).json(nuevoRol);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un rol
const actualizarRol = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = rolSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const rolActualizado = await logic.actualizarRol(id, value);
        if (!rolActualizado) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json(rolActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un rol por su ID
const obtenerRolPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const rol = await logic.buscarRolPorId(id);
        res.json(rol);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un rol por su ID
const eliminarRol = async (req, res) => {
    const { id } = req.params;
    try {
        const rolEliminado = await logic.eliminarRol(id);
        res.json(rolEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarRoles,
    crearRol,
    actualizarRol,
    obtenerRolPorId,
    eliminarRol
};
