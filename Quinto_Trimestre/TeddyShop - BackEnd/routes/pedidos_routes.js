const express = require('express');
const router = express.Router();
const pedidoController = require('../Controllers/pedido_controller');

//const authorizeAccess = require('../middlewares/authorizeAccess');
//router.use(authorizeAccess('Administrador', 'Empleado'));

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /pedido:
 *   get:
 *     summary: Obtiene todos los pedidos
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos
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
 *                   nombreComprador:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   numeroComprador:
 *                     type: string
 *                     example: "123456789"
 *                   nombreAgendador:
 *                     type: string
 *                     example: "María López"
 *                   numeroAgendador:
 *                     type: string
 *                     example: "987654321"
 *                   localidad:
 *                     type: string
 *                     example: "Ciudad"
 *                   direccion:
 *                     type: string
 *                     example: "Calle 123"
 *                   barrio:
 *                     type: string
 *                     example: "Barrio Central"
 *                   cliente:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7a"
 *                   detallesPedido:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c5a7b"
 *                   facturas:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c5a7c"
 *       500:
 *         description: Error interno del servidor
 */


router.get('/', pedidoController.listarPedidos);

/**
 * @swagger
 * /pedido:
 *   post:
 *     summary: Crea un nuevo pedido
 *     tags:
 *       - Pedidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreComprador:
 *                 type: string
 *                 example: "Juan Pérez"
 *               numeroComprador:
 *                 type: string
 *                 example: "123456789"
 *               nombreAgendador:
 *                 type: string
 *                 example: "María López"
 *               numeroAgendador:
 *                 type: string
 *                 example: "987654321"
 *               localidad:
 *                 type: string
 *                 example: "Ciudad"
 *               direccion:
 *                 type: string
 *                 example: "Calle 123"
 *               barrio:
 *                 type: string
 *                 example: "Barrio Central"
 *               cliente:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *               detallesPedido:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7b"
 *               facturas:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7c"
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */


router.post('/', pedidoController.crearPedido);

/**
 * @swagger
 * /pedido/{id}:
 *   get:
 *     summary: Obtiene un pedido por su ID
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */



router.get('/:id', pedidoController.obtenerPedidoPorId);

/**
 * @swagger
 * /pedido/{id}:
 *   put:
 *     summary: Actualiza un pedido por su ID
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreComprador:
 *                 type: string
 *                 example: "Juan Pérez"
 *               numeroComprador:
 *                 type: string
 *                 example: "123456789"
 *               nombreAgendador:
 *                 type: string
 *                 example: "María López"
 *               numeroAgendador:
 *                 type: string
 *                 example: "987654321"
 *               localidad:
 *                 type: string
 *                 example: "Ciudad"
 *               direccion:
 *                 type: string
 *                 example: "Calle 123"
 *               barrio:
 *                 type: string
 *                 example: "Barrio Central"
 *               cliente:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *               detallesPedido:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7b"
 *               facturas:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7c"
 *     responses:
 *       200:
 *         description: Pedido actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Pedido no encontrado
 */


router.put('/:id', pedidoController.actualizarPedido);

/**
 * @swagger
 * /pedido/{id}:
 *   delete:
 *     summary: Elimina un pedido por su ID
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido eliminado exitosamente
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', pedidoController.eliminarPedido);



/**
 * @swagger
 * /pedido/estado/{id}:
 *   patch:
 *     summary: Actualiza el estado de un pedido
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en_proceso, realizado]
 *                 example: "en_proceso"
 *     responses:
 *       200:
 *         description: Estado del pedido actualizado
 *       400:
 *         description: Estado inválido o error en los datos
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/estado/:id', pedidoController.actualizarEstadoPedido);




module.exports = router;
