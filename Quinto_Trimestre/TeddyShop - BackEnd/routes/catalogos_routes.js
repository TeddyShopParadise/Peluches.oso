const express = require('express');
const catalogoController = require('../Controllers/catalogo_controller');
const router = express.Router();
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
 * /catalogos/activos:
 *   get:
 *     summary: Lista todos los catálogos activos
 *     tags:
 *       - Catálogos
 *     responses:
 *       200:
 *         description: Lista de catálogos activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a75"
 *                   nombreCatalogo:
 *                     type: string
 *                     example: "Verano 2024"
 *                   descripcionCatalogo:
 *                     type: string
 *                     example: "Colección de verano"
 *                   disponibilidadCatalogo:
 *                     type: boolean
 *                     example: true
 *                   imagen:
 *                     type: string
 *                     example: "https://example.com/catalogo.png"
 *                   compania:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a75"
 *                   productos:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["60d2b6e3e6b0f99dbe0c5a76"]
 *       204:
 *         description: No hay catálogos activos
 */

router.get('/activos', catalogoController.listarCatalogosActivos);

//router.use(authorizeAccess('Administrador', 'Empleado'));

/**
 * @swagger
 * /catalogos:
 *   post:
 *     summary: Crea un nuevo catálogo
 *     tags:
 *       - Catálogos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCatalogo:
 *                 type: string
 *                 example: "Verano 2024"
 *               descripcionCatalogo:
 *                 type: string
 *                 example: "Colección de verano con productos destacados"
 *               disponibilidadCatalogo:
 *                 type: boolean
 *                 example: true
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/catalogo.png"
 *               compania:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a75"
 *               productos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60d2b6e3e6b0f99dbe0c5a76", "60d2b6e3e6b0f99dbe0c5a77"]
 *     responses:
 *       201:
 *         description: Catálogo creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       409:
 *         description: Ya existe un catálogo con ese nombre
 */

router.post('/',upload.single('image'), catalogoController.crearCatalogo);

/**
 * @swagger
 * /catalogos/{id}:
 *   put:
 *     summary: Actualiza un catálogo por su ID
 *     tags:
 *       - Catálogos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del catálogo
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCatalogo:
 *                 type: string
 *                 example: "Verano 2024"
 *               descripcionCatalogo:
 *                 type: string
 *                 example: "Colección de verano con productos destacados"
 *               disponibilidadCatalogo:
 *                 type: boolean
 *                 example: true
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/catalogo.png"
 *               compania:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a75"
 *               productos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60d2b6e3e6b0f99dbe0c5a76", "60d2b6e3e6b0f99dbe0c5a77"]
 *     responses:
 *       200:
 *         description: Catálogo actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Catálogo no encontrado
 */

router.put('/:id', catalogoController.actualizarCatalogo);

/**
 * @swagger
 * /catalogos/{id}/desactivar:
 *   patch:
 *     summary: Desactiva un catálogo por su ID
 *     tags:
 *       - Catálogos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del catálogo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catálogo desactivado exitosamente
 *       404:
 *         description: Catálogo no encontrado
 */

router.patch('/:id/desactivar', catalogoController.desactivarCatalogo);

/**
 * @swagger
 * /catalogos/{id}:
 *   get:
 *     summary: Obtiene un catálogo por su ID
 *     tags:
 *       - Catálogos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del catálogo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del catálogo
 *       404:
 *         description: Catálogo no encontrado
 */

router.get('/:id', catalogoController.obtenerCatalogoPorId);

/**
 * @swagger
 * /catalogos/coleccion:
 *   post:
 *     summary: Guarda una colección de catálogos
 *     tags:
 *       - Catálogos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 nombreCatalogo:
 *                   type: string
 *                   example: "Invierno 2024"
 *                 descripcionCatalogo:
 *                   type: string
 *                   example: "Colección de invierno"
 *                 disponibilidadCatalogo:
 *                   type: boolean
 *                   example: true
 *                 imagen:
 *                   type: string
 *                   example: "https://example.com/catalogo.png"
 *                 compania:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a75"
 *                 productos:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["60d2b6e3e6b0f99dbe0c5a76"]
 *     responses:
 *       201:
 *         description: Catálogos guardados exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */

router.post('/coleccion', catalogoController.guardarColeccionCatalogos);

module.exports = router;
