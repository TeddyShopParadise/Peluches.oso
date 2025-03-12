package Controller

import Models.Compania

class CompaniaController {
    private var compania = Compania()

    fun mostrarInformacion() {
        println("\n--- Información de la Compañía ---")
        println("NIT: ${compania.getNIT()}")
        println("Teléfono: ${compania.getTelefonoEmpresa()}")
        println("Nombre: ${compania.getNombreEmpresa()}")
        println("Dirección: ${compania.getDireccionEmpresa()}")
    }

    fun actualizarInformacion() {
        println("\nIngrese los nuevos datos de la compañía:")

        print("Nuevo NIT: ")
        val nuevoNit = readln()

        print("Nuevo Teléfono: ")
        val nuevoTelefono = readln()

        print("Nuevo Nombre: ")
        val nuevoNombre = readln()

        print("Nueva Dirección: ")
        val nuevaDireccion = readln()

        compania = Compania(nuevoNit, nuevoTelefono, nuevoNombre, nuevaDireccion)

        println("\nInformación de la compañía actualizada correctamente.")
    }

    fun menuCompania() {
        while (true) {
            println("\n--- Menú de Compañía ---")
            println("1. Mostrar información de la compañía")
            println("2. Actualizar información de la compañía")
            println("3. Salir")
            print("Seleccione una opción: ")

            when (readln().toIntOrNull()) {
                1 -> mostrarInformacion()
                2 -> actualizarInformacion()
                3 -> {
                    println("Saliendo del menú de compañía...")
                    break
                }
                else -> println("Opción no válida, intente nuevamente.")
            }
        }
    }
}
