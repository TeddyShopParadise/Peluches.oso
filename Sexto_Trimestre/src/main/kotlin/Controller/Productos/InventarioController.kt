package Controller.Productos

import Models.Productos.Inventario
import java.util.*

class InventarioController {

    private val inventarios = mutableMapOf<String, Inventario>()

    //Crear un inventario
    fun crearInventario(): String {
        println("Ingrese el Stock Minimo:")
        val stockMinimo = readln().toInt()

        println("ingrese el precio de venta:")
        val precioVenta = readln().toDouble()

        println("Ingrese el precio de compra:")
        val precioCompra = readln().toDouble()

        println("Ingrese el Stock:")
        val stock = readln().toInt()

        println("Ingrese el Stock Maximo")
        val stockMaximo = readln().toInt()

        val id = UUID.randomUUID().toString()
        val inventario = Inventario(stockMinimo, precioVenta, precioCompra, stock, stockMaximo)

        inventarios[id] = inventario
        return  "Inventario creado con exito"
    }

    //Listar todos los inventarios
    fun ListarInventarios(): String{
        if (inventarios.isEmpty()){
            return "No hay Inventarios Disponibles"
        }

        return inventarios.entries.joinToString ( "\n") {
            "ID: ${it.key}, Stock Minimo: ${it.value.getStockMinimo()}, Precio de Venta: ${it.value.getPrecioVenta()}, Precio de Compra: ${it.value.getPrecioCompra()}, Stock: ${it.value.getStock()}, Stock Maximo: ${it.value.getStockMaximo()}"
        }
    }

    //Actualizar un inventario por ID
    fun actualizarInventario(id: String): String{
        val inventario = inventarios[id]
        if (inventario != null){
            println("Ingrese el nuevo Stock Minimo: (actual: ${inventario.getStockMinimo()})")
            val nuevoStockMinimo = readln().toInt()

            println("ingrese el nuevo precio de venta: (actual")
            val nuevoPrecioVenta = readln().toDouble()

            println("Ingrese el nuevo precio de compra:")
            val nuevoPrecioCompra = readln().toDouble()

            println("Ingrese el nuevo Stock:")
            val nuevoStock = readln().toInt()

            println("Ingrese el nuevo Stock Maximo")
            val nuevoStockMaximo = readln().toInt()

            inventarios[id] = Inventario(nuevoStockMinimo, nuevoPrecioVenta, nuevoPrecioCompra, nuevoStock, nuevoStockMaximo)
            return "Inventario actualizado con exito."

        } else {
            return "el inventario no se encontro con el id: $id"
        }
    }

    // Eliminar un producto por ID
    fun eliminarInventario(id: String): String {
        return if (inventarios.remove(id) != null) {
            "Inventario eliminado con éxito."
        } else {
            "Inventario no encontrado."
        }
    }
}