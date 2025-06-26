package Controller.Pedidos

import Models.Pedidos.Factura
import java.util.*

class FacturaController {

    private val facturas = mutableMapOf<String, Factura>()

    // Crear una nueva factura
    fun crearFactura(fechaCreacionFactura: String, horaCreacionFactura: String, montoTotal: Double): String {
        val id = UUID.randomUUID().toString()
        val factura = Factura(fechaCreacionFactura, horaCreacionFactura, montoTotal)

        facturas[id] = factura
        return "Factura creada con éxito con el ID: $id"
    }

    // Listar todas las facturas
    fun listarFacturas(): String {
        if (facturas.isEmpty()) {
            return "No hay facturas registradas"
        }
        return facturas.entries.joinToString("\n") {
            "ID: ${it.key}, Fecha: ${it.value.getFechaCreacionFactura()}, Hora: ${it.value.getHoraCreacionFactura()}, Monto: ${it.value.getMontoTotal()}"
        }
    }

    // Buscar una factura por ID
    fun buscarFacturaPorId(id: String): String {
        val factura = facturas[id]
        return if (factura != null) {
            "Factura encontrada: Fecha: ${factura.getFechaCreacionFactura()}, Hora: ${factura.getHoraCreacionFactura()}, Monto: ${factura.getMontoTotal()}"
        } else {
            "Factura no encontrada."
        }
    }

    // Actualizar una factura por ID
    fun actualizarFactura(id: String, nuevaFecha: String, nuevaHora: String, nuevoMonto: Double): String {
        val factura = facturas[id]
        return if (factura != null) {
            factura.setFechaCreacionFactura(nuevaFecha)
            factura.setHoraCreacionFactura(nuevaHora)
            factura.setMontoTotal(nuevoMonto)
            "Detalles de la factura actualizados con éxito."
        } else {
            "La factura con ID: $id no se encontró."
        }
    }

    // Eliminar una factura por ID
    fun eliminarFactura(id: String): String {
        return if (facturas.remove(id) != null) {
            "Factura eliminada con éxito."
        } else {
            "La factura con ID: $id no se encontró."
        }
    }
}
