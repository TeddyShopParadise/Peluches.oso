package Servicios

import Controllers.Productos.ProductoController

class ProductoService {
    fun AdminProductos(){
        val productoController = ProductoController()
        while (true) {
            println("\n¿Qué deseas hacer?")
            println("1. Crear un nuevo producto")
            println("2. Listar todos los productos")
            println("3. Buscar un producto por ID")
            println("4. Actualizar un producto por ID")
            println("5. Eliminar un producto por ID")
            println("6. Salir")

            val opcion = readLine()?.toIntOrNull()

            when (opcion) {
                1 -> {
                    val resultado = productoController.crearProducto()
                    println(resultado)
                }
                2 -> {
                    val productosListados = productoController.listarProductos()
                    println(productosListados)
                }
                3 -> {
                    println("Ingresa el ID del producto que deseas buscar:")
                    val idProducto = readLine() ?: ""
                    val resultadoBusqueda = productoController.buscarProductoPorId(idProducto)
                    println(resultadoBusqueda)
                }
                4 -> {
                    println("Ingresa el ID del producto que deseas actualizar:")
                    val idActualizar = readLine() ?: ""
                    val resultadoActualizacion = productoController.actualizarProducto(idActualizar)
                    println(resultadoActualizacion)
                }
                5 -> {
                    println("Ingresa el ID del producto que deseas eliminar:")
                    val idEliminar = readLine() ?: ""
                    val resultadoEliminacion = productoController.eliminarProducto(idEliminar)
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