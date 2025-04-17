const Joi = require('@hapi/joi');

const empleadoSchemaValidation = Joi.object({
    dniEmpleado: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'El DNI del empleado debe ser un número',
            'number.integer': 'El DNI del empleado debe ser un número entero',
            'any.required': 'El DNI del empleado es un campo requerido'
        }),
    telefonoEmpleado: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'El teléfono del empleado debe ser un número',
            'number.integer': 'El teléfono del empleado debe ser un número entero',
            'any.required': 'El teléfono del empleado es un campo requerido'
        }),
    nombreEmpleado: Joi.string()
        .required()
        .messages({
            'string.base': 'El nombre del empleado debe ser un texto',
            'any.required': 'El nombre del empleado es un campo requerido'
        }),
    compania: Joi.string()
        .length(24)
        .hex()
        .optional()
        .messages({
            'string.base': 'El ID de la compañía debe ser un texto en formato hexadecimal',
            'string.length': 'El ID de la compañía debe tener exactamente 24 caracteres',
            'string.hex': 'El ID de la compañía debe ser un valor hexadecimal válido',
            'any.required': 'La compañía es un campo requerido'
        }),
});

// Exportar la validación
module.exports = { empleadoSchemaValidation };
