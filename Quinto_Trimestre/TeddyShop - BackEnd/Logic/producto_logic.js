const Producto = require('../models/producto_model');
const HistorialPrecio = require('../models/historialPrecio_model'); 
const Catalogo = require('../models/catalogo_model'); 
const Categoria = require('../models/categoria_model'); 
const Inventario = require('../models/inventario_model'); 
const Movimiento = require('../models/movimiento_model'); 
const { eliminarMovimiento } = require('./movimiento_logic'); 
const { eliminarInventario } = require('./inventario_logic');

// Función asíncrona para crear un nuevo producto
async function crearProducto(body) {
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
async function eliminarProducto(idProducto) {
    console.log(`Iniciando eliminación del producto con ID: ${idProducto}`);
    
    try {
        const producto = await Producto.findById(idProducto);
        if (!producto) {
            console.log(`Producto con ID ${idProducto} no encontrado`);
            return {
                exito: false,
                mensaje: 'Producto no encontrado',
                resumen: 'Producto no existe en la base de datos'
            };
        }
                
        const inventarios = await Inventario.find({ idProducto: idProducto });
        
        let totalMovimientosEliminados = 0;
        let totalInventariosEliminados = 0;
        
        for (const inventario of inventarios) {
            
            const movimientosEliminados = await Movimiento.deleteMany({ 
                inventario: inventario._id.toString() 
            });
            
            if (movimientosEliminados.deletedCount === 0) {
                const movimientosEliminados2 = await Movimiento.deleteMany({ 
                    inventario: inventario._id 
                });
                totalMovimientosEliminados += movimientosEliminados2.deletedCount;
            } else {
                totalMovimientosEliminados += movimientosEliminados.deletedCount;
            }
            
            await Inventario.findByIdAndDelete(inventario._id);
            totalInventariosEliminados++;
        }
        
        const inventariosValidos = await Inventario.find({}, '_id');
        const idsInventariosValidos = inventariosValidos.map(inv => inv._id.toString());
        
        const todosMovimientos = await Movimiento.find({});
        const movimientosOrfanos = todosMovimientos.filter(mov => {
            if (!mov.inventario) return true;
            return !idsInventariosValidos.includes(mov.inventario.toString());
        });
        
        if (movimientosOrfanos.length > 0) {
            for (const movOrfano of movimientosOrfanos) {
                await Movimiento.findByIdAndDelete(movOrfano._id);
                totalMovimientosEliminados++;
            }
        }
        
        await Producto.findByIdAndDelete(idProducto);
        
        const resumen = `Producto eliminado: ${totalInventariosEliminados} inventarios eliminados, ${totalMovimientosEliminados} movimientos eliminados`;
        
        return {
            exito: true,
            mensaje: 'Producto eliminado exitosamente',
            resumen: resumen,
            detalles: {
                productoEliminado: true,
                productoCodigo: producto.estiloProducto,
                inventariosEliminados: totalInventariosEliminados,
                movimientosEliminados: totalMovimientosEliminados
            }
        };
        
    } catch (error) {
        console.error('Error durante la eliminación del producto:', error);
        return {
            exito: false,
            mensaje: 'Error durante la eliminación',
            error: error.message,
            resumen: 'Eliminación fallida debido a error interno'
        };
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