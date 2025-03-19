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
        catalogos[id] = catalogo
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

    // Actualizar un Catalogo por ID
    fun actualizarCatalogo(id: String): String {
        val catalogo = catalogos[id]
        if (catalogo != null) {
            println("Ingresa el nuevo Nombre (actual: ${catalogo.getNombreCatalogo()}):")
            val nuevoNombre = readLine() ?: catalogo.getNombreCatalogo()

            println("Ingresa la nueva descripción(actual: ${catalogo.getDescripcionCatalogo()}):")
            val nuevaDescripcion = readLine() ?: catalogo.getDescripcionCatalogo()

            println("¿Está disponible el catalogo? (true/false, actual: ${catalogo.getDisponibilidadCatalogo()}):")
            val nuevoEstado = readLine()?.toBoolean() ?: catalogo.getDisponibilidadCatalogo()

            println("Ingresa el nuevo etilo del catalogo (actual: ${catalogo.getEstiloCatalogo()}):")
            val nuevoEstilo = readLine() ?: catalogo.getEstiloCatalogo()

            // Actualizar Catalogo
            catalogo.setNombreCatalogo(nuevoNombre)
            catalogo.setDescripcionCatalogo(nuevaDescripcion)
            catalogo.setDisponibilidadCatalogo(nuevoEstado)
            catalogo.setEstiloCatalogo(nuevoEstilo)

            return "Catalogo actualizado con éxito."
        } else {
            return "Catalogo con ID $id no encontrado."
        }
    }

    // Eliminar un Catalogo por ID
    fun eliminarCatalogo(id: String): String {
        return if (catalogos.remove(id) != null) {
            "Catalogo eliminado con éxito."
        } else {
            "Catalogo no encontrado."
        }
    }
}