package Servicios

import Controller.Productos.CategoriaController

class CategoriaService {
    fun AdminCategorias() {
        val categoriaController = CategoriaController()
        while (true) {
            println("\n¿Qué deseas hacer?")
            println("1. Crear una nueva categoría")
            println("2. Listar todas las categorías")
            println("3. Buscar una categoría por ID")
            println("4. Actualizar una categoría por ID")
            println("5. Eliminar una categoría por ID")
            println("6. Salir")

            val opcion = readLine()?.toIntOrNull()

            when (opcion) {
                1 -> {
                    val resultado = categoriaController.crearCategoria()
                    println(resultado)
                }
                2 -> {
                    val categoriasListadas = categoriaController.listarCategorias()
                    println(categoriasListadas)
                }
                3 -> {
                    println("Ingresa el ID de la categoría que deseas buscar:")
                    val idCategoria = readLine() ?: ""
                    val resultadoBusqueda = categoriaController.buscarCategoriaPorId(idCategoria)
                    println(resultadoBusqueda)
                }
                4 -> {
                    println("Ingresa el ID de la categoría que deseas actualizar:")
                    val idActualizar = readLine() ?: ""
                    val resultadoActualizacion = categoriaController.actualizarCategoria(idActualizar)
                    println(resultadoActualizacion)
                }
                5 -> {
                    println("Ingresa el ID de la categoría que deseas eliminar:")
                    val idEliminar = readLine() ?: ""
                    val resultadoEliminacion = categoriaController.eliminarCategoria(idEliminar)
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
