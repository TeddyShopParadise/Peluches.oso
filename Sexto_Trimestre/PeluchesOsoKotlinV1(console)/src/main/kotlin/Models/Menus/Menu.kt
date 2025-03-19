package Models.Menus

import Servicios.*

import Controllers.Productos.ProductoController

class Menu {

    fun menus() {
        println("Bienvenido a TeddyShop")
        println("¿Desea iniciar sesión?\n1. Si\n2. No")
        val opcion = readln().toInt()

        when (opcion) {
            1 -> manejarSesion()
            2 -> println("Gracias por usar TeddyShop. ¡Hasta luego!")
            else -> println("Opción no válida. Intenta nuevamente.")
        }
    }

    private fun manejarSesion() {
        println("\nSeleccione su rol:\n1. Administrador\n2. Empleado")
        val rol = readln().toInt()

        when (rol) {
            1 -> menuAdministrador()
            2 -> menuEmpleado()
            else -> println("Opción no válida. Intenta nuevamente.")
        }
    }

    private fun menuAdministrador() {
        println("\nLista de funciones:\n1. Administrar productos\n2. Administrar pedido\n3. Administrar usuarios")
        val opcionAdm = readln().toInt()

        when (opcionAdm) {
            1 -> gestionarProductosAdmin()
            2 -> gestionarPedidosAdmin()
            3 -> gestionarUsuariosAdmin()
            else -> println("Opción no válida. Intenta nuevamente.")
        }
    }

    private fun menuEmpleado() {
        println("\nLista de funciones:\n1. Administrar productos\n2. Administrar pedido")
        val opcionEmp = readln().toInt()

        when (opcionEmp) {
            1 -> gestionarProductosEmpleado()
            2 -> gestionarPedidosEmpleado()
            else -> println("Opción no válida. Intenta nuevamente.")
        }
    }

    // Funciones para Administrador
    private fun gestionarProductosAdmin() {
        println("\nGestionar productos:\n1. Administrar catalogos\n2. Administrar categoria\n3. Administrar productos\n4. Administrar historial precio\n5. Administrar inventario\n6. Administrar movimientos")
        val opcion = readln().toInt()

        when (opcion) {
            1 -> administrarCatalogos()
            2 -> administrarCategorias()
            3 -> administrarProductos()
            4 -> administrarHistorialPrecios()
            5 -> println("")
            6 -> administrarMovimientos()
        }
    }

    private fun gestionarPedidosAdmin() {
        println("\nGestionar pedidos:\n1. Administrar facturas\n2. Administrar detalle factura\n3. Administrar pedido\n4. Administrar detalle pedido\n5. Administrar devoluciones\n6. Administrar metodo pago")
        val opcion = readln().toInt()

        when (opcion) {
            1 -> administrarFacturas()
            2 -> administrarDetalleFactura()
            3 -> administrarDetallePedido()
            4 -> println("")
            5 -> println("")
        }
    }

    private fun gestionarUsuariosAdmin() {
        println("\nGestionar usuarios:\n1. Administrar roles\n2. Administrar usuarios\n3. Administrar empleados")
    }

    // Funciones para Empleado
    private fun gestionarProductosEmpleado() {
        println("\nGestionar productos:\n1. Listar catalogos\n2. Listar categoria\n3. Listar productos\n4. Listar historial precio\n5. Listar inventario")
    }

    private fun gestionarPedidosEmpleado() {
        println("\nGestionar pedidos:\n1. Listar facturas\n2. Listar detalle factura\n3. Listar pedido\n4. Listar detalle pedido\n5. Listar devoluciones")
    }

    private fun administrarProductos() {
        val adminProductos = ProductoService()
        adminProductos.AdminProductos()
    }

    private fun administrarMovimientos() {
        val adminMovimientos = MovimientoService()
        adminMovimientos.AdminMovimientos()
    }

    private fun administrarHistorialPrecios() {
        val adminHistorialPrecio = HistorialPrecioService()
        adminHistorialPrecio.AdminHistorialPrecios()
    }

    private fun administrarCatalogos() {
        val adminCatalogo = CatalogoService()
        adminCatalogo.AdminCatalogos()
    }

    private fun administrarCategorias() {
        val adminCategorias = CategoriaService()
        adminCategorias.AdminCategorias()
    }

    private fun administrarFacturas() {
        val adminFacturas = DetalleFacturaService()
        adminFacturas.AdminDetallesFactura()
    }

    private fun administrarDetalleFactura() {
        val adminDetalleFactura = DetalleFacturaService()
        adminDetalleFactura.AdminDetallesFactura()
    }


    private fun administrarDetallePedido() {
        val adminDetallePedido = DetallePedidoService()
        adminDetallePedido.AdminDetallesPedido()
    }
}
