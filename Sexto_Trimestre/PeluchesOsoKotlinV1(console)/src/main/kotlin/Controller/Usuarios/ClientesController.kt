package Controller.Usuarios
import Models.Usuarios.Clientes

class ClientesController {

    private val clientes = mutableMapOf<String, Clientes>()

    fun cearClientes(): String {
        println("Ingrese el DNI del Cliente")
        val dni = readln().toInt()

        println("Ingrese el Nombre del Cliente")
        val nombre = readln().toString()

        println("Ingrese el Telefono del Cliente")
        val telefono = readln().toInt()

        println("Ingrese el Apellido del Cliente")
        val apellido = readln().toString()

        val cliente = Clientes(dni, nombre, telefono, apellido)

        clientes[dni.toString()] = cliente
        return "Devolucion creada con exito con el ID: $dni"
    }

    fun listarClientes(): String {
        if (clientes.isEmpty()) {
            return "No hay devoluciones registradas"
        }
        return clientes.entries.joinToString  ("\n")  {
            "DNI: ${it.key}, Nombre y Apellido del cliente: ${it.value.getNombreCliente()} ${it.value.getApellidoCliente()}, el Telefono del cliente es: ${it.value.getTelefonoCliente()}"

        }
    }

    fun buscarClientesPorDni(dni: String) : String {
        val cliente = clientes[dni]
        return if (cliente != null) {
            "Cliente encontrado: DNI: ${cliente.getDniCliente()}, Nombre: ${cliente.getNombreCliente()}, Apellido: ${cliente.getApellidoCliente()}, Telefono: ${cliente.getTelefonoCliente()}"
        } else {
            "Cliente no encontrado."
        }
    }

    fun actualizarCliente(dni: String) : String {
        val cliente = clientes[dni]
        if (cliente != null) {
            println("Ingrese el nuevo Nombre del Cliente")
            val nuevoNombre = readln().toString()

            println("Ingrese el nuevo Telefono del Cliente")
            val nuevoTelefono = readln().toInt()

            println("Ingrese el nuevo Apellido del Cliente")
            val nuevoApellido = readln().toString()

            cliente.setNombreCliente(nuevoNombre)
            cliente.setTelefonoCliente(nuevoTelefono)
            cliente.setApellidoCliente(nuevoApellido)

            return "Cliente actualizado con exito"
        } else {
            return "El Cliente con DNI: $dni no se encontro"
        }
    }

    fun eliminarCliente(dni: String): String {
        return if (clientes.remove(dni) != null) {
            "Cliente eliminado con exito."
        } else {
            "El Cliente con DNI: $dni no se encontro"
        }
    }
}