const express = require('express');
const router = express.Router();
const {
    listarCompañias,
    crearCompañia,
    actualizarCompañia,
    obtenerCompañiaPorId,
    eliminarCompañia
} = require('../Controllers/compañia_controller'); // Asegúrate de importar los controladores

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
 * /Compania:
 *   get:
 *     summary: Obtiene todas las compañías
 *     tags:
 *       - Compañía
 *     responses:
 *       200:
 *         description: Lista de compañías
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
 *                   NIT:
 *                     type: number
 *                     example: 123456789
 *                   telefonoEmpresa:
 *                     type: string
 *                     example: "987654321"
 *                   nombreEmpresa:
 *                     type: string
 *                     example: "Empresa S.A."
 *                   direccionEmpresa:
 *                     type: string
 *                     example: "Calle 123"
 *                   catalogos:
 *                     type: array
 *                     items:
 *                       type: string
 *                   empleados:
 *                     type: array
 *                     items:
 *                       type: string
 *       500:
 *         description: Error interno del servidor
 */


router.get('/', listarCompañias);

//router.use(authorizeAccess('Administrador', 'Empleado'));

/**
 * @swagger
 * /Compania:
 *   post:
 *     summary: Crea una nueva compañía
 *     tags:
 *       - Compañía
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NIT:
 *                 type: number
 *                 example: 123456789
 *               telefonoEmpresa:
 *                 type: string
 *                 example: "987654321"
 *               nombreEmpresa:
 *                 type: string
 *                 example: "Empresa S.A."
 *               direccionEmpresa:
 *                 type: string
 *                 example: "Calle 123"
 *     responses:
 *       201:
 *         description: Compañía creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       409:
 *         description: Ya existe una compañía con este NIT
 *       500:
 *         description: Error interno del servidor
 */


router.post('/', crearCompañia);

/**
 * @swagger
 * /Compania/{id}:
 *   put:
 *     summary: Actualiza una compañía por su ID
 *     tags:
 *       - Compañía
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la compañía
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NIT:
 *                 type: number
 *                 example: 123456789
 *               telefonoEmpresa:
 *                 type: string
 *                 example: "987654321"
 *               nombreEmpresa:
 *                 type: string
 *                 example: "Empresa S.A."
 *               direccionEmpresa:
 *                 type: string
 *                 example: "Calle 123"
 *     responses:
 *       200:
 *         description: Compañía actualizada exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Compañía no encontrada
 */

router.put('/:id', actualizarCompañia);

/**
 * @swagger
 * /Compania/{id}:
 *   get:
 *     summary: Obtiene una compañía por su ID
 *     tags:
 *       - Compañía
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la compañía
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compañía encontrada
 *       404:
 *         description: Compañía no encontrada
 *       500:
 *         description: Error interno del servidor
 */


router.get('/:id', obtenerCompañiaPorId);

/**
 * @swagger
 * /Compania/{id}:
 *   delete:
 *     summary: Elimina una compañía por su ID
 *     tags:
 *       - Compañía
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la compañía
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compañía eliminada exitosamente
 *       404:
 *         description: Compañía no encontrada
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', eliminarCompañia);

module.exports = router;
