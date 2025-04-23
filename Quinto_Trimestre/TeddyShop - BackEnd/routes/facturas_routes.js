const express = require('express');
const router = express.Router();
const {
    listarFacturas,
    crearFactura,
    actualizarFactura,
    obtenerFacturaPorId,
    eliminarFactura,
    generarFacturaDesdePedido,
    buscarFacturaPorPedido
} = require('../Controllers/factura_controller'); // Importa los controladores

/**
 * @swagger
 * /factura:
 *   get:
 *     summary: Obtiene todas las facturas
 *     tags:
 *       - Facturas
 *     responses:
 *       200:
 *         description: Lista de facturas
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
 *                   fechaCreacionFactura:
 *                     type: string
 *                     format: date
 *                     example: "2024-10-22"
 *                   horaCreacionFactura:
 *                     type: string
 *                     example: "14:30"
 *                   pedido:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7a"
 *                   cliente:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7b"
 *                   detallesFactura:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c5a7c"
 *                   metodoPago:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7d"
 *       500:
 *         description: Error interno del servidor
 */


// Ruta para listar todas las facturas
router.get('/', listarFacturas);

/**
 * @swagger
 * /factura:
 *   post:
 *     summary: Crea una nueva factura
 *     tags:
 *       - Facturas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaCreacionFactura:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-22"
 *               horaCreacionFactura:
 *                 type: string
 *                 example: "14:30:00"
 *               pedido:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *               cliente:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7b"
 *               detallesFactura:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7c"
 *               metodoPago:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7d"
 *     responses:
 *       201:
 *         description: Factura creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para crear una nueva factura
router.post('/', crearFactura);

/**
 * @swagger
 * /factura/{id}:
 *   put:
 *     summary: Actualiza una factura por su ID
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la factura
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaCreacionFactura:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-22"
 *               horaCreacionFactura:
 *                 type: string
 *                 example: "14:30"
 *               pedido:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *               cliente:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7b"
 *               detallesFactura:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7c"
 *               metodoPago:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7d"
 *     responses:
 *       200:
 *         description: Factura actualizada exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Factura no encontrada
 */


// Ruta para actualizar una factura por su ID
router.put('/:id', actualizarFactura);

/**
 * @swagger
 * /factura/{id}:
 *   get:
 *     summary: Obtiene una factura por su ID
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la factura
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Factura encontrada
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error interno del servidor
 */


// Ruta para obtener una factura por su ID
router.get('/:id', obtenerFacturaPorId);

/**
 * @swagger
 * /factura{id}:
 *   delete:
 *     summary: Elimina una factura por su ID
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la factura
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Factura eliminada exitosamente
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para eliminar una factura por su ID
router.delete('/:id', eliminarFactura);


/**
 * @swagger
 * /factura/generar/{pedidoId}:
 *   post:
 *     summary: Genera una factura desde un pedido
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Factura generada exitosamente
 *       400:
 *         description: El pedido no está en estado realizado
 *       404:
 *         description: Pedido no encontrado
 */
router.post('/generar/:pedidoId', generarFacturaDesdePedido);

/**
 * @swagger
 * /factura/pedido/{pedidoId}:
 *   get:
 *     summary: Busca una factura por ID de pedido
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Factura encontrada
 *       404:
 *         description: No se encontró factura para este pedido
 */
router.get('/pedido/:pedidoId', buscarFacturaPorPedido);


module.exports = router;
