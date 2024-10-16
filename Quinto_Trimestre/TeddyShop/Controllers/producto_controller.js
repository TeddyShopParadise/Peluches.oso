//Logica de el controlador del producto
const logic = require('../Logic/producto_logic'); // Asegúrate de importar la lógica
const { productoSchemaValidation } = require('../Validations/producto_validation'); // Importa la validación

// Controlador para listar todos los productos
const listarProductos = async (req, res) => {
    try {
        const productos = await logic.listarProductos();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo producto
const crearProducto = async (req, res) => {
    const body = req.body;

    const { error, value } = productoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoProducto = await logic.crearProducto(value);
        res.status(201).json(nuevoProducto);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un producto
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = productoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const productoActualizado = await logic.actualizarProducto(id, value);
        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(productoActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un producto por su ID
const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await logic.buscarProductoPorId(id);
        res.json(producto);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un producto por su ID
const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const productoEliminado = await logic.eliminarProducto(id);
        res.json(productoEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarProductos,
    crearProducto,
    actualizarProducto,
    obtenerProductoPorId,
    eliminarProducto
};
