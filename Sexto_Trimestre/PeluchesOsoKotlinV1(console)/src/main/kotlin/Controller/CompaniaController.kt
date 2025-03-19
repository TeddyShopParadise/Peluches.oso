package Controller

import Models.Compania
import java.util.*

class CompaniaController {
    private val compania = mutableMapOf<String, Compania>()

    fun crearCompania(): String {
        println("Ingrese el NIT de la compañía: ")
        val nit = readln()

        println("Ingrese el teléfono de la compañía: ")
        val telefono = readln()

        println("Ingrese el nombre de la compañía: ")
        val nombre = readln()

        println("Ingrese la dirección de la compañía: ")
        val direccion = readln()

        val id = UUID.randomUUID().toString()
        val nuevaCompania = Compania(nit, telefono, nombre, direccion)

        compania[id] = nuevaCompania
        return "Compañía creada con éxito."
    }

    fun listarCompanias(): String {
        if (compania.isEmpty()) {
            return "No hay compañías disponibles."
        }
        return compania.entries.joinToString("\n") {
            "ID: ${it.key}, NIT: ${it.value.getNIT()}, Teléfono: ${it.value.getTelefonoEmpresa()}, Nombre: ${it.value.getNombreEmpresa()}, Dirección: ${it.value.getDireccionEmpresa()}"
        }
    }

    fun buscarCompaniaPorId(id: String): String {
        val comp = compania[id]
        return comp?.let {
            "Compañía encontrada: NIT: ${it.getNIT()}, Teléfono: ${it.getTelefonoEmpresa()}, Nombre: ${it.getNombreEmpresa()}, Dirección: ${it.getDireccionEmpresa()}"
        } ?: "Compañía no encontrada."
    }

    fun actualizarCompania(id: String): String {
        val comp = compania[id] ?: return "Compañía no encontrada."

        println("Ingrese el nuevo NIT de la compañía (actual: ${comp.getNIT()}):")
        val nuevoNit = readln()

        println("Ingrese el nuevo teléfono de la compañía (actual: ${comp.getTelefonoEmpresa()}):")
        val nuevoTelefono = readln()

        println("Ingrese el nuevo nombre de la compañía (actual: ${comp.getNombreEmpresa()}):")
        val nuevoNombre = readln()

        println("Ingrese la nueva dirección de la compañía (actual: ${comp.getDireccionEmpresa()}):")
        val nuevaDireccion = readln()

        compania[id] = Compania(nuevoNit, nuevoTelefono, nuevoNombre, nuevaDireccion)
        return "Compañía actualizada con éxito."
    }

    fun eliminarCompania(id: String): String {
        return if (compania.remove(id) != null) {
            "Compañía eliminada con éxito."
        } else {
            "Compañía no encontrada."
        }
    }
}
