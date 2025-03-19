package Controller.Productos
import Models.Productos.Movimiento
import java.util.*

class MovimientoController {

    private val movimientos = mutableMapOf<String, Movimiento>()

    fun crearMovimiento(): String {
        println("Ingrese la fecha del movimiento: ")
        val fecha = readln()

        println("Ingrese la cantidad de ingreso")
        val cantidadIngreso = readln().toInt()

        println("Ingrese la cantidad de salida")
        val cantidadVendida = readln().toInt()

        val id = UUID.randomUUID().toString()  // Generar ID único
        val movimiento = Movimiento(fecha, cantidadIngreso, cantidadVendida)

        movimientos[id] = movimiento
        return "Movimiento creado con exito."
    }

    fun listarMovimientos(): String {
        if (movimientos.isEmpty()) {
            return "No hay movimientos disponibles"
        }

        return movimientos.entries.joinToString  ("\n")  {
            "ID: ${it.key}, Fecha: ${it.value.getFecha()}, Cantidad Ingreso: ${it.value.getCantidadIngreso()}, Cantidad Salida: ${it.value.getCantidadVendida()}"
        }
    }

    fun buscarMovimientoPorId(id: String) : String {
        val movimiento = movimientos[id]
        return if (movimiento != null) {
            "Movimiento encontrado: Fecha: ${movimiento.getFecha()}, Cantidad Ingreso: ${movimiento.getCantidadIngreso()}, Cantidad Salida: ${movimiento.getCantidadVendida()}"
        } else {
            "Movmiento no encontrado."
        }
    }

    fun actualizarMovimiento(id: String): String {
        val movimiento = movimientos[id]
        if(movimiento != null) {
            println("Ingrese la nueva fecha para el movimiento (actual: ${movimiento.getFecha()}):")
            val nuevaFecha = readln()

            println("Ingrese la nueva cantidad de ingreso: (actual: ${movimiento.getCantidadIngreso()}):")
            val nuevaCantidadIngreso = readln().toInt()

            println("Ingrese la nueva cantidad de salida (actual: ${movimiento.getCantidadVendida()}):")
            val nuevaCantidadSalida = readln().toInt()

            movimiento.setFecha(nuevaFecha)
            movimiento.setCantidadIngreso(nuevaCantidadIngreso)
            movimiento.setCantidadVendida(nuevaCantidadSalida)

            return "Movimiento actualizado con exito."
        } else {
            return "El movimiento con ID: $id no se encontro"
        }
    }

    fun eliminarMovimiento(id: String): String {
        return if (movimientos.remove(id) != null) {
            "Movimiento eliminado con exito."
        } else {
            "Producto no encontrado"
        }
    }
}