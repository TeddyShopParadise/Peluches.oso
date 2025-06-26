// validaciones/metodoPagoValidation.js
const Joi = require('@hapi/joi');

const metodoPagoSchemaValidation = Joi.object({
    nombreMetodoPago: Joi.string()
        .required()
        .messages({
            'string.base': 'El nombre del método de pago debe ser una cadena de texto',
            'any.required': 'El nombre del método de pago es un campo requerido'
        })
});

// Exportar la validación
module.exports = { metodoPagoSchemaValidation };
