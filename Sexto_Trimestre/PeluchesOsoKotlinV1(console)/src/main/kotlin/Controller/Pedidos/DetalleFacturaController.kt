package Controller.Pedidos

import Models.Pedidos.DetalleFactura
import java.util.*

class DetalleFacturaController {

    private val detallesFactura = mutableMapOf<String, DetalleFactura>()

    fun crearDetalleFactura(): String {
        println("Ingrese el número de detalle de la factura: ")
        val numDetalle = readln().toInt()

        println("Ingrese el precio del detalle de la factura: ")
        val precio = readln().toDouble()

        println("Ingrese la cantidad del detalle de la factura: ")
        val cantidad = readln().toInt()

        val id = UUID.randomUUID().toString()
        val detalle = DetalleFactura(numDetalle, precio, cantidad)

        detallesFactura[id] = detalle
        return "Detalle de factura creado con éxito."
    }

    fun listarDetallesFactura(): String {
        if (detallesFactura.isEmpty()) {
            return "No hay detalles de facturas disponibles."
        }
        return detallesFactura.entries.joinToString("\n") {
            "ID: ${it.key}, Número: ${it.value.getNumDetalle()}, Precio: ${it.value.getPrecioDetalleFactura()}, Cantidad: ${it.value.getCantidadDetallePedido()}"
        }
    }

    fun buscarDetalleFacturaPorId(id: String): String {
        val detalle = detallesFactura[id]
        return detalle?.let {
            "Detalle encontrado: Número: ${it.getNumDetalle()}, Precio: ${it.getPrecioDetalleFactura()}, Cantidad: ${it.getCantidadDetallePedido()}"
        } ?: "Detalle de factura no encontrado."
    }

    fun actualizarDetalleFactura(id: String): String {
        val detalle = detallesFactura[id] ?: return "Detalle de factura no encontrado."

        println("Ingrese el nuevo precio del detalle de la factura (actual: ${detalle.getPrecioDetalleFactura()}):")
        val nuevoPrecio = readln().toDouble()

        println("Ingrese la nueva cantidad del detalle de la factura (actual: ${detalle.getCantidadDetallePedido()}):")
        val nuevaCantidad = readln().toInt()

        detallesFactura[id] = DetalleFactura(detalle.getNumDetalle(), nuevoPrecio, nuevaCantidad)
        return "Detalle de factura actualizado con éxito."
    }

    fun eliminarDetalleFactura(id: String): String {
        return if (detallesFactura.remove(id) != null) {
            "Detalle de factura eliminado con éxito."
        } else {
            "Detalle de factura no encontrado."
        }
    }
}
