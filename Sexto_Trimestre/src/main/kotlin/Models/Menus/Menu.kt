package Models.Menus

class Menu {
    fun menus (){
        println("Bienvenido a TeddyShop")
        println("¿Desea iniciar sesión?\n1. Si\n2. No")
        val opcion = readln().toInt()

        if(opcion == 1){
            println("\nSeleccione su rol:\n1. Administrador\n2. Empleado")
            val rol = readln().toInt()

            if(rol == 1){
                println("\nLista de funciones:\n1. Administrar productos\n2. Administrar pedido\n3. Administrar usuarios")
                val opcionAdm = readln().toInt()
                when(opcionAdm){
                    1 -> (
                            println("\nGestionar productos:\n1. Administrar catalogos\n2. Administrar categoria\n3. Administrar productos\n4.  Administrar historial precio\n5. Administrar inventario")
                            )
                    2 -> (
                            println("\nGestionar pedidos:\n1. Administrar facturas\n2.  Administrar detalle factura\n3. Administrar pedido\n4.  Administrar detalle pedido\n5.  Administrar devoluciones\n6.  Administrar metodo pago")
                            )
                    3 -> (
                            println("\nGestionar usuarios:\n1. Administrar roles\n2. Administrar usuarios\n3. Administrar empleados")
                            )
                }
            } else {
                println("\nLista de funciones:\n1. Administrar productos\n2. Administrar pedido")
                val opcionEmp = readln().toInt()

                when(opcionEmp){
                    1 -> (
                            println("\nGestionar productos:\n1. Listar catalogos\n2. Listar categoria\n3. Listar productos\n4. Listar historial precio\n5. Listar inventario")
                            )
                    2 -> (
                            println("\nGestionar pedidos:\n1. Listar facturas\n2. Listar detalle factura\n3. Listar pedido\n4. Listar detalle pedido\n5. Listar devoluciones")
                            )
                }
            }
        } else {
            //Funciones usuarios
        }
    }
}