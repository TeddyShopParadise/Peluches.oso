package Controller.Pedidos

import Models.Pedidos.Pedido
import java.util.*

class PedidoController {
    private val pedidos = mutableMapOf<String, Pedido>()

    // Crear un pedido
    fun crearPedido(tamañoOso: String, nombreComprador: String, apellidoComprador: String, numeroComprador: Int,
                    nombreAgendador: String, apellidoAgendador: String, numeroAgendador: Int, localidad: String,
                    direccion: String, barrio: String): String {
        val id = UUID.randomUUID().toString()  // Generar ID único
        val pedido = Pedido(tamañoOso, nombreComprador, apellidoComprador, numeroComprador, nombreAgendador, apellidoAgendador,
            numeroAgendador, localidad, direccion, barrio)

        pedidos[id] = pedido
        return "Pedido creado con éxito."
    }

    // Listar todos los pedidos
    fun listarPedidos(): String {
        if (pedidos.isEmpty()) {
            return "No hay pedidos disponibles."
        }

        return pedidos.entries.joinToString("\n") {
            "ID: ${it.key}, tamaño del oso: ${it.value.getTamañoOso()}, nombre completo del comprador: ${it.value.getNombreComprador()} ${it.value.getApellidoComprador()}, " +
                    "numero del comprador: ${it.value.getNumeroComprador()}, nombre completo del agendador: ${it.value.getNombreAgendador()} ${it.value.getApellidoAgendador()}, " +
                    "numero del agendador: ${it.value.getNumeroAgendador()}, localidad: ${it.value.getLocalidad()}, barrio: ${it.value.getBarrio()}, dirección: ${it.value.getDireccion()}"
        }
    }

    // Buscar pedido por ID
    fun buscarPedidoPorId(id: String): String {
        val pedido = pedidos[id]
        return if (pedido != null) {
            "Pedido encontrado: Tamaño oso: ${pedido.getTamañoOso()}, nombre completo comprador: ${pedido.getNombreComprador()} ${pedido.getApellidoComprador()}, " +
                    "numero del comprador: ${pedido.getNumeroComprador()}, nombre completo del agendador: ${pedido.getNombreAgendador()} ${pedido.getApellidoAgendador()}, " +
                    "numero del agendador: ${pedido.getNumeroAgendador()}, localidad: ${pedido.getLocalidad()}, direccion: ${pedido.getDireccion()}, barrio: ${pedido.getBarrio()}"
        } else {
            "Pedido no encontrado."
        }
    }

    // Actualizar pedido por ID
    fun actualizarPedido(id: String, nuevoTamañoOso: String, nuevoNombreComprador: String, nuevoApellidoComprador: String,
                         nuevoNumeroComprador: Int, nuevoNombreAgendador: String, nuevoApellidoAgendador: String,
                         nuevoNumeroAgendador: Int, nuevaLocalidad: String, nuevaDireccion: String, nuevoBarrio: String): String {
        val pedido = pedidos[id]
        return if (pedido != null) {
            // Actualizar pedido
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

            "Pedido actualizado con éxito."
        } else {
            "Pedido con ID $id no encontrado."
        }
    }

    // Eliminar pedido por ID
    fun eliminarPedido(id: String): String {
        return if (pedidos.remove(id) != null) {
            "Pedido eliminado con éxito."
        } else {
            "Pedido no encontrado."
        }
    }
}
