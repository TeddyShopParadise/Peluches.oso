package Controller.Productos
import Models.Productos.Categoria
import java.util.*

class CategoriaController {

    private val categorias = mutableMapOf<String, Categoria>()

    fun crearCategoria(): String {
        println("Ingrese el nombre de la categoría: ")
        val nombre = readln()

        println("Ingrese la descripción de la categoría: ")
        val descripcion = readln()

        val id = UUID.randomUUID().toString()  // Generar ID único
        val categoria = Categoria(nombre, descripcion)

        categorias[id] = categoria
        return "Categoría creada con éxito."
    }

    fun listarCategorias(): String {
        if (categorias.isEmpty()) {
            return "No hay categorías disponibles."
        }

        return categorias.entries.joinToString("\n") {
            "ID: ${it.key}, Nombre: ${it.value.getNombreCategoria()}, Descripción: ${it.value.getDescripcionCategoria()}"
        }
    }

    fun buscarCategoriaPorId(id: String): String {
        val categoria = categorias[id]
        return if (categoria != null) {
            "Categoría encontrada: Nombre: ${categoria.getNombreCategoria()}, Descripción: ${categoria.getDescripcionCategoria()}"
        } else {
            "Categoría no encontrada."
        }
    }

    fun actualizarCategoria(id: String): String {
        val categoria = categorias[id]
        if (categoria != null) {
            println("Ingrese el nuevo nombre para la categoría (actual: ${categoria.getNombreCategoria()}):")
            val nuevoNombre = readln()

            println("Ingrese la nueva descripción para la categoría (actual: ${categoria.getDescripcionCategoria()}):")
            val nuevaDescripcion = readln()

            categoria.setNombreCategoria(nuevoNombre)
            categoria.setDescripcionCategoria(nuevaDescripcion)

            return "Categoría actualizada con éxito."
        } else {
            return "La categoría con ID: $id no se encontró."
        }
    }

    fun eliminarCategoria(id: String): String {
        return if (categorias.remove(id) != null) {
            "Categoría eliminada con éxito."
        } else {
            "Categoría no encontrada."
        }
    }
}
