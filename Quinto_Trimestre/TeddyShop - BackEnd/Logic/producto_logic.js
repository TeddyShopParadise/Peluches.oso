    const Producto = require('../models/producto_model');
    const HistorialPrecio = require('../models/historialPrecio_model'); 
    const Catalogo = require('../models/catalogo_model'); 
    const Categoria = require('../models/categoria_model'); 

    // Función asíncrona para crear un nuevo producto
    async function crearProducto(body) {
        console.log('HistorialPrecios recibido:', body.historialPrecios);
        const producto = new Producto({
            estiloProducto: body.estiloProducto, 
            disponibilidadProducto: body.disponibilidadProducto,
            tamañoProducto: body.tamañoProducto,
            imagen: body.imagen,
            historialPrecios: body.historialPrecios || [],
            catalogos: body.catalogos || [],
            categorias: body.categorias || []
        });

        return await producto.save();
    }

    // Función asíncrona para actualizar un producto
    async function actualizarProducto(id, body) {
        console.log('HistorialPrecios recibido:', body.historialPrecios);
        const producto = await Producto.findByIdAndUpdate(id, {
            
            $set: {
                estiloProducto: body.estiloProducto,
                disponibilidadProducto: body.disponibilidadProducto,
                tamañoProducto: body.tamañoProducto,
                imagen: body.imagen,
                historialPrecios: body.historialPrecios || [],
                catalogos: body.catalogos || [],
                categorias: body.categorias || []
            }
        }, { new: true });

        return producto;
    }

    // Función asíncrona para listar todos los productos
    async function listarProductos() {
        const productos = await Producto.find()
            .populate('historialPrecios')
            .populate('catalogos')
            .populate('categorias');
            
        return productos;
    }

    // Función asíncrona para buscar un producto por su ID
    async function buscarProductoPorId(id) {
        try {
            const producto = await Producto.findById(id)
                .populate('historialPrecios')
                .populate('catalogos')
                .populate('categorias');

            if (!producto) {
                throw new Error(`Producto con ID ${id} no encontrado`);
            }
            return producto;
        } catch (err) {
            console.error(`Error al buscar el producto por ID: ${err.message}`);
            throw err;
        }
    }

    // Función asíncrona para eliminar un producto por su ID
    async function eliminarProducto(id) {
        try {
            const producto = await Producto.findByIdAndDelete(id);
            if (!producto) {
                throw new Error(`Producto con ID ${id} no encontrado`);
            }
            return producto;
        } catch (err) {
            console.error(`Error al eliminar el producto: ${err.message}`);
            throw err;
        }
    }


    // Función para incrementar el contador de clics
    async function incrementarClickCount(id) {
        try {
          const producto = await Producto.findByIdAndUpdate(
            id,
            { $inc: { clickCount: 1 } },
            { new: true }
          );

          if (!producto) {
            throw new Error('Producto no encontrado');
          }

          return producto;
        } catch (err) {
          console.error(`Error al incrementar clics: ${err.message}`);
          throw err;
        }
      }

      // Función para obtener productos populares
      async function obtenerProductosPopulares(limite = 8) {
        try {
          const productos = await Producto.find()
            .sort({ clickCount: -1 })
            .limit(limite)
            .populate('historialPrecios');
        
          return productos;
        } catch (err) {
          console.error(`Error al obtener productos populares: ${err.message}`);
          throw err;
        }
    }

    module.exports = {
        crearProducto,
        actualizarProducto,
        listarProductos,
        buscarProductoPorId,
        eliminarProducto,
        incrementarClickCount,
        obtenerProductosPopulares
    };
