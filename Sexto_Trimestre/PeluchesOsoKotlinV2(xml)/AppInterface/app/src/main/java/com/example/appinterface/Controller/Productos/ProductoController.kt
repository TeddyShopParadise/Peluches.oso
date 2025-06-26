package Controllers.Productos

import Models.Productos.Producto
import java.util.*

class ProductoController {

    private val productos = mutableMapOf<String, Producto>()

    // Crear un producto
    fun crearProducto(estiloProducto: String, materialProducto: String, tamañoProducto: String, disponibilidadProducto: Boolean): String {
        val id = UUID.randomUUID().toString()  // Generar ID único
        val producto = Producto(estiloProducto, materialProducto, tamañoProducto, disponibilidadProducto)

        productos[id] = producto
        return "Producto creado con éxito."
    }

    // Listar todos los productos
    fun listarProductos(): String {
        if (productos.isEmpty()) {
            return "No hay productos disponibles."
        }

        return productos.entries.joinToString("\n") {
            "ID: ${it.key}, Estilo: ${it.value.getEstiloProducto()}, Material: ${it.value.getMaterialProducto()}, Tamaño: ${it.value.getTamañoProducto()}, Disponibilidad: ${it.value.getDisponibilidadProducto()}"
        }
    }

    // Buscar un producto por ID
    fun buscarProductoPorId(id: String): String {
        val producto = productos[id]
        return if (producto != null) {
            "Producto encontrado: Estilo: ${producto.getEstiloProducto()}, Material: ${producto.getMaterialProducto()}, Tamaño: ${producto.getTamañoProducto()}, Disponibilidad: ${producto.getDisponibilidadProducto()}"
        } else {
            "Producto no encontrado."
        }
    }

    // Actualizar un producto por ID
    fun actualizarProducto(id: String, nuevoEstilo: String, nuevoMaterial: String, nuevoTamaño: String, nuevaDisponibilidad: Boolean): String {
        val producto = productos[id]
        return if (producto != null) {
            producto.setEstiloProducto(nuevoEstilo)
            producto.setMaterialProducto(nuevoMaterial)
            producto.setTamañoProducto(nuevoTamaño)
            producto.setDisponibilidadProducto(nuevaDisponibilidad)

            "Producto actualizado con éxito."
        } else {
            "Producto con ID $id no encontrado."
        }
    }

    // Eliminar un producto por ID
    fun eliminarProducto(id: String): String {
        return if (productos.remove(id) != null) {
            "Producto eliminado con éxito."
        } else {
            "Producto no encontrado."
        }
    }
}
