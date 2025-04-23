const express = require('express');
const router = express.Router();
const {
    listarInventarios,
    crearInventario,
    actualizarInventario,
    obtenerInventarioPorId,
    eliminarInventario,
    obtenerInventarioPorProducto
} = require('../Controllers/inventario_controller'); // Importa los controladores

/**
 * @swagger
 * /inventario:
 *   get:
 *     summary: Obtiene todos los inventarios
 *     tags:
 *       - Inventario
 *     responses:
 *       200:
 *         description: Lista de inventarios
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
 *                   stockMinimo:
 *                     type: number
 *                     example: 10
 *                   precioVenta:
 *                     type: number
 *                     example: 199.99
 *                   precioCompra:
 *                     type: number
 *                     example: 150.00
 *                   stock:
 *                     type: number
 *                     example: 50
 *                   stockMaximo:
 *                     type: number
 *                     example: 100
 *                   idProducto:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7a"
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', listarInventarios);

/**
 * @swagger
 * /inventario:
 *   post:
 *     summary: Crea un nuevo inventario
 *     tags:
 *       - Inventario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stockMinimo:
 *                 type: number
 *                 example: 10
 *               precioVenta:
 *                 type: number
 *                 example: 199.99
 *               precioCompra:
 *                 type: number
 *                 example: 150.00
 *               stock:
 *                 type: number
 *                 example: 50
 *               stockMaximo:
 *                 type: number
 *                 example: 100
 *               idProducto:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *     responses:
 *       201:
 *         description: Inventario creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */

router.post('/', crearInventario);

/**
 * @swagger
 * /inventario/{id}:
 *   get:
 *     summary: Obtiene un inventario por su ID
 *     tags:
 *       - Inventario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del inventario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventario encontrado
 *       404:
 *         description: Inventario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id', obtenerInventarioPorId);

/**
 * @swagger
 * /inventario/{id}:
 *   put:
 *     summary: Actualiza un inventario por su ID
 *     tags:
 *       - Inventario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del inventario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stockMinimo:
 *                 type: number
 *                 example: 10
 *               precioVenta:
 *                 type: number
 *                 example: 199.99
 *               precioCompra:
 *                 type: number
 *                 example: 150.00
 *               stock:
 *                 type: number
 *                 example: 50
 *               stockMaximo:
 *                 type: number
 *                 example: 100
 *               idProducto:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *     responses:
 *       200:
 *         description: Inventario actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Inventario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.put('/:id', actualizarInventario);

/**
 * @swagger
 * /inventario/{id}:
 *   delete:
 *     summary: Elimina un inventario por su ID
 *     tags:
 *       - Inventario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del inventario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventario eliminado exitosamente
 *       404:
 *         description: Inventario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', eliminarInventario);

/**
 * @swagger
 * /inventario/por-producto/{idProducto}:
 *   get:
 *     summary: Obtiene el inventario por idProducto
 *     tags:
 *       - Inventario
 *     parameters:
 *       - in: path
 *         name: idProducto
 *         required: true
 *         description: ID del producto para buscar el inventario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventario encontrado
 *       404:
 *         description: Inventario no encontrado para el producto
 *       500:
 *         description: Error interno del servidor
 */

router.get('/por-producto/:idProducto', obtenerInventarioPorProducto);

module.exports = router;
