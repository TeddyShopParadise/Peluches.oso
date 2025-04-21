const Catalogo = require('../models/catalogo_model');
const Producto = require('../models/producto_model');

// Función asíncrona para crear un catálogo
async function crearCatalogo(body) {
    // Verificar si ya existe un catálogo con el mismo nombre
    const catalogoExistente = await Catalogo.findOne({ nombreCatalogo: body.nombreCatalogo });

    if (catalogoExistente) {
        throw new Error('Ya existe un catálogo con este nombre');
    }

    let catalogo = new Catalogo({
        nombreCatalogo: body.nombreCatalogo,
        descripcionCatalogo: body.descripcionCatalogo,
        disponibilidadCatalogo: body.disponibilidadCatalogo,
        imagen: body.imagen,
        compania: body.compania,
        productos: body.productos,
    });

    return await catalogo.save();
}

// Función asíncrona para actualizar un catálogo
async function actualizarCatalogo(id, body) {
    let catalogo = await Catalogo.findByIdAndUpdate(id, {
        $set: {
            nombreCatalogo: body.nombreCatalogo,
            descripcionCatalogo: body.descripcionCatalogo,
            disponibilidadCatalogo: body.disponibilidadCatalogo,
            imagen: body.imagen,
            compania: body.compania,
            productos: body.productos,
        }
    }, { new: true });

    return catalogo;
}

// Función asíncrona para desactivar un catálogo (cambiar su disponibilidad)
async function desactivarCatalogo(id) {
    let catalogo = await Catalogo.findByIdAndUpdate(id, {
        $set: {
            disponibilidadCatalogo: false
        }
    }, { new: true });

    return catalogo;
}

// Función asíncrona para listar catálogos activos
async function listarCatalogosActivos() {
    let catalogos = await Catalogo.find({ disponibilidadCatalogo: true })
    .populate('compania', 'nombreEmpresa'); 
    return catalogos;
}

// Función asíncrona para buscar un catálogo por su ID
async function buscarCatalogoPorId(id) {
    try {
        const catalogo = await Catalogo.findById(id)
            .populate('compania', 'nombreEmpresa') 
        if (!catalogo) {
            throw new Error(`Catálogo con ID ${id} no encontrado`);
        }
        return catalogo;
    } catch (err) {
        console.error(`Error al buscar el catálogo por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para guardar una colección de catálogos
async function guardarCatalogos(catalogos) {
    try {
        const resultados = [];
        for (let catalogoData of catalogos) {
            const catalogoExistente = await Catalogo.findOne({ nombreCatalogo: catalogoData.nombreCatalogo });
            if (!catalogoExistente) {
                let nuevoCatalogo = new Catalogo(catalogoData);
                let catalogoGuardado = await nuevoCatalogo.save();
                resultados.push(catalogoGuardado);
            } else {
                console.log(`El catálogo con nombre "${catalogoData.nombreCatalogo}" ya existe.`);
            }
        }
        return resultados;
    } catch (err) {
        console.error('Error al guardar la colección de catálogos:', err);
        throw err;
    }
}

module.exports = {
    crearCatalogo,
    actualizarCatalogo,
    desactivarCatalogo,
    listarCatalogosActivos,
    buscarCatalogoPorId,
    guardarCatalogos
};
