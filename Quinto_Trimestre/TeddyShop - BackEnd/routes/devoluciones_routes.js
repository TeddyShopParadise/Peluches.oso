// routes/devoluciones_routes.js
const express = require('express');
const router = express.Router();
const {
  listarDevoluciones,
  crearDevolucion,
  obtenerDevolucionPorId,
  buscarDevolucionesPorPedido,
  eliminarDevolucion,
  actualizarDevolucion
} = require('../Controllers/devoluciones_controller');

// const authorizeAccess = require('../middlewares/authorizeAccess');
// router.use(authorizeAccess('Administrador', 'Empleado'));

/**
 * @swagger
 * components:
 *   schemas:
 *     DevolucionItem:
 *       type: object
 *       properties:
 *         inventario:
 *           type: string
 *           example: "60d2b6e3e6b0f99dbe0c5a7a"
 *         cantidad:
 *           type: integer
 *           example: 2
 *     Devolucion:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d2b6e3e6b0f99dbe0c5a79"
 *         pedido:
 *           type: string
 *           example: "60d2b6e3e6b0f99dbe0c5a78"
 *         fecha:
 *           type: string
 *           format: date-time
 *         motivo:
 *           type: string
 *           example: "PRODUCTO_DEFECTUOSO"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DevolucionItem'
 */

/**
 * @swagger
 * /devoluciones:
 *   get:
 *     summary: Obtiene todas las devoluciones
 *     tags:
 *       - Devoluciones
 *     responses:
 *       200:
 *         description: Lista de devoluciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Devolucion'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', listarDevoluciones);

/**
 * @swagger
 * /devoluciones:
 *   post:
 *     summary: Crea una nueva devolución
 *     tags:
 *       - Devoluciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pedido
 *               - motivo
 *               - items
 *             properties:
 *               pedido:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a78"
 *               motivo:
 *                 type: string
 *                 example: "El producto llegó con daños en el empaque"
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/DevolucionItem'
 *     responses:
 *       201:
 *         description: Devolución creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Devolucion'
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', crearDevolucion);

/**
 * @swagger
 * /devoluciones/pedido/{pedidoId}:
 *   get:
 *     summary: Obtiene todas las devoluciones de un pedido específico
 *     tags:
 *       - Devoluciones
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de devoluciones del pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Devolucion'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/pedido/:pedidoId', buscarDevolucionesPorPedido);


/**
 * @swagger
 * /devoluciones/{id}:
 *   get:
 *     summary: Obtiene una devolución por su ID
 *     tags:
 *       - Devoluciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devolución encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Devolucion'
 *       404:
 *         description: Devolución no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', obtenerDevolucionPorId);

/**
 * @swagger
 * /devoluciones/{id}:
 *   delete:
 *     summary: Elimina una devolución por su ID
 *     tags:
 *       - Devoluciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devolución eliminada exitosamente
 *       404:
 *         description: Devolución no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', eliminarDevolucion);

/**
 * @swagger
 * /devoluciones/{id}:
 *   put:
 *     summary: Actualiza una devolución existente
 *     tags:
 *       - Devoluciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - motivo
 *               - items
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               motivo:
 *                 type: string
 *                 example: "Producto equivocado entregado"
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/DevolucionItem'
 *     responses:
 *       200:
 *         description: Devolución actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Devolucion'
 *       404:
 *         description: Devolución no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', actualizarDevolucion);

module.exports = router;
