//Logica de el controlador de la factura
const logic = require('../Logic/facturas_logic'); // Asegúrate de importar la lógica
const { facturaSchemaValidation } = require('../Validations/factura_validation'); // Importa la validación

// Controlador para listar todas las facturas
const listarFacturas = async (req, res) => {
    try {
        const facturas = await logic.listarFacturas();
        res.json(facturas);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear una nueva factura
const crearFactura = async (req, res) => {
    const body = req.body;

    const { error, value } = facturaSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevaFactura = await logic.crearFactura(value);
        res.status(201).json(nuevaFactura);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar una factura
const actualizarFactura = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = facturaSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const facturaActualizada = await logic.actualizarFactura(id, value);
        if (!facturaActualizada) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.json(facturaActualizada);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener una factura por su ID
const obtenerFacturaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const factura = await logic.buscarFacturaPorId(id);
        res.json(factura);
    } catch (err) {
        if (err.message.includes('no encontrada')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar una factura por su ID
const eliminarFactura = async (req, res) => {
    const { id } = req.params;
    try {
        const facturaEliminada = await logic.eliminarFactura(id);
        res.json(facturaEliminada);
    } catch (err) {
        if (err.message.includes('no encontrada')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarFacturas,
    crearFactura,
    actualizarFactura,
    obtenerFacturaPorId,
    eliminarFactura
};
