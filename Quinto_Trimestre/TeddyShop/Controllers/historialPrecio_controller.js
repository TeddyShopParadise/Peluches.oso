//Logica de el controlador del historial precio
const logic = require('../Logic/historial_precio_logic'); // Asegúrate de importar la lógica
const { historialPrecioSchemaValidation } = require('../Validations/historialPrecio_validation'); // Importa la validación

// Controlador para listar todos los historiales de precio
const listarHistorialPrecios = async (req, res) => {
    try {
        const historialesPrecio = await logic.listarHistorialPrecios();
        res.json(historialesPrecio);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo historial de precio
const crearHistorialPrecio = async (req, res) => {
    const body = req.body;

    const { error, value } = historialPrecioSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoHistorialPrecio = await logic.crearHistorialPrecio(value);
        res.status(201).json(nuevoHistorialPrecio);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un historial de precio
const actualizarHistorialPrecio = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = historialPrecioSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const historialPrecioActualizado = await logic.actualizarHistorialPrecio(id, value);
        if (!historialPrecioActualizado) {
            return res.status(404).json({ error: 'Historial de precio no encontrado' });
        }
        res.json(historialPrecioActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un historial de precio por su ID
const obtenerHistorialPrecioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const historialPrecio = await logic.buscarHistorialPrecioPorId(id);
        res.json(historialPrecio);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un historial de precio por su ID
const eliminarHistorialPrecio = async (req, res) => {
    const { id } = req.params;
    try {
        const historialPrecioEliminado = await logic.eliminarHistorialPrecio(id);
        res.json(historialPrecioEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarHistorialPrecios,
    crearHistorialPrecio,
    actualizarHistorialPrecio,
    obtenerHistorialPrecioPorId,
    eliminarHistorialPrecio
};
