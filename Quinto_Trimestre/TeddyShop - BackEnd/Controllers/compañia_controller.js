//Controlador para compañia
const logic = require('../Logic/compañia_logic'); 
const { compañiaSchemaValidation } = require('../Validations/compañia_validation'); 

// Controlador para listar todas las compañías
const listarCompañias = async (req, res) => {
    
    try {
        const compañias = await logic.listarCompañias();
        res.json(compañias);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear una compañía
const crearCompañia = async (req, res) => {
    const body = req.body;

    const { error, value } = compañiaSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevaCompañia = await logic.crearCompañia(value);
        res.status(201).json(nuevaCompañia);
    } catch (err) {
        if (err.message === 'Ya existe una compañía con este NIT') {
            return res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar una compañía
const actualizarCompañia = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = compañiaSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const compañiaActualizada = await logic.actualizarCompañia(id, value);
        if (!compañiaActualizada) {
            return res.status(404).json({ error: 'Compañía no encontrada' });
        }
        res.json(compañiaActualizada);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener una compañía por su ID
const obtenerCompañiaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const compañia = await logic.buscarCompañiaPorId(id);
        res.json(compañia);
    } catch (err) {
        if (err.message.includes('no encontrada')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar una compañía por su ID
const eliminarCompañia = async (req, res) => {
    const { id } = req.params;
    try {
        const compañiaEliminada = await logic.eliminarCompañia(id);
        res.json(compañiaEliminada);
    } catch (err) {
        if (err.message.includes('no encontrada')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
// Exportar los controladores
module.exports = {
    listarCompañias,
    crearCompañia,
    actualizarCompañia,
    obtenerCompañiaPorId,
    eliminarCompañia
};
