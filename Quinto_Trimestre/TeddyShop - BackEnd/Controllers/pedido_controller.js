//Controlador para Pedido
//Importación para que funcione correctamente
const logic = require('../Logic/pedido_logic'); 
const { pedidoSchemaValidation } = require('../Validations/pedido_validation'); 

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
        console.error('🔥 Error al crear pedido:', err.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


// Controlador para actualizar un pedido con logs de depuración
const actualizarPedido = async (req, res) => {
    const { id } = req.params;
    const body = req.body;


    const { error, value } = pedidoSchemaValidation.validate(body);

    if (error) {
        console.error('[ActualizarPedido] Error de validación:', error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }



    try {
        const pedidoActualizado = await logic.actualizarPedido(id, value);

        if (!pedidoActualizado) {
            console.warn('[ActualizarPedido] Pedido no encontrado con ID:', id);
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.json(pedidoActualizado);
    } catch (err) {
        console.error('[ActualizarPedido] Error en lógica:', err);
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


//Controlador para actualizar el estado del pedido
const actualizarEstadoPedido = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = ['pendiente', 'en_proceso', 'realizado'];

    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ error: 'Estado inválido. Debe ser: pendiente, en proceso o realizado' });
    }

    try {
        const pedidoActualizado = await logic.actualizarEstado(id, estado);
        if (!pedidoActualizado) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.json(pedidoActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
    }
};



// Exportar los controladores
module.exports = {
    listarPedidos,
    crearPedido,
    actualizarPedido,
    obtenerPedidoPorId,
    eliminarPedido,
    actualizarEstadoPedido
};
