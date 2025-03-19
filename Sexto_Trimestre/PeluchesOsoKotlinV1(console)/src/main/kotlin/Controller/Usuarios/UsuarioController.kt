package Controller.Usuarios
import Models.Usuarios.Usuario
import java.util.*

class UsuarioController {

    private val usuarios = mutableMapOf<String, Usuario>()

    fun crearUsuario(): String {
        println("Ingrese el email del usuario: ")
        val email = readln()

        println("Ingrese el teléfono del usuario: ")
        val telefono = readln().toInt()

        println("Ingrese la contraseña del usuario: ")
        val contrasena = readln()

        println("Ingrese el nombre de usuario: ")
        val username = readln()

        val id = UUID.randomUUID().toString()
        val usuario = Usuario(email, telefono, contrasena, username)

        usuarios[id] = usuario
        return "Usuario creado con éxito."
    }

    fun listarUsuarios(): String {
        if (usuarios.isEmpty()) {
            return "No hay usuarios disponibles."
        }

        return usuarios.entries.joinToString("\n") {
            "ID: ${it.key}, Email: ${it.value.getEmail()}, Teléfono: ${it.value.getTelefono()}, Usuario: ${it.value.getUsername()}"
        }
    }

    fun buscarUsuarioPorId(id: String): String {
        val usuario = usuarios[id]
        return if (usuario != null) {
            "Usuario encontrado: Email: ${usuario.getEmail()}, Teléfono: ${usuario.getTelefono()}, Usuario: ${usuario.getUsername()}"
        } else {
            "Usuario no encontrado."
        }
    }

    fun actualizarUsuario(id: String): String {
        val usuario = usuarios[id]
        if (usuario != null) {
            println("Ingrese el nuevo email para el usuario (actual: ${usuario.getEmail()}):")
            val nuevoEmail = readln()

            println("Ingrese el nuevo teléfono para el usuario (actual: ${usuario.getTelefono()}):")
            val nuevoTelefono = readln().toInt()

            println("Ingrese la nueva contraseña para el usuario:")
            val nuevaContrasena = readln()

            println("Ingrese el nuevo nombre de usuario (actual: ${usuario.getUsername()}):")
            val nuevoUsername = readln()

            usuario.setEmail(nuevoEmail)
            usuario.setTelefono(nuevoTelefono)
            usuario.setContrasena(nuevaContrasena)
            usuario.setUsername(nuevoUsername)

            return "Usuario actualizado con éxito."
        } else {
            return "El usuario con ID: $id no se encontró."
        }
    }

    fun eliminarUsuario(id: String): String {
        return if (usuarios.remove(id) != null) {
            "Usuario eliminado con éxito."
        } else {
            "Usuario no encontrado."
        }
    }
}
