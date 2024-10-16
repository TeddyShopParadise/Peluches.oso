//Logica de el controlador del pedido
const logic = require('../Logic/pedido_logic'); // Asegúrate de importar la lógica
const { pedidoSchemaValidation } = require('../Validations/pedido_validation'); // Importa la validación

// Controlador para listar todos los pedidos
const listarPedidos = async (req, res) => {
    try {
        const pedidos = await logic.listarPedidos();
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo pedido
const crearPedido = async (req, res) => {
    const body = req.body;

    const { error, value } = pedidoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoPedido = await logic.crearPedido(value);
        res.status(201).json(nuevoPedido);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un pedido
const actualizarPedido = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = pedidoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const pedidoActualizado = await logic.actualizarPedido(id, value);
        if (!pedidoActualizado) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.json(pedidoActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un pedido por su ID
const obtenerPedidoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await logic.buscarPedidoPorId(id);
        res.json(pedido);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un pedido por su ID
const eliminarPedido = async (req, res) => {
    const { id } = req.params;
    try {
        const pedidoEliminado = await logic.eliminarPedido(id);
        res.json(pedidoEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarPedidos,
    crearPedido,
    actualizarPedido,
    obtenerPedidoPorId,
    eliminarPedido
};
