const Joi = require('joi');

const inventariosSchemaValidation = Joi.object({
    stock: Joi.number()
        .integer()
        .min(0)
        .max(10000)
        .required()
        .messages({
            'number.base': 'El stock debe ser un número entero',
            'number.min': 'El stock no puede ser negativo',
            'number.max': 'El stock no puede exceder {#limit} unidades',
            'any.required': 'El campo stock es requerido'
        }),

    stockMinimo: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'El stock mínimo debe ser un número entero',
            'number.min': 'El stock mínimo no puede ser negativo',
            'any.required': 'El campo stock mínimo es requerido'
        }),

    stockMaximo: Joi.number()
        .integer()
        .min(Joi.ref('stockMinimo'))
        .max(10000)
        .required()
        .messages({
            'number.base': 'El stock máximo debe ser un número entero',
            'number.min': 'El stock máximo no puede ser menor al stock mínimo',
            'any.required': 'El campo stock máximo es requerido'
        }),

    // Resto de las validaciones permanecen igual
    precioVenta: Joi.number()
        .positive()
        .precision(2)
        .required()
        .messages({
            'number.base': 'El precio de venta debe ser un número',
            'number.positive': 'El precio de venta debe ser mayor a cero',
            'any.required': 'El precio de venta es requerido'
        }),

    precioCompra: Joi.number()
        .positive()
        .precision(2)
        .max(Joi.ref('precioVenta'))
        .required()
        .messages({
            'number.base': 'El precio de compra debe ser un número',
            'number.positive': 'El precio de compra debe ser mayor a cero',
            'number.max': 'El precio de compra no puede ser mayor al precio de venta',
            'any.required': 'El precio de compra es requerido'
        }),

    idProducto: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            'string.length': 'El ID del producto debe tener 24 caracteres',
            'string.hex': 'El ID del producto debe ser hexadecimal',
            'any.required': 'El ID del producto es requerido'
        }),

    // Los campos opcionales permanecen igual
    idDevolucion: Joi.string()
        .length(24)
        .hex()
        .optional(),

    detalleFacturas: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional(),

    movimientos: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
}).options({
    abortEarly: false
});

module.exports = { inventariosSchemaValidation };