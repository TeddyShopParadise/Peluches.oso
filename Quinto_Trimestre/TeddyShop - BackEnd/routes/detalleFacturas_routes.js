const express = require('express');
const router = express.Router();
const {
    listarDetallesFactura,
    crearDetalleFactura,
    actualizarDetalleFactura,
    obtenerDetalleFacturaPorId,
    eliminarDetalleFactura
} = require('../Controllers/DetalleFactura_controller'); // Asegúrate de importar los controladores

/**
 * @swagger
 * /detallesFactura:
 *   get:
 *     summary: Obtiene todos los detalles de factura
 *     tags:
 *       - Detalle Factura
 *     responses:
 *       200:
 *         description: Lista de detalles de factura
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
 *                   precioDetalleFactura:
 *                     type: number
 *                     example: 19.99
 *                   cantidadDetalleFactura:
 *                     type: number
 *                     example: 2
 *                   idInventario:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7a"
 *                   idProducto:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7b"
 *                   idFactura:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7c"
 *       500:
 *         description: Error interno del servidor
 */


router.get('/', listarDetallesFactura);

/**
 * @swagger
 * /detallesFactura:
 *   post:
 *     summary: Crea un nuevo detalle de factura
 *     tags:
 *       - Detalle Factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               precioDetalleFactura:
 *                 type: number
 *                 example: 19.99
 *               cantidadDetalleFactura:
 *                 type: number
 *                 example: 2
 *               idInventario:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *               idProducto:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7b"
 *               idFactura:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7c"
 *     responses:
 *       201:
 *         description: Detalle de factura creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */


router.post('/', crearDetalleFactura);

/**
 * @swagger
 * /detallesFactura/{id}:
 *   put:
 *     summary: Actualiza un detalle de factura por su ID
 *     tags:
 *       - Detalle Factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del detalle de factura
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               precioDetalleFactura:
 *                 type: number
 *                 example: 19.99
 *               cantidadDetalleFactura:
 *                 type: number
 *                 example: 2
 *               idInventario:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *               idProducto:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7b"
 *               idFactura:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7c"
 *     responses:
 *       200:
 *         description: Detalle de factura actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Detalle de factura no encontrado
 */




router.put('/:id', actualizarDetalleFactura);

/**
 * @swagger
 * /detallesFactura/{id}:
 *   get:
 *     summary: Obtiene un detalle de factura por su ID
 *     tags:
 *       - Detalle Factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del detalle de factura
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del detalle de factura
 *       404:
 *         description: Detalle de factura no encontrado
 *       500:
 *         description: Error interno del servidor
 */


router.get('/:id', obtenerDetalleFacturaPorId);

/**
 * @swagger
 * /detallesFactura/{id}:
 *   delete:
 *     summary: Elimina un detalle de factura por su ID
 *     tags:
 *       - Detalle Factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del detalle de factura
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de factura eliminado exitosamente
 *       404:
 *         description: Detalle de factura no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', eliminarDetalleFactura);

module.exports = router;
