package Controller.Productos

import Models.Productos.HistorialPrecio
import android.icu.text.DateFormat
import java.util.*

class HistorialPrecioController {

    private val historialPrecios = mutableMapOf<String, HistorialPrecio>()

    //Crear un historialPrecio
    fun crearHistorialPrecio(precio: Double, fechaInicio: String, fechaFin: String, estadoPrecio: Boolean): String {
        val id = UUID.randomUUID().toString()  // Generar ID único
        val historialPrecio = HistorialPrecio(precio, fechaInicio, fechaFin, estadoPrecio)

        historialPrecios[id] = historialPrecio
        return "historial  de precio  creado con éxito."
    }

    //LIstar historial precios
    fun listarHistorialPrecios(): String {
        if (historialPrecios.isEmpty()) {
            return "No hay historiales de precios disponibles."
        }

        return historialPrecios.entries.joinToString("\n") {
            "ID: ${it.key}, Precio: ${it.value.getPrecio()}, Fecha Incio : ${it.value.getFechaInicio()}, Fecha Fin : ${it.value.getFechaFin()}, Estado de historial de precio : ${it.value.getEstadoPrecio()}"
        }
    }

    //Buscar un Historial de precio por ID
    fun buscarHistorialPrecioPorId(id: String): String {
        val historialPrecio =  historialPrecios[id]
        return if (historialPrecio != null) {
            " encontrado: Precio: ${historialPrecio.getPrecio()}, Fecha de inicio: ${historialPrecio.getFechaInicio()}, Fecha de fin : ${historialPrecio.getFechaFin()}, Estado del precio : ${historialPrecio.getEstadoPrecio()}"
        } else {
            "historial de precio no encontrado."
        }
    }

    // Actualizar un historial de precio por ID
    fun actualizarHistorialPrecio(id: String): String {
        val historialPrecio = historialPrecios[id]
        if (historialPrecio != null) {
            println("Ingresa el nuevo precio (actual: ${historialPrecio.getPrecio()}):")
            val nuevoPrecio = readLine()?.toDouble() ?: historialPrecio.getPrecio()

            println("Ingresa la nueva fecha de inicio del precio  (actual: ${historialPrecio.getFechaInicio()}):")
            val nuevaFechaInicio = readLine() ?: historialPrecio.getFechaInicio()

            println("Ingresa la nueva fecha de fin del precio(actual: ${historialPrecio.getFechaFin()}):")
            val nuevaFechaFin = readLine() ?: historialPrecio.getFechaFin()

            println("¿Está disponible el historial de precio? (true/false, actual: ${historialPrecio.getEstadoPrecio()}):")
            val nuevoEstado = readLine()?.toBoolean() ?: historialPrecio.getEstadoPrecio()

            // Actualizar historial precio
            //historialPrecio.setPrecio(nuevoPrecio)
            //historialPrecio.setFechaInicio(nuevaFechaInicio)
            //historialPrecio.setFechaFin(nuevaFechaFin)
            //historialPrecio.setEstadoPrecio(nuevoEstado)

            return "historial de precio actualizado con éxito."
        } else {
            return "historial de precio con ID $id no encontrado."
        }
    }

    // Eliminar un historial de precio por ID
    fun eliminarHistorialPrecio(id: String): String {
        return if (historialPrecios.remove(id) != null) {
            "historial de precio eliminado con éxito."
        } else {
            "historial de precio no encontrado."
        }
    }
}


