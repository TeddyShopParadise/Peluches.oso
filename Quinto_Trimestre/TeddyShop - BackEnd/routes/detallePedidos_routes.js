const express = require('express');
const router = express.Router();
const {
    listarDetallesPedido,
    crearDetallePedido,
    actualizarDetallePedido,
    obtenerDetallePedidoPorId,
    eliminarDetallePedido
} = require('../Controllers/DetallePedido_controller'); // Asegúrate de importar los controladores

/**
 * @swagger
 * /detallesPedido:
 *   get:
 *     summary: Obtiene todos los detalles de pedido
 *     tags:
 *       - Detalle Pedido
 *     responses:
 *       200:
 *         description: Lista de detalles de pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a79"
 *                   precioDetallePedido:
 *                     type: number
 *                     example: 19.99
 *                   cantidadDetallePedido:
 *                     type: number
 *                     example: 3
 *                   idPedido:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a79"
 *                   idProducto:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7a"
 *       500:
 *         description: Error interno del servidor
 */


router.get('/', listarDetallesPedido);

/**
 * @swagger
 * /detallesPedido:
 *   post:
 *     summary: Crea un nuevo detalle de pedido
 *     tags:
 *       - Detalle Pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               precioDetallePedido:
 *                 type: number
 *                 example: 19.99
 *               cantidadDetallePedido:
 *                 type: number
 *                 example: 3
 *               idPedido:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a79"
 *               idProducto:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *     responses:
 *       201:
 *         description: Detalle de pedido creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */


router.post('/', crearDetallePedido);

/**
 * @swagger
 * /detallesPedido/{id}:
 *   put:
 *     summary: Actualiza un detalle de pedido por su ID
 *     tags:
 *       - Detalle Pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del detalle de pedido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               precioDetallePedido:
 *                 type: number
 *                 example: 19.99
 *               cantidadDetallePedido:
 *                 type: number
 *                 example: 3
 *               idPedido:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a79"
 *               idProducto:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *     responses:
 *       200:
 *         description: Detalle de pedido actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Detalle de pedido no encontrado
 */

router.put('/:id', actualizarDetallePedido);

/**
 * @swagger
 * /detallesPedido/{id}:
 *   get:
 *     summary: Obtiene un detalle de pedido por su ID
 *     tags:
 *       - Detalle Pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del detalle de pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de pedido encontrado
 *       404:
 *         description: Detalle de pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */



router.get('/:id', obtenerDetallePedidoPorId);

/**
 * @swagger
 * /detallesPedido/{id}:
 *   delete:
 *     summary: Elimina un detalle de pedido por su ID
 *     tags:
 *       - Detalle Pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del detalle de pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de pedido eliminado exitosamente
 *       404:
 *         description: Detalle de pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', eliminarDetallePedido);

module.exports = router;
