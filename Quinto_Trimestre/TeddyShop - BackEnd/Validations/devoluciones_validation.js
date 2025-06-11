// validaciones/devolucionesValidation.js

const Joi = require('@hapi/joi');

const devolucionesSchemaValidation = Joi.object({
  pedido: Joi.string()
    .length(24)
    .hex()
    .required()
    .messages({
      'string.base': 'El ID del pedido debe ser un texto',
      'string.length': 'El ID del pedido debe tener 24 caracteres',
      'string.hex': 'El ID del pedido debe ser un ID válido en formato hexadecimal',
      'any.required': 'El pedido es un campo requerido'
    }),

  fecha: Joi.date()
    .optional()
    .messages({
      'date.base': 'La fecha debe ser una fecha válida'
    }),

  motivo: Joi.string()
    .min(3)
    .max(200)
    .required()
    .messages({
      'string.base': 'El motivo debe ser un texto',
      'string.min': 'El motivo debe tener al menos 3 caracteres',
      'string.max': 'El motivo no puede exceder los 200 caracteres',
      'any.required': 'El motivo es un campo requerido'
    }),

  items: Joi.array()
    .items(
      Joi.object({
        inventario: Joi.string()
          .length(24)
          .hex()
          .optional()
          .messages({
            'string.base': 'El ID de inventario debe ser un texto',
            'string.length': 'El ID de inventario debe tener 24 caracteres',
            'string.hex': 'El ID de inventario debe ser un ID válido en formato hexadecimal',
            'any.required': 'Cada ítem debe incluir el campo inventario'
          }),
        cantidad: Joi.number()
          .integer()
          .min(1)
          .max(1000)
          .required()
          .messages({
            'number.base': 'La cantidad debe ser un número',
            'number.integer': 'La cantidad debe ser un número entero',
            'number.min': 'La cantidad mínima es 1',
            'number.max': 'La cantidad máxima es 1000',
            'any.required': 'Cada ítem debe incluir la cantidad'
          })
      })
    )
    .min(1)
    .max(50)
    .required()
    .messages({
      'array.base': 'Los ítems deben ser un array',
      'array.min': 'Debe haber al menos un ítem en la devolución',
      'array.max': 'No se pueden devolver más de 50 ítems diferentes',
      'any.required': 'El campo items es obligatorio'
    }),

  estado: Joi.string()
    .valid('cancelado', 'PROCESADA')
    .optional()
    .messages({
      'string.base': 'El estado debe ser un texto',
      'any.only': 'El estado debe ser cancelado o PROCESADA'
    })
});

const consultaDevolucionesValidation = Joi.object({
  pedido: Joi.string()
    .length(24)
    .hex()
    .optional()
    .messages({
      'string.base': 'El ID del pedido debe ser un texto',
      'string.length': 'El ID del pedido debe tener 24 caracteres',
      'string.hex': 'El ID del pedido debe ser un ID válido'
    }),
  fechaDesde: Joi.date()
    .optional()
    .messages({
      'date.base': 'La fecha desde debe ser una fecha válida'
    }),

  fechaHasta: Joi.date()
    .optional()
    .when('fechaDesde', {
      is: Joi.exist(),
      then: Joi.date().min(Joi.ref('fechaDesde')),
      otherwise: Joi.date()
    })
    .messages({
      'date.base': 'La fecha hasta debe ser una fecha válida',
      'date.min': 'La fecha hasta debe ser posterior a la fecha desde'
    })
});

module.exports = {
  devolucionesSchemaValidation,
  consultaDevolucionesValidation,
  
};
