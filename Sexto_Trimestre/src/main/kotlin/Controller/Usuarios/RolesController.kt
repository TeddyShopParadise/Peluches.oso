package Controller.Usuarios

import Models.Productos.Producto
import Models.Usuarios.Roles
import java.util.*

class RolesController {

    private val roles = mutableMapOf<String, Roles>()

    //Crear un rol
    fun crearRol(): String{
        println("Ingresa el estado del rol")
        val estado = readLine()?.toBoolean() ?: false

        println("Ingrese el nombre del rol")
        val nombre = readLine() ?: ""

        val id = UUID.randomUUID().toString()  // Generar ID único
        val rol = Roles(estado, nombre)

        roles[id] = rol
        return "Rol creado con éxito."
    }

    // Listar todos los Roles
    fun listarRoles(): String {
        if (roles.isEmpty()) {
            return "No hay roles disponibles."
        }

        return roles.entries.joinToString("\n") {
            "ID: ${it.key}, Estado del rol: ${it.value.getEstado()}, Nombre del rol : ${it.value.getNombre()}"
        }
    }

    // Buscar un Rol por ID
    fun buscarRolPorId(id: String): String {
        val rol = roles[id]
        return if (rol != null) {
            "Rol encontrado: Estado del rol: ${rol.getEstado()}, Nombre del rol: ${rol.getNombre()}"
        } else {
            "Rol no encontrado."
        }
    }

    // Actualizar un Rol por ID
    fun actualizarRol(id: String): String {
        val rol = roles[id]
        if (rol != null) {

            println("Ingresa el nuevo nombre del rol (actual: ${rol.getNombre()}):")
            val nuevoNombre = readLine() ?: rol.getNombre()

            println("¿Está disponible el Rol? (true/false, actual: ${rol.getEstado()}):")
            val nuevaDisponibilidad = readLine()?.toBoolean() ?: rol.getEstado()

            // Actualizar Rol

            rol.setNombre(nuevoNombre)
            rol.setEstado(nuevaDisponibilidad)
            return "Rol actualizado con éxito."
        } else {
            return "Rol con ID $id no encontrado."
        }
    }

    fun eliminarRol(id: String): String {
        return if (roles.remove(id) != null) {
            "Rol eliminado con éxito."
        } else {
            "Rol no encontrado."
        }
    }


}