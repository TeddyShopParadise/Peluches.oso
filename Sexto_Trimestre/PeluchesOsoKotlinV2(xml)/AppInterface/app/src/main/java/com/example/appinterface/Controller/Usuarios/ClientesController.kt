package Controller.Usuarios
import Models.Usuarios.Clientes

class ClientesController {

    private val clientes = mutableMapOf<String, Clientes>()

    // Crear un cliente
    fun crearCliente(dni: Int, nombre: String, telefono: Int, apellido: String): String {
        val cliente = Clientes(dni, nombre, telefono, apellido)

        clientes[dni.toString()] = cliente
        return "Cliente creado con éxito con el DNI: $dni"
    }

    // Listar todos los clientes
    fun listarClientes(): String {
        if (clientes.isEmpty()) {
            return "No hay clientes registrados"
        }
        return clientes.entries.joinToString("\n") {
            "DNI: ${it.key}, Nombre y Apellido: ${it.value.getNombreCliente()} ${it.value.getApellidoCliente()}, Teléfono: ${it.value.getTelefonoCliente()}"
        }
    }

    // Buscar un cliente por DNI
    fun buscarClientePorDni(dni: String): String {
        val cliente = clientes[dni]
        return if (cliente != null) {
            "Cliente encontrado: DNI: ${cliente.getDniCliente()}, Nombre: ${cliente.getNombreCliente()}, Apellido: ${cliente.getApellidoCliente()}, Teléfono: ${cliente.getTelefonoCliente()}"
        } else {
            "Cliente no encontrado."
        }
    }

    // Actualizar un cliente por DNI
    fun actualizarCliente(dni: String, nuevoNombre: String, nuevoTelefono: Int, nuevoApellido: String): String {
        val cliente = clientes[dni]
        return if (cliente != null) {
            cliente.setNombreCliente(nuevoNombre)
            cliente.setTelefonoCliente(nuevoTelefono)
            cliente.setApellidoCliente(nuevoApellido)

            "Cliente actualizado con éxito."
        } else {
            "El cliente con DNI: $dni no se encontró."
        }
    }

    // Eliminar un cliente por DNI
    fun eliminarCliente(dni: String): String {
        return if (clientes.remove(dni) != null) {
            "Cliente eliminado con éxito."
        } else {
            "El cliente con DNI: $dni no se encontró."
        }
    }
}
