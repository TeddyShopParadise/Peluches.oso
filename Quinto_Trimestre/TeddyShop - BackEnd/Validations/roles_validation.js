// validaciones/rolesValidation.js
const Joi = require('@hapi/joi');

const rolesSchemaValidation = Joi.object({
    estado: Joi.boolean()
        .required()
        .messages({
            'boolean.base': 'El estado debe ser un valor booleano (true o false)',
            'any.required': 'El estado es un campo requerido'
        }),
    nombre: Joi.string()
        .required()
        .messages({
            'string.base': 'El nombre debe ser un texto',
            'any.required': 'El nombre es un campo requerido'
        }),
    usuarios: Joi.array()
        .items(Joi.string().length(24).hex()) 
        .optional()
        .messages({
            'array.base': 'Los usuarios deben ser un array',
            'string.length': 'Cada ID de usuario debe tener 24 caracteres',
            'string.hex': 'Cada ID de usuario debe ser un ID válido en formato hexadecimal'
        })
});

// Exportar la validación
module.exports = { rolesSchemaValidation };
