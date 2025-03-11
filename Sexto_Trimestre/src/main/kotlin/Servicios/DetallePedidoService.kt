package Servicios

import Controller.Pedidos.DetallePedidoController

class DetallePedidoService {
    fun AdminDetallesPedido() {
        val detallePedidoController = DetallePedidoController()
        while (true) {
            println("\n¿Qué deseas hacer?")
            println("1. Crear un nuevo detalle de pedido")
            println("2. Listar todos los detalles de pedido")
            println("3. Buscar un detalle de pedido por ID")
            println("4. Actualizar un detalle de pedido por ID")
            println("5. Eliminar un detalle de pedido por ID")
            println("6. Salir")

            val opcion = readLine()?.toIntOrNull()

            when (opcion) {
                1 -> {
                    val resultado = detallePedidoController.crearDetallePedido()
                    println(resultado)
                }
                2 -> {
                    val detallesListados = detallePedidoController.listarDetallesPedido()
                    println(detallesListados)
                }
                3 -> {
                    println("Ingresa el ID del detalle de pedido que deseas buscar:")
                    val idDetalle = readLine() ?: ""
                    val resultadoBusqueda = detallePedidoController.buscarDetallePedidoPorId(idDetalle)
                    println(resultadoBusqueda)
                }
                4 -> {
                    println("Ingresa el ID del detalle de pedido que deseas actualizar:")
                    val idActualizar = readLine() ?: ""
                    val resultadoActualizacion = detallePedidoController.actualizarDetallePedido(idActualizar)
                    println(resultadoActualizacion)
                }
                5 -> {
                    println("Ingresa el ID del detalle de pedido que deseas eliminar:")
                    val idEliminar = readLine() ?: ""
                    val resultadoEliminacion = detallePedidoController.eliminarDetallePedido(idEliminar)
                    println(resultadoEliminacion)
                }
                6 -> {
                    println("¡Gracias por usar el sistema de gestión de pedidos! Hasta luego.")
                    break
                }
                else -> {
                    println("Opción no válida, por favor elige una opción entre 1 y 6.")
                }
            }
        }
    }
}
