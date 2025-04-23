//Controlador para Inventario
const logic = require('../Logic/inventario_logic'); 
const { inventariosSchemaValidation } = require('../Validations/inventario_validation'); 

// Controlador para listar todos los inventarios
const listarInventarios = async (req, res) => {
    try {
        const inventarios = await logic.listarInventarios();
        res.json(inventarios);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo inventario
const crearInventario = async (req, res) => {
    const body = req.body;

    const { error, value } = inventariosSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoInventario = await logic.crearInventario(value);
        res.status(201).json(nuevoInventario);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un inventario
const actualizarInventario = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const { error, value } = inventariosSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const inventarioActualizado = await logic.actualizarInventario(id, value);
        if (!inventarioActualizado) {
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }
        res.json(inventarioActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un inventario por su ID
const obtenerInventarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const inventario = await logic.buscarInventarioPorId(id);
        if (!inventario) {
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }
        res.json(inventario);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un inventario por su ID
const eliminarInventario = async (req, res) => {
    const { id } = req.params;
    try {
        const inventarioEliminado = await logic.eliminarInventario(id);
        if (!inventarioEliminado) {
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }
        res.json(inventarioEliminado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un inventario por el idProducto
const obtenerInventarioPorProducto = async (req, res) => {
    const { idProducto } = req.params; 
    
    try {
        const inventario = await logic.obtenerInventarioPorProducto(idProducto);
        
        if (!inventario) {
            return res.status(404).json({ error: 'Inventario no encontrado para el producto' });
        }
        
        res.json(inventario);
    } catch (err) {
        console.error('Error al obtener inventario por producto:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarInventarios,
    crearInventario,
    actualizarInventario,
    obtenerInventarioPorId,
    eliminarInventario,
    obtenerInventarioPorProducto
};