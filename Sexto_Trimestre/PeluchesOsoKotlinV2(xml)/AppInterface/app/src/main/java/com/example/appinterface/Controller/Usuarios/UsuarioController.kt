package Controller.Usuarios

import Models.Usuarios.Usuario
import java.util.*

class UsuarioController {

    private val usuarios = mutableMapOf<String, Usuario>()

    // Crear un usuario
    fun crearUsuario(email: String, telefono: Int, contrasena: String, username: String): String {
        val id = UUID.randomUUID().toString()
        val usuario = Usuario(email, telefono, contrasena, username)
        usuarios[id] = usuario
        return "Usuario creado con éxito."
    }

    // Listar todos los usuarios
    fun listarUsuarios(): String {
        if (usuarios.isEmpty()) {
            return "No hay usuarios disponibles."
        }

        return usuarios.entries.joinToString("\n") {
            "ID: ${it.key}, Email: ${it.value.getEmail()}, Teléfono: ${it.value.getTelefono()}, Usuario: ${it.value.getUsername()}"
        }
    }

    // Buscar un usuario por ID
    fun buscarUsuarioPorId(id: String): String {
        val usuario = usuarios[id]
        return if (usuario != null) {
            "Usuario encontrado: Email: ${usuario.getEmail()}, Teléfono: ${usuario.getTelefono()}, Usuario: ${usuario.getUsername()}"
        } else {
            "Usuario no encontrado."
        }
    }

    // Actualizar un usuario por ID
    fun actualizarUsuario(id: String, email: String, telefono: Int, contrasena: String, username: String): String {
        val usuario = usuarios[id]
        if (usuario != null) {
            usuario.setEmail(email)
            usuario.setTelefono(telefono)
            usuario.setContrasena(contrasena)
            usuario.setUsername(username)
            return "Usuario actualizado con éxito."
        } else {
            return "El usuario con ID: $id no se encontró."
        }
    }

    // Eliminar un usuario por ID
    fun eliminarUsuario(id: String): String {
        return if (usuarios.remove(id) != null) {
            "Usuario eliminado con éxito."
        } else {
            "Usuario no encontrado."
        }
    }
}
