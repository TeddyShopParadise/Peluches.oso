const express = require('express');
const router = express.Router();
const clienteController = require('../Controllers/cliente_controller');
const authorizeAccess = require('../middlewares/authorizeAccess');

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
 * /clientes:
 *   get:
 *     summary: Obtiene todos los clientes
 *     tags:
 *       - Cliente
 *     responses:
 *       200:
 *         description: Lista de clientes
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
 *                   dniCliente:
 *                     type: number
 *                     example: 12345678
 *                   nombreCliente:
 *                     type: string
 *                     example: "Juan"
 *                   telefonoCliente:
 *                     type: string
 *                     example: "987654321"
 *                   apellidoCliente:
 *                     type: string
 *                     example: "Pérez"
 *                   pedidos:
 *                     type: array
 *                     items:
 *                       type: string
 *                   facturas:
 *                     type: array
 *                     items:
 *                       type: string
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', clienteController.listarClientes);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags:
 *       - Cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dniCliente:
 *                 type: number
 *                 example: 12345678
 *               nombreCliente:
 *                 type: string
 *                 example: "Juan"
 *               telefonoCliente:
 *                 type: string
 *                 example: "987654321"
 *               apellidoCliente:
 *                 type: string
 *                 example: "Pérez"
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       409:
 *         description: Ya existe un cliente con este DNI
 *       500:
 *         description: Error interno del servidor
 */


router.post('/', clienteController.crearCliente);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags:
 *       - Cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dniCliente:
 *                 type: number
 *                 example: 12345678
 *               nombreCliente:
 *                 type: string
 *                 example: "Juan"
 *               telefonoCliente:
 *                 type: string
 *                 example: "987654321"
 *               apellidoCliente:
 *                 type: string
 *                 example: "Pérez"
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       409:
 *         description: Ya existe un cliente con este DNI
 *       500:
 *         description: Error interno del servidor
 */


router.get('/:id', clienteController.obtenerClientePorId);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualiza un cliente por su ID
 *     tags:
 *       - Cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dniCliente:
 *                 type: number
 *                 example: 12345678
 *               nombreCliente:
 *                 type: string
 *                 example: "Juan"
 *               telefonoCliente:
 *                 type: string
 *                 example: "987654321"
 *               apellidoCliente:
 *                 type: string
 *                 example: "Pérez"
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Cliente no encontrado
 */


router.put('/:id', clienteController.actualizarCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Elimina un cliente por su ID
 *     tags:
 *       - Cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */


router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;
