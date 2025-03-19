package Controller.Pedidos
import Models.Pedidos.Pedido
import java.util.*

class PedidoController {
    private val pedidos = mutableMapOf<String, Pedido>()

    //Crear un pedido
    fun crearPedido(): String {
        println("Ingrese el tamaño del oso: ")
        val tamañoOso = readln() ?: ""

        println("Ingrese el nombre del comprador: ")
        val nombreComprador = readln() ?: ""

        println("Ingrese el apellido del comprador: ")
        val apellidoComprador = readln() ?: ""

        println("Ingrese el numero del comprador: ")
        val numeroComprador = readln().toInt()

        println("Ingrese el nombre del agendador: ")
        val nombreAgendador = readln() ?: ""

        println("Ingrese el apellido del agendador: ")
        val apellidoAgendador = readln() ?: ""

        println("Ingrese el numero del agendador: ")
        val numeroAgendador = readln().toInt()

        println("Ingrese la localidad: ")
        val localidad = readln() ?: ""

        println("Ingrese la dirección: ")
        val direccion = readln() ?: ""

        println("Ingrese el barrio: ")
        val barrio = readln() ?: ""

        val id = UUID.randomUUID().toString()  // Generar ID único
        val pedido = Pedido(tamañoOso, nombreComprador, apellidoComprador, numeroComprador, nombreAgendador, apellidoAgendador, numeroAgendador, localidad, direccion, barrio)

        pedidos[id] = pedido
        return "Pedido creado con exito."
    }

    //Listar todos los pedidos
    fun listarPedidos(): String {
        if (pedidos.isEmpty()) {
            return "No hay pedidos disponibles."
        }

        return pedidos.entries.joinToString("\n") {
            "ID: ${it.key}, tamaño del oso: ${it.value.getTamañoOso()}, nombre completo del comprador: ${it.value.getNombreComprador()} ${it. value.getApellidoComprador()}, numero del comprador: ${it.value.getNumeroComprador()}, nombre completo del agendador: ${it.value.getNombreAgendador()} ${it.value.getApellidoAgendador()}, numero del agendador: ${it.value.getNumeroAgendador()}, localidad: ${it.value.getLocalidad()}, barrio: ${it.value.getBarrio()}, dirección: ${it.value.getDireccion()}"
        }
    }

    // Buscar pedido por ID
    fun buscarPedidoPorId(id: String): String {
        val pedido = pedidos[id]
        return if (pedido != null) {
            "Pedido encontrado: Tamaño oso: ${pedido.getTamañoOso()}, nombre completo comprador: ${pedido.getNombreComprador()} ${pedido.getApellidoComprador()}, numero del comprador: ${pedido.getNumeroComprador()}, nombre completo del agendador: ${pedido.getNombreAgendador()} ${pedido.getApellidoAgendador()}, numero del agendador: ${pedido.getNumeroAgendador()}, localidad: ${pedido.getLocalidad()}, direccion: ${pedido.getDireccion()}, barrio: ${pedido.getBarrio()}"
        } else {
            "Producto no encontrado."
        }
    }

    //Actualizar pedido por ID
    fun actualizarPedido(id: String): String {
        val pedido = pedidos[id]
        if(pedido != null){
            println("Ingrese el nuevo tamaño del oso: ")
            val nuevoTamañoOso = readln() ?: pedido.getTamañoOso()

            println("Ingrese el nuevo nombre del comprador: ")
            val nuevoNombreComprador = readln() ?: pedido.getNombreComprador()

            println("Ingrese el nuevo apellido del comprador: ")
            val nuevoApellidoComprador = readln() ?: pedido.getApellidoComprador()

            println("Ingrese el nuevo numero del comprador: ")
            val nuevoNumeroComprador = readln().toInt() ?: pedido.getNumeroComprador()

            println("Ingrese el nuevo nombre del agendador: ")
            val nuevoNombreAgendador = readln() ?: pedido.getNombreAgendador()

            println("Ingrese el nuevo apellido del agendador: ")
            val nuevoApellidoAgendador = readln() ?: pedido.getApellidoAgendador()

            println("Ingrese el nuevo numero del agendador: ")
            val nuevoNumeroAgendador = readln().toInt() ?: pedido.getNumeroAgendador()

            println("Ingrese la nueva localidad: ")
            val nuevaLocalidad = readln() ?: pedido.getLocalidad()

            println("Ingrese la nueva dirección: ")
            val nuevaDireccion = readln() ?: pedido.getDireccion()

            println("Ingrese el nuevo barrio: ")
            val nuevoBarrio = readln() ?: pedido.getBarrio()

            //Actualizar pedido
            pedido.setTamañoOso(nuevoTamañoOso)
            pedido.setNombreComprador(nuevoNombreComprador)
            pedido.setApellidoComprador(nuevoApellidoComprador)
            pedido.setNumeroComprador(nuevoNumeroComprador)
            pedido.setNombreAgendador(nuevoNombreAgendador)
            pedido.setApellidoAgendador(nuevoApellidoAgendador)
            pedido.setNumeroAgendador(nuevoNumeroAgendador)
            pedido.setLocalidad(nuevaLocalidad)
            pedido.setDireccion(nuevaDireccion)
            pedido.setBarrio(nuevoBarrio)

            return "Pedido actualizado con exito."
        } else {
            return "Pedido con ID $id no encontrado."
        }
    }

    //Eliminar pedido por ID
    fun eliminarPedido(id: String): String {
        return if(pedidos.remove(id) != null) {
            "Pedido eliminado con exito."
        } else {
            "pedido no encontrado."
        }
    }

}