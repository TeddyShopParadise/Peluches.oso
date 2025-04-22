//Controlador para Producto
const Inventario = require('../models/inventario_model'); 
const logic = require('../Logic/producto_logic'); 
const Producto = require('../models/producto_model');
const { productoSchemaValidation } = require('../Validations/producto_validation'); 
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid'); 

cloudinary.config({
    cloud_name: 'peluches',    
    api_key: '381838619856281',          
    api_secret: 'K3bBlaVv-cGj1A0LopGfOLstHs4'    
  });

// Controlador para listar todos los productos
const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate('categorias');
        if (!productos) {
          return res.status(404).json({ message: 'No se encontraron productos' });
        }
        res.json(productos);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
      }
};

// Controlador para crear un nuevo producto
const crearProducto = async (req, res) => {
    const body = req.body;
    const { imagen, ...resto } = body;  

    const { error, value } = productoSchemaValidation.validate(resto);

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
        const productoConImagen = { ...value, imagen: imageUrl || imagen };

        const nuevoProducto = await logic.crearProducto(productoConImagen);
        res.status(201).json(nuevoProducto);
    } catch (err) {
        console.error('Error al crear producto:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un producto
const actualizarProducto = async (req, res) => {
    const { id } = req.params; 
    const body = req.body; 

    const { _id, __v, ...cleanedBody } = body; 
    const { error, value } = productoSchemaValidation.validate(cleanedBody); 
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        let imageUrl = value.imagen; 
        if (req.file) {
         
            const result = await cloudinary.uploader.upload(req.file.buffer, {
                public_id: uuidv4(), 
                resource_type: 'auto', 
            });
            imageUrl = result.secure_url;  
        }

        const productoActualizado = await logic.actualizarProducto(id, { ...value, imagen: imageUrl });
        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(productoActualizado);  
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
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
        const resultado = await Inventario.deleteMany({ idProducto: id });
        console.log("Inventarios eliminados:", resultado.deletedCount);
        const productoEliminado = await logic.eliminarProducto(id);
        res.json(productoEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getProductosByCatalogo = async (req, res) => {
    try {
      const { id } = req.params;
      const productos = await Producto.find({ catalogos: id }).populate('categorias');
      res.json(productos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



// Exportar los controladores
module.exports = {
    listarProductos,
    crearProducto,
    actualizarProducto,
    obtenerProductoPorId,
    eliminarProducto,
    getProductosByCatalogo
};
