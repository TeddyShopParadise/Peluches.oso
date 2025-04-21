// validaciones/clienteValidation.js
const Joi = require('@hapi/joi');

const clienteSchemaValidation = Joi.object({
    nombreCliente: Joi.string()
    .trim()
    .pattern(/^\S+\s+\S+.*$/) 
    .required()
    .messages({
      'string.pattern.base': 'Debe ingresar al menos nombre y apellido.',
      'string.empty': 'El nombre es obligatorio.'
    }),
        telefonoCliente: Joi.string()
        .required()
        .min(7)
        .max(20)
        .pattern(/^[0-9+\-() ]+$/)
        .messages({
            'string.base': 'El teléfono del cliente debe ser un texto',
            'string.empty': 'El teléfono del cliente no puede estar vacío',
            'string.min': 'El teléfono del cliente debe tener al menos 7 caracteres',
            'string.max': 'El teléfono del cliente no debe exceder los 20 caracteres',
            'string.pattern.base': 'El teléfono del cliente contiene caracteres no permitidos',
            'any.required': 'El teléfono del cliente es un campo requerido'
        }),
    
    pedidos: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'array.base': 'Los pedidos deben ser un arreglo de IDs válidos',
            'string.length': 'Cada ID debe tener 24 caracteres hexadecimales'
        }),
    facturas: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'array.base': 'Las facturas deben ser un arreglo de IDs válidos',
            'string.length': 'Cada ID debe tener 24 caracteres hexadecimales'
        })
});

// Exportar la validación
module.exports = { clienteSchemaValidation };
