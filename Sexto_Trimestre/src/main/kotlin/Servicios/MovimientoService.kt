package Servicios

import Controller.Productos.MovimientoController

class MovimientoService {
    fun AdminMovimientos(){
        val movimientoController = MovimientoController()
        while (true) {
            println("\n¿Qué deseas hacer?")
            println("1. Crear un nuevo movimiento")
            println("2. Listar todos los movimientos")
            println("3. Buscar un movimiento por ID")
            println("4. Actualizar un movimiento por ID")
            println("5. Eliminar un movimiento por ID")
            println("6. Salir")

            val opcion = readLine()?.toIntOrNull()

            when (opcion) {
                1 -> {
                    val resultado = movimientoController.crearMovimiento()
                    println(resultado)
                }
                2 -> {
                    val movimientoListados = movimientoController.listarMovimientos()
                    println(movimientoListados)
                }
                3 -> {
                    println("Ingresa el ID del movimiento que deseas buscar:")
                    val idMovimiento = readLine() ?: ""
                    val resultadoBusqueda = movimientoController.buscarMovimientoPorId(idMovimiento)
                    println(resultadoBusqueda)
                }
                4 -> {
                    println("Ingresa el ID del movimiento que deseas actualizar:")
                    val idActualizar = readLine() ?: ""
                    val resultadoActualizacion = movimientoController.actualizarMovimiento(idActualizar)
                    println(resultadoActualizacion)
                }
                5 -> {
                    println("Ingresa el ID del movimiento que deseas eliminar:")
                    val idEliminar = readLine() ?: ""
                    val resultadoEliminacion = movimientoController.eliminarMovimiento(idEliminar)
                    println(resultadoEliminacion)
                }
                6 -> {
                    println("¡Gracias por usar TeddyShop! Hasta luego.")
                    break
                }
                else -> {
                    println("Opción no válida, por favor elige una opción entre 1 y 6.")
                }
            }
        }
    }
}