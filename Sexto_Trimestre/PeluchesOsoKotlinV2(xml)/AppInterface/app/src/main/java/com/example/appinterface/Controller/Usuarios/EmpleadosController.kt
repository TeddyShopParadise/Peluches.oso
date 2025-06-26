package Controller.Usuarios
import Models.Usuarios.Empleados
import java.util.*

class EmpleadosController {
    private val empleados = mutableMapOf<String, Empleados>()

    //crear un empleado
    fun crearEmpleado(dniEmpleado : Int,telefonoEmpleado : Int, nombreEmpleado : String ): String {

        val id = UUID.randomUUID().toString()  // Generar ID único
        val empleado = Empleados(dniEmpleado,telefonoEmpleado,nombreEmpleado )

        empleados[id] = empleado
        return "El empleado fue creado con exito."
    }

    //Listar los empleados
    fun listarEmpleados(): String {
        if(empleados.isEmpty()) {
            return "No hay empleados disponibles."
        }

        return empleados.entries.joinToString("\n") {
            "ID: ${it.key}, Dni: ${it.value.getDniEmpleado()}, Nombre del empleado: ${it.value.getNombreEmpleado()}, Telefono del empleado: ${it.value.getTelefonoEmpleado()}"
        }
    }

    //Buscar un empleado por ID
    fun buscarEmpleadoPorId(id: String): String {
        val empleado = empleados[id]
        return if (empleado != null) {
            "Empleado encontrado: DNI: ${empleado.getDniEmpleado()}, Nombre: ${empleado.getNombreEmpleado()}, Telefono: ${empleado.getTelefonoEmpleado()}"
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

            //Actualizar empleado
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