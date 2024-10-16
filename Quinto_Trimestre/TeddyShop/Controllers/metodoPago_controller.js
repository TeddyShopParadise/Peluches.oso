//Logica de el controlador del metodo pago
const logic = require('../Logic/metodo_pago_logic'); // Asegúrate de importar la lógica
const { metodoPagoSchemaValidation } = require('../Validations/metodoPago_validation'); // Importa la validación

// Controlador para listar todos los métodos de pago
const listarMetodosPago = async (req, res) => {
    try {
        const metodosPago = await logic.listarMetodosPago();
        res.json(metodosPago);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo método de pago
const crearMetodoPago = async (req, res) => {
    const body = req.body;

    const { error, value } = metodoPagoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoMetodoPago = await logic.crearMetodoPago(value);
        res.status(201).json(nuevoMetodoPago);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un método de pago
const actualizarMetodoPago = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = metodoPagoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const metodoPagoActualizado = await logic.actualizarMetodoPago(id, value);
        if (!metodoPagoActualizado) {
            return res.status(404).json({ error: 'Método de pago no encontrado' });
        }
        res.json(metodoPagoActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un método de pago por su ID
const obtenerMetodoPagoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const metodoPago = await logic.buscarMetodoPagoPorId(id);
        res.json(metodoPago);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un método de pago por su ID
const eliminarMetodoPago = async (req, res) => {
    const { id } = req.params;
    try {
        const metodoPagoEliminado = await logic.eliminarMetodoPago(id);
        res.json(metodoPagoEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarMetodosPago,
    crearMetodoPago,
    actualizarMetodoPago,
    obtenerMetodoPagoPorId,
    eliminarMetodoPago
};
