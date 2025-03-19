package Servicios

import Controller.Productos.HistorialPrecioController

class HistorialPrecioService {
    fun AdminHistorialPrecios(){
        val historialPrecioController = HistorialPrecioController()
        while (true) {
            println("\n¿Qué deseas hacer?")
            println("1. Crear un nuevo historial de precio")
            println("2. Listar todos los historiales")
            println("3. Buscar un historial de precio por ID")
            println("4. Actualizar un historial de precio por ID")
            println("5. Eliminar un historial de precio por ID")
            println("6. Salir")

            val opcion = readLine()?.toIntOrNull()

            when (opcion) {
                1 -> {
                    val resultado = historialPrecioController.crearHistorialPrecio()
                    println(resultado)
                }
                2 -> {
                    val historialesListados = historialPrecioController.listarHistorialPrecios()
                    println(historialesListados)
                }
                3 -> {
                    println("Ingresa el ID del del historial de precio  que deseas buscar:")
                    val idHistorialPrecio = readLine() ?: ""
                    val resultadoBusqueda = historialPrecioController.buscarHistorialPrecioPorId(idHistorialPrecio)
                    println(resultadoBusqueda)
                }
                4 -> {
                    println("Ingresa el ID del historial de precio que deseas actualizar:")
                    val idActualizar = readLine() ?: ""
                    val resultadoActualizacion = historialPrecioController.actualizarHistorialPrecio(idActualizar)
                    println(resultadoActualizacion)
                }
                5 -> {
                    println("Ingresa el ID del historial de precio que deseas eliminar:")
                    val idEliminar = readLine() ?: ""
                    val resultadoEliminacion = historialPrecioController.eliminarHistorialPrecio(idEliminar)
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