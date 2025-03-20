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
    fun listarCatalogos(): String {
        if (catalogos.isEmpty()) {
            return "No hay Catalogos disponibles."
        }

        return catalogos.entries.joinToString("\n") {
            "ID: ${it.key}, Nombre: ${it.value.getNombreCatalogo()}, Descripción de Catalogo : ${it.value.getDescripcionCatalogo()}, Disponibilidad de Catalogo : ${it.value.getDisponibilidadCatalogo()}, Estilo de catalogo:  ${it.value.getEstiloCatalogo()}"
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
        val catalogo = catalogos[nombreActual]
        return if (catalogo != null) {
            catalogo.setNombreCatalogo(nuevoNombre)
            catalogo.setDescripcionCatalogo(nuevaDescripcion)
            catalogo.setDisponibilidadCatalogo(nuevaDisponibilidad)
            catalogo.setEstiloCatalogo(nuevoEstilo)

            if (nombreActual != nuevoNombre) {
                catalogos.remove(nombreActual)  // Eliminar entrada antigua
                catalogos[nuevoNombre] = catalogo // Agregar con nuevo nombre
            }

            "Catálogo actualizado con éxito."
        } else {
            "Catálogo no encontrado."
        }
    }


    fun eliminarCatalogo(nombreCatalogo: String): String {
        return if (catalogos.remove(nombreCatalogo) != null) {
            "Catalogo eliminado con éxito."
        } else {
            "Catalogo no encontrado."
        }
    }
}