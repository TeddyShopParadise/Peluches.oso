//Logica de el controlador de la devolucion 
const logic = require('../Logic/devoluciones_logic'); // Asegúrate de importar la lógica
const { devolucionSchemaValidation } = require('../Validations/devoluciones_validation'); // Importa la validación

// Controlador para listar todas las devoluciones
const listarDevoluciones = async (req, res) => {
    try {
        const devoluciones = await logic.listarDevoluciones();
        res.json(devoluciones);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear una nueva devolución
const crearDevolucion = async (req, res) => {
    const body = req.body;

    const { error, value } = devolucionSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevaDevolucion = await logic.crearDevolucion(value);
        res.status(201).json(nuevaDevolucion);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar una devolución
const actualizarDevolucion = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = devolucionSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const devolucionActualizada = await logic.actualizarDevolucion(id, value);
        if (!devolucionActualizada) {
            return res.status(404).json({ error: 'Devolución no encontrada' });
        }
        res.json(devolucionActualizada);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener una devolución por su ID
const obtenerDevolucionPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const devolucion = await logic.buscarDevolucionPorId(id);
        res.json(devolucion);
    } catch (err) {
        if (err.message.includes('no encontrada')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar una devolución por su ID
const eliminarDevolucion = async (req, res) => {
    const { id } = req.params;
    try {
        const devolucionEliminada = await logic.eliminarDevolucion(id);
        res.json(devolucionEliminada);
    } catch (err) {
        if (err.message.includes('no encontrada')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarDevoluciones,
    crearDevolucion,
    actualizarDevolucion,
    obtenerDevolucionPorId,
    eliminarDevolucion
};
