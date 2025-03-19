package Controller.Pedidos

import Models.Pedidos.DetalleFactura
import java.util.*

class DetalleFacturaController {

    private val detallesFactura = mutableMapOf<String, DetalleFactura>()

    // Crear un nuevo detalle de factura con número de factura
    fun crearDetalleFactura(numFactura: Int, numDetalle: Int, precio: Double, cantidad: Int): String {
        val id = UUID.randomUUID().toString()
        val detalle = DetalleFactura(numFactura, numDetalle, precio, cantidad)

        detallesFactura[id] = detalle
        return "Detalle de factura creado con éxito con el ID: $id"
    }

    // Listar todos los detalles de factura
    fun listarDetallesFactura(): String {
        if (detallesFactura.isEmpty()) {
            return "No hay detalles de facturas disponibles."
        }
        return detallesFactura.entries.joinToString("\n") {
            "ID: ${it.key}, Número Factura: ${it.value.getNumFactura()}, Número Detalle: ${it.value.getNumDetalle()}, Precio: ${it.value.getPrecioDetalleFactura()}, Cantidad: ${it.value.getCantidadDetallePedido()}"
        }
    }

    // Buscar un detalle de factura por ID
    fun buscarDetalleFacturaPorId(id: String): String {
        val detalle = detallesFactura[id]
        return if (detalle != null) {
            "Detalle encontrado: Número Factura: ${detalle.getNumFactura()}, Número Detalle: ${detalle.getNumDetalle()}, Precio: ${detalle.getPrecioDetalleFactura()}, Cantidad: ${detalle.getCantidadDetallePedido()}"
        } else {
            "Detalle de factura no encontrado."
        }
    }

    // Actualizar un detalle de factura por ID
    fun actualizarDetalleFactura(id: String, nuevoPrecio: Double, nuevaCantidad: Int): String {
        val detalle = detallesFactura[id]
        return if (detalle != null) {
            detallesFactura[id] = DetalleFactura(detalle.getNumFactura(), detalle.getNumDetalle(), nuevoPrecio, nuevaCantidad)
            "Detalle de factura actualizado con éxito."
        } else {
            "El detalle de factura con ID: $id no se encontró."
        }
    }

    // Eliminar un detalle de factura por ID
    fun eliminarDetalleFactura(id: String): String {
        return if (detallesFactura.remove(id) != null) {
            "Detalle de factura eliminado con éxito."
        } else {
            "El detalle de factura con ID: $id no se encontró."
        }
    }
}
