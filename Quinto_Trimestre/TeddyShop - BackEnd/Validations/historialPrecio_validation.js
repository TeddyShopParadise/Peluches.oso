// validaciones/historialPrecioValidation.js
const Joi = require('@hapi/joi');

const historialPrecioSchemaValidation = Joi.object({
    precio: Joi.number()
        .precision(3) // Permite hasta dos decimales
        .required()
        .messages({
            'number.base': 'El precio debe ser un número',
            'number.precision': 'El precio debe tener hasta 2 decimales',
            'any.required': 'El precio es un campo requerido'
        }),
    fechaInicio: Joi.date()
        .required()
        .messages({
            'date.base': 'La fecha de inicio debe ser una fecha válida',
            'any.required': 'La fecha de inicio es un campo requerido'
        }),
    fechaFin: Joi.date()
        .min(Joi.ref('fechaInicio')) // La fecha de fin debe ser mayor o igual que la fecha de inicio
        .required()
        .messages({
            'date.base': 'La fecha de fin debe ser una fecha válida',
            'date.min': 'La fecha de fin no puede ser anterior a la fecha de inicio',
            'any.required': 'La fecha de fin es un campo requerido'
        }),
    estadoPrecio: Joi.boolean()
        .required()
        .messages({
            'boolean.base': 'El estado del precio debe ser verdadero o falso',
            'any.required': 'El estado del precio es un campo requerido'
        }),
    producto: Joi.string()
        .length(24)
        .hex()
        .optional()
        .messages({
            'string.base': 'El ID del producto debe ser un ID válido',
            'string.length': 'El ID del producto debe tener 24 caracteres',
            'any.required': 'El ID del producto es un campo requerido'
        })
});

// Exportar la validación
module.exports = { historialPrecioSchemaValidation };
