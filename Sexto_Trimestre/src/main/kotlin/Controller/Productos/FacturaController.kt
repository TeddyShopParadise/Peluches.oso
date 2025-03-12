package Controller.Productos
import Models.Productos.Factura
import java.util.*

class FacturaController {

    private val facturas = mutableMapOf<String, Factura>()

    fun crearFactura(): String {
        println("Ingrese la fecha de creación de la factura: ")
        val fechaCreacionFactura = readln()

        println("Ingrese la hora de creación de la factura: ")
        val horaCreacionFactura = readln()

        val id = UUID.randomUUID().toString()  // Generar ID único
        val factura = Factura(fechaCreacionFactura, horaCreacionFactura)

        facturas[id] = factura
        return "Factura creada con éxito."
    }

    fun listarFacturas(): String {
        if (facturas.isEmpty()) {
            return "No hay facturas disponibles."
        }

        return facturas.entries.joinToString("\n") {
            "ID: ${it.key}, Fecha de Creación: ${it.value.getFechaCreacionFactura()}, Hora de Creación: ${it.value.getHoraCreacionFacura()}"
        }
    }

    fun buscarFacturaPorId(id: String): String {
        val factura = facturas[id]
        return if (factura != null) {
            "Factura encontrada: Fecha de Creación: ${factura.getFechaCreacionFactura()}, Hora de Creación: ${factura.getHoraCreacionFacura()}"
        } else {
            "Factura no encontrada."
        }
    }

    fun actualizarFactura(id: String): String {
        val factura = facturas[id]
        if (factura != null) {
            println("Ingrese la nueva fecha de creación para la factura (actual: ${factura.getFechaCreacionFactura()}):")
            val nuevaFecha = readln()

            println("Ingrese la nueva hora de creación para la factura (actual: ${factura.getHoraCreacionFacura()}):")
            val nuevaHora = readln()

            factura.setFechaCreacionFacura(nuevaFecha)
            factura.setHoraCreacionFacura(nuevaHora)

            return "Factura actualizada con éxito."
        } else {
            return "La factura con ID: $id no se encontró."
        }
    }

    fun eliminarFactura(id: String): String {
        return if (facturas.remove(id) != null) {
            "Factura eliminada con éxito."
        } else {
            "Factura no encontrada."
        }
    }
}
