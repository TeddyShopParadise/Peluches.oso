//Semillas del producto

const Producto = require('../models/producto_model'); 

const productoSeed = {
  estiloProducto: 'Clásico', // Estilo del producto 
  materialProducto: 'Algodón', // Material del producto
  disponibilidadProducto: 'En stock', // Disponibilidad del producto
  tamañoProducto: 'Grande', // Tamaño del producto
  imagen: ' ',
  historialPrecios: [], // Aquí puedes agregar IDs de historial de precios si los tienes
  catalogos: [], // Aquí puedes agregar IDs de catálogos si los tienes
  categorias: [] // Aquí puedes agregar IDs de categorías si los tienes
};

// Verificar si el producto ya existe
Producto.findOne({ estiloProducto: productoSeed.estiloProducto, materialProducto: productoSeed.materialProducto })
  .then(existingProducto => {
    if (existingProducto) {
      throw new Error(`El producto "${productoSeed.estiloProducto}" ya existe.`);
    } else {
      return Producto.create(productoSeed);
    }
  })
  .then(() => console.log('Producto insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = productoSeed;
