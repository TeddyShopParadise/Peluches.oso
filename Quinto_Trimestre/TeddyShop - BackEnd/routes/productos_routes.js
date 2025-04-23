const express = require('express');
const router = express.Router();
const productoController = require('../Controllers/producto_controller');
const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

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
 * /producto:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos
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
 *                   estiloProducto:
 *                     type: string
 *                     example: "Estilo 1"
 *                   disponibilidadProducto:
 *                     type: Number
 *                     example: "Disponible"
 *                   tamañoProducto:
 *                     type: string
 *                     example: "Mediano"
 *                   imagen:
 *                     type: string
 *                     example: "https://example.com/producto.png"
 *                   historialPrecios:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c5a7b"
 *                   catalogos:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c5a7c"
 *                   categorias:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c5a7d"
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', productoController.listarProductos);

//router.use(authorizeAccess('Administrador', 'Empleado'));

/**
 * @swagger
 * /producto:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estiloProducto:
 *                 type: string
 *                 example: "Estilo 1"
 *               disponibilidadProducto:
 *                 type: Number
 *                 example: "Disponible"
 *               tamañoProducto:
 *                 type: string
 *                 example: "Mediano"
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/producto.png"
 *               historialPrecios:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7b"
 *               catalogos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7c"
 *               categorias:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7d"
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */

router.post('/',upload.single('image'), productoController.crearProducto);

/**
 * @swagger
 * /producto/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id', productoController.obtenerProductoPorId);

/**
 * @swagger
 * /producto/{id}:
 *   put:
 *     summary: Actualiza un producto por su ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estiloProducto:
 *                 type: string
 *                 example: "Estilo 1"
 *               disponibilidadProducto:
 *                 type: Number
 *                 example: "Disponible"
 *               tamañoProducto:
 *                 type: string
 *                 example: "Mediano"
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/producto.png"
 *               historialPrecios:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7b"
 *               catalogos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7c"
 *               categorias:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7d"
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Producto no encontrado
 */

router.put('/:id', upload.single('image'), productoController.actualizarProducto);

/**
 * @swagger
 * /producto/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', productoController.eliminarProducto);

/**
 * @swagger
 * /producto/catalogo/{id}:
 *   get:
 *     summary: Obtiene productos por ID de catálogo
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del catálogo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos asociados al catálogo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *       404:
 *         description: No se encontraron productos para este catálogo
 *       500:
 *         description: Error interno del servidor
 */
router.get('/catalogo/:id', productoController.getProductosByCatalogo);


module.exports = router;
