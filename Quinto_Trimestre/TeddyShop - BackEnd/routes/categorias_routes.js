const express = require('express');
const router = express.Router();
const categoriaController = require('../Controllers/categoria_controller');
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
 * /categorias:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags:
 *       - Categorías
 *     responses:
 *       200:
 *         description: Lista de categorías
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
 *                   nombreCategoria:
 *                     type: string
 *                     example: "Electrónica"
 *                   descripcionCategoria:
 *                     type: string
 *                     example: "Dispositivos electrónicos de consumo"
 *                   imagen:
 *                     type: string
 *                     example: "https://example.com/categoria.png"
 *                   productos:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["60d2b6e3e6b0f99dbe0c5a7a"]
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', categoriaController.listarCategorias);

//router.use(authorizeAccess('Administrador', 'Empleado'));

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags:
 *       - Categorías
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCategoria:
 *                 type: string
 *                 example: "Electrónica"
 *               descripcionCategoria:
 *                 type: string
 *                 example: "Dispositivos electrónicos de consumo"
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/categoria.png"
 *               productos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60d2b6e3e6b0f99dbe0c5a7a"]
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       409:
 *         description: Ya existe una categoría con ese nombre
 */

router.post('/', categoriaController.crearCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Obtiene una categoría por su ID
 *     tags:
 *       - Categorías
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la categoría
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id', categoriaController.obtenerCategoriaPorId);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Actualiza una categoría por su ID
 *     tags:
 *       - Categorías
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCategoria:
 *                 type: string
 *                 example: "Electrónica"
 *               descripcionCategoria:
 *                 type: string
 *                 example: "Dispositivos electrónicos de consumo"
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/categoria.png"
 *               productos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60d2b6e3e6b0f99dbe0c5a7a"]
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Categoría no encontrada
 */

router.put('/:id', categoriaController.actualizarCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Elimina una categoría por su ID
 *     tags:
 *       - Categorías
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;
