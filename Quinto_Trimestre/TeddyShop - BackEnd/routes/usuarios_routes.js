const express = require('express');
const router = express.Router();
const {
    listarUsuarios,
    crearUsuario,
    actualizarUsuario,
    obtenerUsuarioPorId,
    eliminarUsuario
} = require('../Controllers/usuario_controller'); // Asegúrate de importar los controladores

//const authorizeAccess = require('../middlewares/authorizeAccess');
//router.use(authorizeAccess('Administrador', 'Empleado'));

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
 * /usuario:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
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
 *                   email:
 *                     type: string
 *                     example: "usuario@example.com"
 *                   username:
 *                     type: string
 *                     example: "usuario1"
 *                   estado:
 *                     type: boolean
 *                     example: true
 *                   empleados:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c3a7b"
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c5a7b"
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', listarUsuarios);

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               contraseña:
 *                 type: string
 *                 example: "miContraseñaSegura"
 *               username:
 *                 type: string
 *                 example: "usuario1"
 *               estado:
 *                 type: boolean
 *                 example: true
 *               empleados:
 *                  type: array
 *                  items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c3a7b"
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7b"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */

router.post('/', crearUsuario);

/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     summary: Actualiza un usuario por su ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               contraseña:
 *                 type: string
 *                 example: "miContraseñaSegura"
 *               username:
 *                 type: string
 *                 example: "usuario1"
 *               estado:
 *                 type: boolean
 *                 example: true
 *               empleados:
 *                  type: array
 *                  items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c3a7b"
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7b"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Usuario no encontrado
 */



router.put('/:id', actualizarUsuario);

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */



router.get('/:id', obtenerUsuarioPorId);

/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', eliminarUsuario);

module.exports = router;