//Controlador para DetallePedido
const logic = require('../Logic/DetallePedido_logic');
const { detallePedidoSchemaValidation } = require('../Validations/detallePedido_validation'); 

const listarDetallesPedido = async (req, res) => {
    console.log('Recibiendo solicitud para listar todos los detalles de pedido');
    try {
        const detallesPedido = await logic.listarDetallesPedido();
        console.log('Detalles de pedido obtenidos:', detallesPedido);
        res.json(detallesPedido);
    } catch (err) {
        console.error('Error al listar detalles de pedido:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


// Controlador para crear un nuevo detalle de pedido
const crearDetallePedido = async (req, res) => {
    const body = req.body;

    const { error, value } = detallePedidoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoDetallePedido = await logic.crearDetallePedido(value);
        res.status(201).json(nuevoDetallePedido);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un detalle de pedido
const actualizarDetallePedido = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = detallePedidoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const detallePedidoActualizado = await logic.actualizarDetallePedido(id, value);
        if (!detallePedidoActualizado) {
            return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
        }
        res.json(detallePedidoActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un detalle de pedido por su ID
const obtenerDetallePedidoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const detallePedido = await logic.buscarDetallePedidoPorId(id);
        res.json(detallePedido);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un detalle de pedido por su ID
const eliminarDetallePedido = async (req, res) => {
    const { id } = req.params;
    try {
        const detallePedidoEliminado = await logic.eliminarDetallePedido(id);
        res.json(detallePedidoEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
// Exportar los controladores
module.exports = {
    listarDetallesPedido,
    crearDetallePedido,
    actualizarDetallePedido,
    obtenerDetallePedidoPorId,
    eliminarDetallePedido
};
