package Controllers.Productos

import Models.Productos.Producto
import java.util.*

class ProductoController {

    private val productos = mutableMapOf<String, Producto>()

    // Crear un producto
    fun crearProducto(): String {
        println("Ingresa el estilo del producto:")
        val estiloProducto = readLine() ?: ""

        println("Ingresa el material del producto:")
        val materialProducto = readLine() ?: ""

        println("Ingresa el tamaño del producto:")
        val tamañoProducto = readLine() ?: ""

        println("¿Está disponible el producto? (true/false):")
        val disponibilidadProducto = readLine()?.toBoolean() ?: false

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
    fun actualizarProducto(id: String): String {
        val producto = productos[id]
        if (producto != null) {
            println("Ingresa el nuevo estilo del producto (actual: ${producto.getEstiloProducto()}):")
            val nuevoEstilo = readLine() ?: producto.getEstiloProducto()

            println("Ingresa el nuevo material del producto (actual: ${producto.getMaterialProducto()}):")
            val nuevoMaterial = readLine() ?: producto.getMaterialProducto()

            println("Ingresa el nuevo tamaño del producto (actual: ${producto.getTamañoProducto()}):")
            val nuevoTamaño = readLine() ?: producto.getTamañoProducto()

            println("¿Está disponible el producto? (true/false, actual: ${producto.getDisponibilidadProducto()}):")
            val nuevaDisponibilidad = readLine()?.toBoolean() ?: producto.getDisponibilidadProducto()

            // Actualizar producto
            producto.setEstiloProducto(nuevoEstilo)
            producto.setMaterialProducto(nuevoMaterial)
            producto.setTamañoProducto(nuevoTamaño)
            producto.setDisponibilidadProducto(nuevaDisponibilidad)

            return "Producto actualizado con éxito."
        } else {
            return "Producto con ID $id no encontrado."
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
