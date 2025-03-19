package Controller.Productos

import Models.Productos.Movimiento
import java.util.*

class MovimientoController {

    private val movimientos = mutableMapOf<String, Movimiento>()

    // Crear un movimiento
    fun crearMovimiento(fecha: String, cantidadIngreso: Int, cantidadVendida: Int): String {
        val id = UUID.randomUUID().toString()
        val movimiento = Movimiento(fecha, cantidadIngreso, cantidadVendida)

        movimientos[id] = movimiento
        return "Movimiento creado con éxito."
    }

    // Listar todos los movimientos
    fun listarMovimientos(): String {
        if (movimientos.isEmpty()) {
            return "No hay movimientos disponibles."
        }

        return movimientos.entries.joinToString("\n") {
            "ID: ${it.key}, Fecha: ${it.value.getFecha()}, Cantidad Ingreso: ${it.value.getCantidadIngreso()}, Cantidad Salida: ${it.value.getCantidadVendida()}"
        }
    }

    // Buscar un movimiento por ID
    fun buscarMovimientoPorId(id: String): String {
        val movimiento = movimientos[id]
        return if (movimiento != null) {
            "Movimiento encontrado: Fecha: ${movimiento.getFecha()}, Cantidad Ingreso: ${movimiento.getCantidadIngreso()}, Cantidad Salida: ${movimiento.getCantidadVendida()}"
        } else {
            "Movimiento no encontrado."
        }
    }

    // Actualizar un movimiento por ID
    fun actualizarMovimiento(id: String, nuevaFecha: String, nuevaCantidadIngreso: Int, nuevaCantidadSalida: Int): String {
        val movimiento = movimientos[id]
        return if (movimiento != null) {
            movimiento.setFecha(nuevaFecha)
            movimiento.setCantidadIngreso(nuevaCantidadIngreso)
            movimiento.setCantidadVendida(nuevaCantidadSalida)
            "Movimiento actualizado con éxito."
        } else {
            "El movimiento con ID: $id no se encontró."
        }
    }

    // Eliminar un movimiento por ID
    fun eliminarMovimiento(id: String): String {
        return if (movimientos.remove(id) != null) {
            "Movimiento eliminado con éxito."
        } else {
            "Movimiento no encontrado."
        }
    }
}