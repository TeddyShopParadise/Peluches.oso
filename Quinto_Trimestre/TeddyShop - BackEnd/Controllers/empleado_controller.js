//Controlador para Empleado
const logic = require('../Logic/empleado_logic'); 
const { empleadoSchemaValidation } = require('../Validations/empleado_validation'); 

// Controlador para listar todos los empleados
const listarEmpleados = async (req, res) => {
    try {
        const empleados = await logic.listarEmpleados();
        res.json(empleados);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearEmpleado = async (req, res) => {
    const body = req.body;

    const { error, value } = empleadoSchemaValidation.validate(body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ message: "Validación fallida", details: error.details });
    }

    try {
        const nuevoEmpleado = await logic.crearEmpleado(value);
        res.status(201).json(nuevoEmpleado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
};

// Controlador para actualizar un empleado
const actualizarEmpleado = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = empleadoSchemaValidation.validate(body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error: error.details });
    }

    try {
        const empleadoActualizado = await logic.actualizarEmpleado(id, value);
        if (!empleadoActualizado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json(empleadoActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
};
// Controlador para obtener un empleado por su ID
const obtenerEmpleadoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const empleado = await logic.buscarEmpleadoPorId(id);
        res.json(empleado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un empleado por su ID
const eliminarEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        const empleadoEliminado = await logic.eliminarEmpleado(id);
        res.json(empleadoEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
// Exportar los controladores
module.exports = {
    listarEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    obtenerEmpleadoPorId,
    eliminarEmpleado
};
