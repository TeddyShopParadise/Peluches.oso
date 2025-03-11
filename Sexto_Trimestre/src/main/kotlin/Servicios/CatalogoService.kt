package Servicios

import Controller.Productos.CatalogoController
import Controller.Productos.HistorialPrecioController

class CatalogoService {

    fun AdminCatalogos(){
        val catalogoController = CatalogoController()
        while (true) {
            println("\n¿Qué deseas hacer?")
            println("1. Crear un nuevo Catalogo precio")
            println("2. Listar todos los Catalogos")
            println("3. Buscar un Catalogo por ID")
            println("4. Actualizar un Catalogo por ID")
            println("5. Eliminar un Catalogo por ID")
            println("6. Salir")

            val opcion = readLine()?.toIntOrNull()

            when (opcion) {
                1 -> {
                    val resultado = catalogoController.crearCatalogo()
                    println(resultado)
                }
                2 -> {
                    val catalogosListados = catalogoController.listarCatalogos()
                    println(catalogosListados)
                }
                3 -> {
                    println("Ingresa el ID del del Catalogo que deseas buscar:")
                    val idCatalogo = readLine() ?: ""
                    val resultadoBusqueda = catalogoController.buscarCatalogoPorId(idCatalogo)
                    println(resultadoBusqueda)
                }
                4 -> {
                    println("Ingresa el ID del Catalogo que deseas actualizar:")
                    val idActualizar = readLine() ?: ""
                    val resultadoActualizacion = catalogoController.actualizarCatalogo(idActualizar)
                    println(resultadoActualizacion)
                }
                5 -> {
                    println("Ingresa el ID del Catalogo que deseas eliminar:")
                    val idEliminar = readLine() ?: ""
                    val resultadoEliminacion = catalogoController.eliminarCatalogo(idEliminar)
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