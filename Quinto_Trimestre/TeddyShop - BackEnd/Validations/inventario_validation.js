const Joi = require('joi');

const inventariosSchemaValidation = Joi.object({
  stockMinimo: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'El stock mínimo debe ser un número entero',
      'number.min': 'El stock mínimo no puede ser negativo',
      'any.required': 'El stock mínimo es requerido'
    }),

  stock: Joi.number()
    .integer()
    .greater(Joi.ref('stockMinimo'))
    .max(10000)
    .required()
    .messages({
      'number.base': 'El stock inicial debe ser un número entero',
      'number.greater': 'El stock inicial debe ser mayor que el stock mínimo',
      'number.max': `El stock inicial no puede exceder {#limit} unidades`,
      'any.required': 'El stock inicial es requerido'
    }),

  stockMaximo: Joi.number()
    .integer()
    .min(Joi.ref('stock'))
    .max(10000)
    .required()
    .messages({
      'number.base': 'El stock máximo debe ser un número entero',
      'number.min': 'El stock máximo no puede ser menor al stock inicial',
      'any.required': 'El stock máximo es requerido'
    }),

 precioCompra: Joi.alternatives([
  Joi.string().pattern(/^[\d.,]+$/),
  Joi.number().positive()
])
.required()
.messages({
  'alternatives.match': 'Precio de compra inválido (ej: 128000 o 128.000,50)',
  'any.required': 'El precio de compra es requerido'
}),

precioVenta: Joi.alternatives([
  Joi.string().pattern(/^[\d.,]+$/),
  Joi.number().positive()
])
.required()
.messages({
  'alternatives.match': 'Precio de venta inválido (ej: 128000 o 128.000,50)',
  'any.required': 'El precio de venta es requerido'
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
})
  .custom((obj, helpers) => {
    const compra = parseFloat(obj.precioCompra);
    const venta  = parseFloat(obj.precioVenta);
    if (venta <= compra) {
      return helpers.error('any.custom', { message: 'El precio de venta debe ser mayor que el precio de compra' });
    }
    return obj;
  })
  .options({ abortEarly: false });

module.exports = { inventariosSchemaValidation };
