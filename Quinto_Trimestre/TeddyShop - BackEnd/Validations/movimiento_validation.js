// validaciones/movimientoValidation.js
const Joi = require('@hapi/joi');

const movimientoSchemaValidation = Joi.object({
    fecha: Joi.date()
        .required()
        .messages({
            'date.base': 'La fecha debe ser un valor válido',
            'any.required': 'La fecha es un campo requerido'
        }),
    cantidadIngreso: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'La cantidad de ingreso debe ser un número entero',
            'number.integer': 'La cantidad de ingreso debe ser un número entero',
            'any.required': 'La cantidad de ingreso es un campo requerido'
        }),
    cantidadVendida: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'La cantidad vendida debe ser un número entero',
            'number.integer': 'La cantidad vendida debe ser un número entero',
            'any.required': 'La cantidad vendida es un campo requerido'
        }),
    inventario: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            'string.base': 'El ID del inventario debe ser un ID válido',
            'string.length': 'El ID del inventario debe tener 24 caracteres',
            'any.required': 'El ID del inventario es un campo requerido'
        })
});

// Exportar la validación
module.exports = { movimientoSchemaValidation };
