// validaciones/categoriaValidation.js
const Joi = require('@hapi/joi');

const categoriaSchemaValidation = Joi.object({
    nombreCategoria: Joi.string()
        .min(3)
        .max(100)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ0-9 .#-]+$/)
        .messages({
            'string.base': 'El nombre de la categoría debe ser un texto',
            'string.empty': 'El nombre de la categoría no puede estar vacío',
            'string.min': 'El nombre de la categoría debe tener al menos 3 caracteres',
            'string.max': 'El nombre de la categoría no debe exceder los 100 caracteres',
            'any.required': 'El nombre de la categoría es un campo requerido'
        }),
    descripcionCategoria: Joi.string()
        .max(500)
        .optional()
        .allow('')
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ0-9 .#-]*$/)
        .messages({
            'string.base': 'La descripción de la categoría debe ser un texto',
            'string.max': 'La descripción de la categoría no debe exceder los 500 caracteres'
        }),
        imagen: Joi.string()
        .uri()
        .optional()
        .allow('')
        .pattern(/^https?:\/\/[a-zA-Z0-9\-\.]+\.[a-z]{2,}([\/\w \.-]*)*\/?$/)
        .messages({
            'string.base': 'La imagen debe ser una URL válida',
            'string.uri': 'La imagen debe tener un formato de URL válido'
        }),
    productos: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'array.base': 'Los productos deben ser un arreglo de IDs válidos',
            'string.length': 'Cada ID debe tener 24 caracteres hexadecimales'
        })
});

// Exportar la validación
module.exports = { categoriaSchemaValidation };
