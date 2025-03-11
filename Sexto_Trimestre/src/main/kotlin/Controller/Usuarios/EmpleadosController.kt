package Controller.Usuarios
import Models.Usuarios.Empleados
import java.util.*

class EmpleadosController {
    private val empleados = mutableMapOf<String, Empleados>()

    //crear un empleado
    fun crearEmpleado(): String {
        println("Ingrese el DNI del empleado: ")
        val dniEmpleado = readln().toInt()

        println("Ingrese el Nombre del empleado: ")
        val nombreEmpleado = readln()

        println("Ingrese el Telefono del empleado: ")
        val telefonoEmpleado = readln().toInt()

        println("Ingrese el Codigo del empleado: ")
        val codigoEmpleado = readln()

        val id = UUID.randomUUID().toString()  // Generar ID único
        val empleado = Empleados(dniEmpleado, telefonoEmpleado, nombreEmpleado, codigoEmpleado)

        empleados[id] = empleado
        return "El empleado fue creado con exito."
    }

    //Listar los empleados
    fun listarEmpleados(): String {
        if(empleados.isEmpty()) {
            return "No hay empleados disponibles."
        }

        return empleados.entries.joinToString("\n") {
            "ID: ${it.key}, Dni: ${it.value.getDniEmpleado()}, Nombre del empleado: ${it.value.getNombreEmpleado()}, Telefono del empleado: ${it.value.getTelefonoEmpleado()}, Codigo del empleado: ${it.value.getTelefonoEmpleado()}"
        }
    }

    //Buscar un empleado por ID
    fun buscarEmpleadoPorId(id: String): String {
        val empleado = empleados[id]
        return if (empleado != null) {
            "Empleado encontrado: DNI: ${empleado.getDniEmpleado()}, Nombre: ${empleado.getNombreEmpleado()}, Telefono: ${empleado.getTelefonoEmpleado()}, Codigo: ${empleado.getCodigoEmpleado()}"
        } else {
            "EMpleado no encontrado."
        }
    }

    //Actualizar empleado por ID
    fun actualizarEmpleado(id: String): String {
        val empleado = empleados[id]
        if (empleado != null) {
            println("Ingrese el nuevo DNI del empleado (actual: ${empleado.getDniEmpleado()}) ")
            val nuevoDniEmpleado = readln().toInt() ?: empleado.getDniEmpleado()

            println("Ingrese el nuevo Nombre del empleado (actual: ${empleado.getNombreEmpleado()}) ")
            val nuevoNombreEmpleado = readln() ?: empleado.getNombreEmpleado()

            println("Ingrese el nuevo Telefono del empleado (actual: ${empleado.getTelefonoEmpleado()}) ")
            val nuevoTelefonoEmpleado = readln().toInt() ?: empleado.getTelefonoEmpleado()

            println("Ingrese el nuevo Codigo del empleado (actual: ${empleado.getCodigoEmpleado()}) ")
            val nuevoCodigoEmpleado = readln() ?: empleado.getCodigoEmpleado()

            //Actualizar empleado
            empleado.setCodigoEmpleado(nuevoCodigoEmpleado)
            empleado.setNombreEmpleado(nuevoNombreEmpleado)
            empleado.setTelefonoEmpleado(nuevoTelefonoEmpleado)
            empleado.setDniEmpleado(nuevoDniEmpleado)

            return "Empleado actualizado con exito."
        } else {
            return "El empleado con ID $id no fue encontrado."
        }
    }

    //Eliminar un empleado por ID
    fun eliminarEmpleado(id: String): String {
        return if (empleados.remove(id) != null) {
            "Empleado eliminado con exito."
        } else {
            "Empleado no encontrado."
        }
    }
}