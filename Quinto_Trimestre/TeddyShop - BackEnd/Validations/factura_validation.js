// validaciones/facturaValidation.js
const Joi = require('@hapi/joi');

const facturaSchemaValidation = Joi.object({

    fechaCreacionFactura: Joi.string()
        .required()
        .messages({
            'date.base': 'La fecha de creación de la factura debe ser una fecha válida',
            'any.required': 'La fecha de creación de la factura es un campo requerido'
        }),
        horaCreacionFactura: Joi.string()
        .pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])\s?(a\.?m\.?|p\.?m\.?)?$/) // Acepta AM/PM
        .required()
        .messages({
            'string.base': 'La hora de creación de la factura debe ser un texto',
            'string.pattern.base': 'La hora de creación de la factura debe estar en formato HH:MM:SS (con AM/PM opcional)',
            'any.required': 'La hora de creación de la factura es un campo requerido'
        }),    
    pedido: Joi.string()
        .length(24)
        .hex()
        .optional()
        .messages({
            'string.base': 'El ID del pedido debe ser un ID válido en formato hexadecimal',
            'string.length': 'El ID del pedido debe tener 24 caracteres',
            'any.required': 'El pedido es un campo requerido'
        }),
    cliente: Joi.string()
        .length(24)
        .hex()
        .messages({
            'string.length': 'El ID del cliente debe tener 24 caracteres',
        }),
    detallesFactura: Joi.array().items(Joi.string().length(24).hex()).optional()
        .messages({
            'array.base': 'Los detalles de la factura deben ser un array de IDs válidos',
            'string.length': 'Cada ID de detalle de factura debe tener 24 caracteres'
        }),
    metodoPago: Joi.string()
        .length(24)
        .hex()
        .optional()
        .messages({
            'string.base': 'El ID del método de pago debe ser un ID válido en formato hexadecimal',
            'string.length': 'El ID del método de pago debe tener 24 caracteres'
        }),
});

// Exportar la validación
module.exports = { facturaSchemaValidation };