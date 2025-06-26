const Categoria = require('../models/categoria_model');
const Producto = require('../models/producto_model');

// Función asíncrona para crear una categoría
async function crearCategoria(body) {
    // Verificar si ya existe una categoría con el mismo nombre
    const categoriaExistente = await Categoria.findOne({ nombreCategoria: body.nombreCategoria });

    if (categoriaExistente) {
        throw new Error('Ya existe una categoría con este nombre');
    }

    let categoria = new Categoria({
        nombreCategoria: body.nombreCategoria,
        descripcionCategoria: body.descripcionCategoria,
        imagen: body.imagen,
        productos: body.productos
    });

    return await categoria.save();
}

// Función asíncrona para actualizar una categoría
async function actualizarCategoria(id, body) {
    let categoria = await Categoria.findByIdAndUpdate(id, {
        $set: {
            nombreCategoria: body.nombreCategoria,
            descripcionCategoria: body.descripcionCategoria,
            imagen: body.imagen,
            productos: body.productos
        }
    }, { new: true });

    return categoria;
}

// Función asíncrona para listar todas las categorías
async function listarCategorias() {
    let categorias = await Categoria.find().populate('productos', 'nombreProducto');
    return categorias;
}

// Función asíncrona para buscar una categoría por su ID
async function buscarCategoriaPorId(id) {
    try {
        const categoria = await Categoria.findById(id).populate('productos', 'nombreProducto');
        if (!categoria) {
            throw new Error(`Categoría con ID ${id} no encontrada`);
        }
        return categoria;
    } catch (err) {
        console.error(`Error al buscar la categoría por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar una categoría por su ID
async function eliminarCategoria(id) {
    try {
        const categoria = await Categoria.findByIdAndDelete(id);
        if (!categoria) {
            throw new Error(`Categoría con ID ${id} no encontrada`);
        }
        return categoria;
    } catch (err) {
        console.error(`Error al eliminar la categoría: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearCategoria,
    actualizarCategoria,
    listarCategorias,
    buscarCategoriaPorId,
    eliminarCategoria
};
