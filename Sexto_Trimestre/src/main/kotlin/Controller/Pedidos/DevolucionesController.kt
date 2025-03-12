package Controller.Pedidos
import Models.Pedidos.Devoluciones
import java.util.*

class DevolucionesController {

    private val devoluciones = mutableMapOf<String, Devoluciones>()

    fun cearDevolucion(): String {
        println("Ingrese el detalle de la Devolucion")
        val detalleDevolucion = readln().toString()

        val id = UUID.randomUUID().toString()
        val devolucion = Devoluciones(detalleDevolucion)

        devoluciones[id] = devolucion
        return "Devolucion creada con exito con el ID: ${id}"
    }

    fun listarDevoluciones(): String {
        if (devoluciones.isEmpty()) {
            return "No hay devoluciones registradas"
        }
        return devoluciones.entries.joinToString  ("\n")  {
            "ID: ${it.key}, Detalles de la Devolucion: ${it.value.getDetalleDevolucion()}"
        }
    }

    fun buscarDevolucionesPorId(id: String) : String {
        val devolucion = devoluciones[id]
        return if (devolucion != null) {
            "Devolucion encontrada: Detalles de la Devolucion: ${devolucion.getDetalleDevolucion()}"
        } else {
            "Devolucion no encontrada."
        }
    }

    fun actualizarDevolucion(id: String) : String {
        val devolucion = devoluciones[id]
        if (devolucion != null) {
            println("Ingrese la nueva descripcion sobre los detalles de la devolución (actual: ${devolucion.getDetalleDevolucion()}):")
            val nuevoDetalleDevolucion = readln()

            devolucion.setDetalleDevolucion(nuevoDetalleDevolucion)

            return "Detalles actualizados con exito"
        } else {
            return "La devolucion con ID: $id no se encontro"
        }
    }

    fun eliminarDevolucion(id: String): String {
        return if (devoluciones.remove(id) != null) {
            "Devolucion eliminada con exito."
        } else {
            "La devolucion con ID: $id no se encontro"
        }
    }
}