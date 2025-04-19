//Controlador para DetalleFactura
const logic = require('../Logic/DetalleFactura_logic');
const { detalleFacturaSchemaValidation } = require('../Validations/detalleFactura_validation');

// Controlador para listar todos los detalles de factura
const listarDetallesFactura = async (req, res) => {
    try {
        const detallesFactura = await logic.listarDetallesFactura();
        res.json(detallesFactura);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo detalle de factura
const crearDetalleFactura = async (req, res) => {
    const body = req.body;
    const { error, value } = detalleFacturaSchemaValidation.validate(body);

    if (error) {
        console.error('Error de validación:', error.details);
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        console.log('Creando detalle con:', value);
        const nuevoDetalleFactura = await logic.crearDetalleFactura(value);
        console.log('Detalle creado:', nuevoDetalleFactura);
        res.status(201).json(nuevoDetalleFactura);
    } catch (err) {
        res.status(500).json({ 
            error: 'Error interno del servidor',
        });
    }
};
// Controlador para actualizar un detalle de factura
const actualizarDetalleFactura = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = detalleFacturaSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const detalleFacturaActualizado = await logic.actualizarDetalleFactura(id, value);
        if (!detalleFacturaActualizado) {
            return res.status(404).json({ error: 'Detalle de factura no encontrado' });
        }
        res.json(detalleFacturaActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un detalle de factura por su ID
const obtenerDetalleFacturaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const detalleFactura = await logic.buscarDetalleFacturaPorId(id);
        res.json(detalleFactura);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un detalle de factura por su ID
const eliminarDetalleFactura = async (req, res) => {
    const { id } = req.params;
    try {
        const detalleFacturaEliminado = await logic.eliminarDetalleFactura(id);
        res.json(detalleFacturaEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
// Exportar los controladores
module.exports = {
    listarDetallesFactura,
    crearDetalleFactura,
    actualizarDetalleFactura,
    obtenerDetalleFacturaPorId,
    eliminarDetalleFactura
};
