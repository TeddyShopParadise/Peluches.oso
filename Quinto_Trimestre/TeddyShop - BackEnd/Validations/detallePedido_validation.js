// validaciones/detallePedidoValidation.js
const Joi = require('@hapi/joi');

const detallePedidoSchemaValidation = Joi.object({
    precioDetallePedido: Joi.number()
        //.precision(3) // Permite hasta tres decimales para representar un precio
        .required()
        .messages({
            'number.base': 'El precio del detalle de pedido debe ser un número',
            'number.precision': 'El precio del detalle de pedido debe tener hasta 2 decimales',
            'any.required': 'El precio del detalle de pedido es un campo requerido'
        }),
    cantidadDetallePedido: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'La cantidad del detalle de pedido debe ser un número',
            'number.integer': 'La cantidad del detalle de pedido debe ser un entero',
            'any.required': 'La cantidad del detalle de pedido es un campo requerido'
        }),
        idPedido: Joi.string()
        .length(24)
        .hex()
        .optional()
        .messages({
            'string.base': 'El ID del pedido debe ser un ID válido',
            'string.length': 'El ID del pedido debe tener 24 caracteres',
            'any.required': 'El ID del pedido es un campo requerido'
        }),
    idProducto: Joi.string()
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
module.exports = { detallePedidoSchemaValidation };
