// controllers/devolucionesController.js
const logic = require('../Logic/devoluciones_logic');
const { devolucionesSchemaValidation, consultaDevolucionesValidation } = require('../Validations/devoluciones_validation');

// Listar todas las devoluciones
const listarDevoluciones = async (req, res) => {
  try {
    const devoluciones = await logic.listarDevoluciones();
    res.json(devoluciones);
  } catch (err) {
    console.error('[listarDevoluciones] Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear una nueva devolución manual
const crearDevolucion = async (req, res) => {
  const { error, value } = devolucionesSchemaValidation.validate(req.body);

  if (error) {
    console.warn('[crearDevolucion] Validación fallida:', error.details);
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaDevolucion = await logic.crearDevolucion(value);
    res.status(201).json(nuevaDevolucion);
  } catch (err) {
    console.error('[crearDevolucion] Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener una devolución por su ID
const obtenerDevolucionPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const devolucion = await logic.buscarDevolucionPorId(id);
    console.log('[obtenerDevolucionPorId] Devolución encontrada:', devolucion);
    res.json(devolucion);
  } catch (err) {
    if (err.message.includes('no encontrada')) {
      console.warn('[obtenerDevolucionPorId] No encontrada:', err.message);
      return res.status(404).json({ error: err.message });
    }
    console.error('[obtenerDevolucionPorId] Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Buscar devoluciones por un pedido específico
const buscarDevolucionesPorPedido = async (req, res) => {
  const { pedidoId } = req.params;

  try {
    const devols = await logic.buscarDevolucionesPorPedido(pedidoId);
    res.json(devols);
  } catch (err) {
    console.error('[buscarDevolucionesPorPedido] Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar una devolución y revertir stock
const eliminarDevolucion = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await logic.eliminarDevolucion(id);
    res.json(result);
  } catch (err) {
    if (err.message.includes('no encontrada')) {
      console.warn('[eliminarDevolucion] No encontrada:', err.message);
      return res.status(404).json({ error: err.message });
    }
    console.error('[eliminarDevolucion] Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  listarDevoluciones,
  crearDevolucion,
  obtenerDevolucionPorId,
  buscarDevolucionesPorPedido,
  eliminarDevolucion
};
