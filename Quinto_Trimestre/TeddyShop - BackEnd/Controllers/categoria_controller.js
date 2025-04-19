//Controlador para categoria
const logic = require('../Logic/categoria_logic'); 
const { categoriaSchemaValidation } = require('../Validations/categoria_validation'); 

// Controlador para listar todas las categorías
const listarCategorias = async (req, res) => {
    try {
        const categorias = await logic.listarCategorias();
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear una categoría
const crearCategoria = async (req, res) => {
    const body = req.body;

    const { error, value } = categoriaSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevaCategoria = await logic.crearCategoria(value);
        res.status(201).json(nuevaCategoria);
    } catch (err) {
        if (err.message === 'Ya existe una categoría con este nombre') {
            return res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar una categoría
const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = categoriaSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const categoriaActualizada = await logic.actualizarCategoria(id, value);
        if (!categoriaActualizada) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json(categoriaActualizada);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener una categoría por su ID
const obtenerCategoriaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await logic.buscarCategoriaPorId(id);
        res.json(categoria);
    } catch (err) {
        if (err.message.includes('no encontrada')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar una categoría por su ID
const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const categoriaEliminada = await logic.eliminarCategoria(id);
        res.json(categoriaEliminada);
    } catch (err) {
        if (err.message.includes('no encontrada')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
// Exportar los controladores
module.exports = {
    listarCategorias,
    crearCategoria,
    actualizarCategoria,
    obtenerCategoriaPorId,
    eliminarCategoria
};
