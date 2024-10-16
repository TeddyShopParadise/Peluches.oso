//Logica de el controlador del vendedor
const logic = require('../Logic/vendedor_logic'); // Asegúrate de importar la lógica
const { vendedorSchemaValidation } = require('../Validations/vendedor_validation'); // Importa la validación

// Controlador para listar todos los vendedores
const listarVendedores = async (req, res) => {
    try {
        const vendedores = await logic.listarVendedores();
        res.json(vendedores);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo vendedor
const crearVendedor = async (req, res) => {
    const body = req.body;

    const { error, value } = vendedorSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoVendedor = await logic.crearVendedor(value);
        res.status(201).json(nuevoVendedor);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un vendedor
const actualizarVendedor = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = vendedorSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const vendedorActualizado = await logic.actualizarVendedor(id, value);
        if (!vendedorActualizado) {
            return res.status(404).json({ error: 'Vendedor no encontrado' });
        }
        res.json(vendedorActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un vendedor por su ID
const obtenerVendedorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const vendedor = await logic.buscarVendedorPorId(id);
        res.json(vendedor);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un vendedor por su ID
const eliminarVendedor = async (req, res) => {
    const { id } = req.params;
    try {
        const vendedorEliminado = await logic.eliminarVendedor(id);
        res.json(vendedorEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarVendedores,
    crearVendedor,
    actualizarVendedor,
    obtenerVendedorPorId,
    eliminarVendedor
};
