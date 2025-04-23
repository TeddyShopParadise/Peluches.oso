// Eliminar cualquier valor residual de CODESPACE_URL antes de cargar el .env
delete process.env.CODESPACE_URL;

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

// Verificar si estamos en Codespace
const isInCodespace = process.env.CODESPACE_URL !== undefined;

console.log('Is in Codespace?', isInCodespace);
console.log('CODESPACE_URL:', process.env.CODESPACE_URL);

// Configuración básica de Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de TeddyShop',
        version: '1.0.0',
        description: 'Documentación de la API de peluches.oso',
    },
    servers: [
        {
            url: isInCodespace
                ? process.env.CODESPACE_URL // Si estamos en Codespace
                : 'http://localhost:3000/api', // Si estamos en local
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Introduce el token JWT en el formato: Bearer <token>'
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};
