const express = require('express');
const router = express.Router();
const {
    listarHistorialPrecios,
    crearHistorialPrecio,
    actualizarHistorialPrecio,
    obtenerHistorialPrecioPorId,
    eliminarHistorialPrecio
} = require('../Controllers/historialPrecio_controller'); // Importa los controladores

const authorizeAccess = require('../middlewares/authorizeAccess');

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
 * /historialPrecio:
 *   get:
 *     summary: Obtiene todos los historiales de precio
 *     tags:
 *       - Historial de Precios
 *     responses:
 *       200:
 *         description: Lista de historiales de precio
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
 *                   precio:
 *                     type: number
 *                     format: decimal
 *                     example: 19.99
 *                   fechaInicio:
 *                     type: string
 *                     format: date
 *                     example: "2024-10-01"
 *                   fechaFin:
 *                     type: string
 *                     format: date
 *                     example: "2024-10-31"
 *                   estadoPrecio:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', listarHistorialPrecios);

//router.use(authorizeAccess('Administrador', 'Empleado'));

/**
 * @swagger
 * /historialPrecio:
 *   post:
 *     summary: Crea un nuevo historial de precio
 *     tags:
 *       - Historial de Precios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               precio:
 *                 type: number
 *                 format: decimal
 *                 example: 19.99
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-01"
 *               fechaFin:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-31"
 *               estadoPrecio:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Historial de precio creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */


router.post('/', crearHistorialPrecio);

/**
 * @swagger
 * /historialPrecio/{id}:
 *   get:
 *     summary: Obtiene un historial de precio por su ID
 *     tags:
 *       - Historial de Precios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del historial de precio
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Historial de precio encontrado
 *       404:
 *         description: Historial de precio no encontrado
 *       500:
 *         description: Error interno del servidor
 */


router.get('/:id', obtenerHistorialPrecioPorId);

/**
 * @swagger
 * /historialPrecio/{id}:
 *   put:
 *     summary: Actualiza un historial de precio por su ID
 *     tags:
 *       - Historial de Precios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del historial de precio
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               precio:
 *                 type: number
 *                 format: decimal
 *                 example: 19.99
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-01"
 *               fechaFin:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-31"
 *               estadoPrecio:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Historial de precio actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Historial de precio no encontrado
 */

router.put('/:id', actualizarHistorialPrecio);

/**
 * @swagger
 * /historialPrecio/{id}:
 *   delete:
 *     summary: Elimina un historial de precio por su ID
 *     tags:
 *       - Historial de Precios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del historial de precio
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Historial de precio eliminado exitosamente
 *       404:
 *         description: Historial de precio no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', eliminarHistorialPrecio);

module.exports = router;
