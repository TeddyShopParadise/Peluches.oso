package Controller.Productos

import Models.Productos.Categoria
import java.util.*

class CategoriaController {

    private val categorias = mutableMapOf<String, Categoria>()

    fun crearCategoria(nombre: String, descripcion: String): String {
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

    fun actualizarCategoria(id: String, nuevoNombre: String, nuevaDescripcion: String): String {
        val categoria = categorias[id]
        return if (categoria != null) {
            categoria.setNombreCategoria(nuevoNombre)
            categoria.setDescripcionCategoria(nuevaDescripcion)
            "Categoría actualizada con éxito."
        } else {
            "La categoría con ID: $id no se encontró."
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