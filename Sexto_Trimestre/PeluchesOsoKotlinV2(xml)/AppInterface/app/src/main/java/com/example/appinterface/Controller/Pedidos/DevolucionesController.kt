package Controller.Pedidos
import Models.Pedidos.Devoluciones
import java.util.*

class DevolucionesController {

    private val devoluciones = mutableMapOf<String, Devoluciones>()

    // Crear una nueva devolucion
    fun crearDevolucion(detalleDevolucion: String): String {
        val id = UUID.randomUUID().toString()
        val devolucion = Devoluciones(detalleDevolucion)

        devoluciones[id] = devolucion
        return "Devolución creada con éxito con el ID: $id"
    }

    // Listar todas las devoluciones
    fun listarDevoluciones(): String {
        if (devoluciones.isEmpty()) {
            return "No hay devoluciones registradas"
        }
        return devoluciones.entries.joinToString("\n") {
            "ID: ${it.key}, Detalles de la Devolución: ${it.value.getDetalleDevolucion()}"
        }
    }

    // Buscar una devolucion por ID
    fun buscarDevolucionPorId(id: String): String {
        val devolucion = devoluciones[id]
        return if (devolucion != null) {
            "Devolución encontrada: Detalles de la Devolución: ${devolucion.getDetalleDevolucion()}"
        } else {
            "Devolución no encontrada."
        }
    }

    // Actualizar una devolucion por ID
    fun actualizarDevolucion(id: String, nuevoDetalleDevolucion: String): String {
        val devolucion = devoluciones[id]
        return if (devolucion != null) {
            devolucion.setDetalleDevolucion(nuevoDetalleDevolucion)
            "Detalles de la devolucion actualizados con éxito."
        } else {
            "La devolución con ID: $id no se encontró."
        }
    }

    // Eliminar una devolucion por ID
    fun eliminarDevolucion(id: String): String {
        return if (devoluciones.remove(id) != null) {
            "Devolución eliminada con éxito."
        } else {
            "La devolución con ID: $id no se encontró."
        }
    }
}
