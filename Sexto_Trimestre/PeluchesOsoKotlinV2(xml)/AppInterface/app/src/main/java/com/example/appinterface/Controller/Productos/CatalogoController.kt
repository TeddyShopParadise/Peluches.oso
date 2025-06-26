package Controller.Productos

import Models.Productos.Catalogo
import Models.Productos.HistorialPrecio
import java.util.*

//import java.util.*

class CatalogoController {
    private val catalogos = mutableMapOf<String, Catalogo>()

    //Crear un nuevo catálogo
    fun crearCatalogo(nombreCatalogo: String, descripcionCatalogo: String, disponibilidadCatalogo: Boolean, estiloCatalogo: String): String {

        val id = UUID.randomUUID().toString()  // Generar ID único
        val catalogo = Catalogo(nombreCatalogo, descripcionCatalogo, disponibilidadCatalogo, estiloCatalogo)
        catalogos[nombreCatalogo] = catalogo
        return "Catalogo  creado con éxito."
    }

    //LIstar Catalogos
    fun listarCatalogos(formatoTexto: Boolean = true): Any {
        return if (formatoTexto) {
            if (catalogos.isEmpty()) "No hay Catálogos disponibles."
            else catalogos.values.joinToString("\n") {
                "Nombre: ${it.getNombreCatalogo()}, Estilo: ${it.getEstiloCatalogo()}, Disponibilidad: ${it.getDisponibilidadCatalogo()}"
            }
        } else {
            catalogos.values.toList()
        }
    }
    //Buscar un Catalogo de precio por ID
    fun buscarCatalogoPorId(id: String): String {
        val catalogo =  catalogos[id]
        return if (catalogo != null) {
            " encontrado: Nombre: ${catalogo.getNombreCatalogo()}, Descripción de Catalogo: ${catalogo.getDescripcionCatalogo()}, Disponibilidad de Catalogo  : ${catalogo.getDisponibilidadCatalogo()}, Estilo del Catalogo : ${catalogo.getEstiloCatalogo()}"
        } else {
            "historial de precio no encontrado."
        }
    }
    fun buscarCatalogoPorNombre(nombre: String): Catalogo? {
        return catalogos[nombre]
    }
    fun actualizarCatalogo(
        nombreActual: String,
        nuevoNombre: String,
        nuevaDescripcion: String,
        nuevaDisponibilidad: Boolean,
        nuevoEstilo: String
    ): String {
        val catalogo = catalogos[nombreActual] ?: return "Catálogo no encontrado"

        // Actualizar campos
        catalogo.apply {
            setDescripcionCatalogo(nuevaDescripcion)
            setDisponibilidadCatalogo(nuevaDisponibilidad)
            setEstiloCatalogo(nuevoEstilo)
        }

        // Manejar cambio de nombre
        if (nombreActual != nuevoNombre) {
            catalogo.setNombreCatalogo(nuevoNombre)
            catalogos.remove(nombreActual)
            catalogos[nuevoNombre] = catalogo
        }

        return "Catálogo actualizado con éxito"
    }

    fun eliminarCatalogo(nombreCatalogo: String): String {
        return if (catalogos.remove(nombreCatalogo) != null) {
            "Catalogo eliminado con éxito."
        } else {
            "Catalogo no encontrado."
        }
    }
}