package Controller.Pedidos

import Models.Pedidos.DetallePedido
import java.util.*

class DetallePedidoController {

    private val detallesPedido = mutableMapOf<String, DetallePedido>()

    fun crearDetallePedido(numDetalle: Int, precio: Double, cantidad: Int): String {
        val id = UUID.randomUUID().toString()
        val detalle = DetallePedido(numDetalle, precio, cantidad)

        detallesPedido[id] = detalle
        return "Detalle de pedido creado con éxito con ID: $id"
    }

    fun listarDetallesPedido(): String {
        if (detallesPedido.isEmpty()) {
            return "No hay detalles de pedidos disponibles."
        }
        return detallesPedido.entries.joinToString("\n") {
            "ID: ${it.key}, Número: ${it.value.getNumDetallePedido()}, Precio: ${it.value.getPrecioDetallePedido()}, Cantidad: ${it.value.getCantidadDetallePedido()}"
        }
    }

    fun buscarDetallePedidoPorId(id: String): String {
        val detalle = detallesPedido[id]
        return detalle?.let {
            "Detalle encontrado: Número: ${it.getNumDetallePedido()}, Precio: ${it.getPrecioDetallePedido()}, Cantidad: ${it.getCantidadDetallePedido()}"
        } ?: "Detalle de pedido no encontrado."
    }


    fun actualizarDetallePedido(id: String, nuevoPrecio: Double, nuevaCantidad: Int): String {
        val detalle = detallesPedido[id] ?: return "Detalle de pedido no encontrado."

        detallesPedido[id] = DetallePedido(detalle.getNumDetallePedido(), nuevoPrecio, nuevaCantidad)
        return "Detalle de pedido actualizado con éxito."
    }

    fun eliminarDetallePedido(id: String): String {
        return if (detallesPedido.remove(id) != null) {
            "Detalle de pedido eliminado con éxito."
        } else {
            "Detalle de pedido no encontrado."
        }
    }
}
