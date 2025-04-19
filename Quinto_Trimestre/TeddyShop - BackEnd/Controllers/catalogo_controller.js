//Controlador para catalogo
const logic = require('../Logic/catalogo_logic');
const { catalogoSchemaValidation } = require('../Validations/catalogo_validation');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid'); 

cloudinary.config({
    cloud_name: 'peluches',    
    api_key: '381838619856281',          
    api_secret: 'K3bBlaVv-cGj1A0LopGfOLstHs4'    
  });

// Controlador para crear un catálogo
const crearCatalogo = async (req, res) => {
    const body = req.body;
    const { imagen, ...resto } = body;  

    const { error, value } = catalogoSchemaValidation.validate(resto);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        let imageUrl = ''; 

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.buffer, {
                public_id: uuidv4(), 
                resource_type: 'auto',  
            });
            imageUrl = result.secure_url; 
        }

        const catalogoConImagen = { 
            ...value, 
            imagen: imageUrl || imagen || '' 
        };

        const nuevoCatalogo = await logic.crearCatalogo(catalogoConImagen);
        res.status(201).json(nuevoCatalogo);
    } catch (err) {
        console.error('Error al crear catálogo:', err);
        
        if (err.message === 'Ya existe un catálogo con este nombre') {
            return res.status(409).json({ error: err.message });
        }
        
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un catálogo
const actualizarCatalogo = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = catalogoSchemaValidation.validate(body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const catalogoActualizado = await logic.actualizarCatalogo(id, value);
        if (!catalogoActualizado) {
            return res.status(404).json({ error: 'Catálogo no encontrado' });
        }
        res.json(catalogoActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para desactivar un catálogo
const desactivarCatalogo = async (req, res) => {
    const { id } = req.params;
    try {
        const catalogoDesactivado = await logic.desactivarCatalogo(id);
        if (!catalogoDesactivado) {
            return res.status(404).json({ error: 'Catálogo no encontrado' });
        }
        res.json(catalogoDesactivado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para listar catálogos activos
const listarCatalogosActivos = async (req, res) => {
    try {
        const catalogosActivos = await logic.listarCatalogosActivos();
        if (catalogosActivos.length === 0) {
            return res.status(204).send(); 
        }
        res.json(catalogosActivos);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para buscar un catálogo por su ID
const obtenerCatalogoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const catalogo = await logic.buscarCatalogoPorId(id);
        if (!catalogo) {
            return res.status(404).json({ error: `Catálogo con ID ${id} no encontrado` });
        }
        res.json(catalogo);
    } catch (err) {
        res.status(500).json({ error: `Error interno del servidor al buscar el catálogo: ${err.message}` });
    }
};

// Controlador para guardar una colección de catálogos
const guardarColeccionCatalogos = async (req, res) => {
    const catalogos = req.body;

    for (let catalogo of catalogos) {
        const { error } = catalogoSchemaValidation.validate(catalogo);
        if (error) {
            return res.status(400).json({
                error: `Error en catálogo "${catalogo.nombreCatalogo}": ${error.details[0].message}`
            });
        }
    }

    try {
        const resultados = await logic.guardarCatalogos(catalogos);
        res.status(201).json({ message: 'Catálogos guardados exitosamente', catalogos: resultados });
    } catch (err) {
        res.status(500).json({
            error: 'Error interno del servidor al guardar catálogos',
            details: err.message
        });
    }
};
// Exportar los controladores
module.exports = {
    crearCatalogo,
    actualizarCatalogo,
    desactivarCatalogo,
    listarCatalogosActivos,
    obtenerCatalogoPorId,
    guardarColeccionCatalogos
};
