// validaciones/compañiaValidation.js
const Joi = require('@hapi/joi');

const compañiaSchemaValidation = Joi.object({
    NIT: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'El NIT debe ser un número',
            'number.integer': 'El NIT debe ser un número entero',
            'number.min': 'El NIT debe ser mayor que 0',
            'any.required': 'El NIT es un campo requerido'
        }),
    telefonoEmpresa: Joi.string()
        .required()
        .pattern(/^[0-9]{7,15}$/)
        .messages({
            'string.base': 'El teléfono de la empresa debe ser un texto',
            'string.empty': 'El teléfono de la empresa no puede estar vacío',
            'string.pattern.base': 'El teléfono de la empresa debe tener entre 7 y 15 dígitos',
            'any.required': 'El teléfono de la empresa es un campo requerido'
        }),
    nombreEmpresa: Joi.string()
        .min(3)
        .max(100)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ0-9 .]+$/) 
        .messages({
            'string.base': 'El nombre de la empresa debe ser un texto',
            'string.empty': 'El nombre de la empresa no puede estar vacío',
            'string.min': 'El nombre de la empresa debe tener al menos 3 caracteres',
            'string.max': 'El nombre de la empresa no debe exceder los 100 caracteres',
            'any.required': 'El nombre de la empresa es un campo requerido'
        }),
    direccionEmpresa: Joi.string()
        .min(5)
        .max(150)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ0-9 .,#-]+$/)
        .messages({
            'string.base': 'La dirección de la empresa debe ser un texto',
            'string.empty': 'La dirección de la empresa no puede estar vacía',
            'string.min': 'La dirección de la empresa debe tener al menos 5 caracteres',
            'string.max': 'La dirección de la empresa no debe exceder los 150 caracteres',
            'any.required': 'La dirección de la empresa es un campo requerido'
        }),
    catalogos: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'array.base': 'Los catálogos deben ser un arreglo de IDs válidos',
            'string.length': 'Cada ID debe tener 24 caracteres hexadecimales'
        }),
    empleados: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'array.base': 'Los empleados deben ser un arreglo de IDs válidos',
            'string.length': 'Cada ID debe tener 24 caracteres hexadecimales'
        })
});

// Exportar la validación
module.exports = { compañiaSchemaValidation };
