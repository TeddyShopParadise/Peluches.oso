package Controller.Pedidos
import Models.Pedidos.MetodoPago
import java.util.*
class MetodoPagoController {

    private val metodoPagos = mutableMapOf<String, MetodoPago>()

    //Crear un nuevo Metodo de pago

    fun crearMetodoPago(nombreMetodoPago : String): String {
        val id = UUID.randomUUID().toString()  // Generar ID único
        val metodoPago = MetodoPago(nombreMetodoPago)
        metodoPagos[id] = metodoPago
        return "Metodo de pago creado con éxito."
    }

    //LIstar Metodos de pago
    fun listarMetodoPagos(): String {
        if (metodoPagos.isEmpty()) {
            return "No hay Metodos de Pago disponibles."
        }
        return metodoPagos.entries.joinToString("\n") {
            "ID: ${it.key}, Nombre metodo de pago: ${it.value.getNombreMetodoPago()}"
        }
    }

    //Buscar un Metodo de Pago por ID
    fun buscarMetodoPagoPorId(id: String): String {
        val metodoPago = metodoPagos[id]
        return if (metodoPago != null) {
            " encontrado: Nombre de metodo de pago: ${metodoPago.getNombreMetodoPago()}"
        } else {
            "Metodo de Pago no encontrado."
        }
    }

    // Actualizar un Metodo de Pago por ID
    fun actualizarMetodoPago(id: String): String {
        val metodoPago = metodoPagos[id]
        if (metodoPago != null) {
            println("Ingresa el nuevo Nombre del metodo de pago(actual: ${metodoPago.getNombreMetodoPago()}):")
            val nuevoNombre = readLine()?.toString() ?: metodoPago.getNombreMetodoPago()
            // Actualizar Metodo Pago
            metodoPago.setNombreMetodoPago(nuevoNombre)


            return "Metodo de pago actualizado con éxito."
        } else {
            return "Metodo de pago con ID $id no encontrado."
        }

    }
    //Eliminar un metodo de pago por ID

    fun eliminarMetodoPago(id: String): String {
        return if (metodoPagos.remove(id) != null) {
            "Metodo de Pago eliminado con éxito."
        } else {
            "Metodo de pago no encontrado."
        }
    }


}



