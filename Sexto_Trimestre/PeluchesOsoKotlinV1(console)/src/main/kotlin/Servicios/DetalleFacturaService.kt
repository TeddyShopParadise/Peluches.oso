package Servicios

import Controller.Pedidos.DetalleFacturaController

class DetalleFacturaService {
    fun AdminDetallesFactura() {
        val detalleFacturaController = DetalleFacturaController()
        while (true) {
            println("\n¿Qué deseas hacer?")
            println("1. Crear un nuevo detalle de factura")
            println("2. Listar todos los detalles de factura")
            println("3. Buscar un detalle de factura por ID")
            println("4. Actualizar un detalle de factura por ID")
            println("5. Eliminar un detalle de factura por ID")
            println("6. Salir")

            val opcion = readLine()?.toIntOrNull()

            when (opcion) {
                1 -> {
                    val resultado = detalleFacturaController.crearDetalleFactura()
                    println(resultado)
                }
                2 -> {
                    val detallesListados = detalleFacturaController.listarDetallesFactura()
                    println(detallesListados)
                }
                3 -> {
                    println("Ingresa el ID del detalle de factura que deseas buscar:")
                    val idDetalle = readLine() ?: ""
                    val resultadoBusqueda = detalleFacturaController.buscarDetalleFacturaPorId(idDetalle)
                    println(resultadoBusqueda)
                }
                4 -> {
                    println("Ingresa el ID del detalle de factura que deseas actualizar:")
                    val idActualizar = readLine() ?: ""
                    val resultadoActualizacion = detalleFacturaController.actualizarDetalleFactura(idActualizar)
                    println(resultadoActualizacion)
                }
                5 -> {
                    println("Ingresa el ID del detalle de factura que deseas eliminar:")
                    val idEliminar = readLine() ?: ""
                    val resultadoEliminacion = detalleFacturaController.eliminarDetalleFactura(idEliminar)
                    println(resultadoEliminacion)
                }
                6 -> {
                    println("¡Gracias por usar el sistema de gestión de facturas! Hasta luego.")
                    break
                }
                else -> {
                    println("Opción no válida, por favor elige una opción entre 1 y 6.")
                }
            }
        }
    }
}