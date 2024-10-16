//Logica de el controlador del movimiento
const logic = require('../Logic/movimiento_logic'); // Asegúrate de importar la lógica
const { movimientoSchemaValidation } = require('../Validations/movimiento_validation'); // Importa la validación

// Controlador para listar todos los movimientos
const listarMovimientos = async (req, res) => {
    try {
        const movimientos = await logic.listarMovimientos();
        res.json(movimientos);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo movimiento
const crearMovimiento = async (req, res) => {
    const body = req.body;

    const { error, value } = movimientoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoMovimiento = await logic.crearMovimiento(value);
        res.status(201).json(nuevoMovimiento);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un movimiento
const actualizarMovimiento = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = movimientoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const movimientoActualizado = await logic.actualizarMovimiento(id, value);
        if (!movimientoActualizado) {
            return res.status(404).json({ error: 'Movimiento no encontrado' });
        }
        res.json(movimientoActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un movimiento por su ID
const obtenerMovimientoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const movimiento = await logic.buscarMovimientoPorId(id);
        res.json(movimiento);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un movimiento por su ID
const eliminarMovimiento = async (req, res) => {
    const { id } = req.params;
    try {
        const movimientoEliminado = await logic.eliminarMovimiento(id);
        res.json(movimientoEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarMovimientos,
    crearMovimiento,
    actualizarMovimiento,
    obtenerMovimientoPorId,
    eliminarMovimiento
};
