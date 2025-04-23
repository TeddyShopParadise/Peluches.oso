const express = require('express');
const router = express.Router();
const {
    listarMovimientos,
    crearMovimiento,
    actualizarMovimiento,
    obtenerMovimientoPorId,
    eliminarMovimiento
} = require('../Controllers/movimiento_controller'); // Importa los controladores

//const authorizeAccess = require('../middlewares/authorizeAccess');
//router.use(authorizeAccess('Administrador'));

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
 * /movimiento:
 *   get:
 *     summary: Obtiene todos los movimientos
 *     tags:
 *       - Movimientos
 *     responses:
 *       200:
 *         description: Lista de movimientos
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
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-01-01T10:00:00Z"
 *                   cantidadIngreso:
 *                     type: number
 *                     example: 100
 *                   cantidadVendida:
 *                     type: number
 *                     example: 50
 *                   inventario:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7a"
 *       500:
 *         description: Error interno del servidor
 */


router.get('/', listarMovimientos);

/**
 * @swagger
 * /movimiento:
 *   post:
 *     summary: Crea un nuevo movimiento
 *     tags:
 *       - Movimientos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-01-01T10:00:00Z"
 *               cantidadIngreso:
 *                 type: number
 *                 example: 100
 *               cantidadVendida:
 *                 type: number
 *                 example: 50
 *               inventario:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *     responses:
 *       201:
 *         description: Movimiento creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */


router.post('/', crearMovimiento);

/**
 * @swagger
 * /movimiento/{id}:
 *   get:
 *     summary: Obtiene un movimiento por su ID
 *     tags:
 *       - Movimientos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del movimiento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movimiento encontrado
 *       404:
 *         description: Movimiento no encontrado
 *       500:
 *         description: Error interno del servidor
 */


router.get('/:id', obtenerMovimientoPorId);

/**
 * @swagger
 * /movimiento/{id}:
 *   put:
 *     summary: Actualiza un movimiento por su ID
 *     tags:
 *       - Movimientos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del movimiento
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-01-01T10:00:00Z"
 *               cantidadIngreso:
 *                 type: number
 *                 example: 100
 *               cantidadVendida:
 *                 type: number
 *                 example: 50
 *               inventario:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *     responses:
 *       200:
 *         description: Movimiento actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Movimiento no encontrado
 */

router.put('/:id', actualizarMovimiento);

/**
 * @swagger
 * /movimiento/{id}:
 *   delete:
 *     summary: Elimina un movimiento por su ID
 *     tags:
 *       - Movimientos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del movimiento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movimiento eliminado exitosamente
 *       404:
 *         description: Movimiento no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', eliminarMovimiento);

module.exports = router;
