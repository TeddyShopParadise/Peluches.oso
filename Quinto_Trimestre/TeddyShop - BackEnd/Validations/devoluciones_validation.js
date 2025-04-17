// validaciones/devolucionesValidation.js
const Joi = require('@hapi/joi');

const devolucionesSchemaValidation = Joi.object({
    detalleDevolucion: Joi.string()
        .required()
        .messages({
            'string.base': 'El detalle de la devolución debe ser un texto',
            'any.required': 'El detalle de la devolución es un campo requerido'
        }),
    inventarios: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional() // Asegura que cada ID de inventario sea un ObjectId válido
        .messages({
            'array.base': 'Los inventarios deben ser un array',
            'string.length': 'Cada ID de inventario debe tener 24 caracteres',
            'string.hex': 'Cada ID de inventario debe ser un ID válido en formato hexadecimal'
        })
});

// Exportar la validación
module.exports = { devolucionesSchemaValidation };
