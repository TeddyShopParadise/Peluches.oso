const express = require('express');
const router = express.Router();
const {
    listarRoles,
    crearRol,
    actualizarRol,
    obtenerRolPorId,
    eliminarRol
} = require('../Controllers/roles_controller'); // Importa los controladores

//const authorizeAccess = require('../middlewares/authorizeAccess');

//Pasar los roles permitidos como un solo array
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
 * /roles:
 *   get:
 *     summary: Obtiene todos los roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Lista de roles
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
 *                   estado:
 *                     type: boolean
 *                     example: true
 *                   nombre:
 *                     type: string
 *                     example: "Administrador"
 *                   usuarios:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c5a7b"
 *       500:
 *         description: Error interno del servidor
 */


// Ruta para listar todos los roles
router.get('/', listarRoles);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crea un nuevo rol
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: boolean
 *                 example: true
 *               nombre:
 *                 type: string
 *                 example: "Administrador"
 *               usuarios:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7b"
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */


// Ruta para crear un nuevo rol
router.post('/', crearRol);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtiene un rol por su ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para actualizar un rol por su ID
router.put('/:id', actualizarRol);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Actualiza un rol por su ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol
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
 *                 type: boolean
 *                 example: true
 *               nombre:
 *                 type: string
 *                 example: "Administrador"
 *               usuarios:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7b"
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Rol no encontrado
 */

// Ruta para obtener un rol por su ID
router.get('/:id', obtenerRolPorId);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Elimina un rol por su ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para eliminar un rol por su ID
router.delete('/:id', eliminarRol);

module.exports = router;
