// routes/loginRoute.js

const express = require('express');
const { login } = require('../Controllers/login_controller');
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión con las credenciales de un usuario
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@ejemplo.com"
 *               contraseña:
 *                 type: string
 *                 example: "Contraseña123"
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve un token de autenticación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjA1ZDZkMzYwN2JlZmVjYjAxYzk4YjciLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2MjU4MjczMjksImV4cCI6MTYyNTg4MTAzMn0.t3oMySy9IuKjgncABFG1uQNoQg1vnoeKvmyjKQGVaLw"
 *       400:
 *         description: Error en las credenciales proporcionadas (usuario no encontrado o contraseña incorrecta)
 *       500:
 *         description: Error interno del servidor
 */

router.post('/login', login);

module.exports = router;
