package Models.Productos

class Producto (private var EstiloProducto: String, private var MaterialProducto: String, private var TamañoProducto: String, private var DisponibilidadProducto: Boolean) {

    fun Producto(estiloProducto: String, materialProducto: String, tamañoProducto: String, disponibildadProducto: Boolean){
        this.EstiloProducto = estiloProducto
        this.MaterialProducto = materialProducto
        this.TamañoProducto = tamañoProducto
        this.DisponibilidadProducto = disponibildadProducto
    }

    fun getEstiloProducto(): String{
        return EstiloProducto
    }

    fun getMaterialProducto(): String{
        return MaterialProducto
    }

    fun getTamañoProducto(): String{
        return TamañoProducto
    }

    fun getDisponibilidadProducto(): Boolean{
        return DisponibilidadProducto
    }


    fun setEstiloProducto(estiloProducto: String) {
        this.EstiloProducto = estiloProducto
    }

    fun setMaterialProducto(materialProducto: String) {
        this.MaterialProducto = materialProducto
    }

    fun setTamañoProducto(tamañoProducto: String) {
        this.TamañoProducto = tamañoProducto
    }

    fun setDisponibilidadProducto(disponibilidadProducto: Boolean) {
        this.DisponibilidadProducto = disponibilidadProducto
    }
}

    //fun arreglo() {
    //    var arregloProducto = (mutableSetOf<String>(estiloProducto, materialProducto, tamañoProducto))
    //    println("Los datos del arreglo son: ")
    //    for (i in arregloProducto) {
    //        println(i)
    //    }
    //}

    //fun matriz() {
    //    var matrizProductos = arrayOf(
    //        arrayOf("Oso negro", "Algodon", "80cm"),
    //        arrayOf("Oso blanco", "Algodon Siliconado", "90cm"),
    //        arrayOf("Oso Cafe", "Algodon", "100cm")
    //    )
    //    println("\nLos datos de la matriz son: ")

    //    for (i in matrizProductos) {
    //        println("Estilo: ${i[0]}, Material: ${i[1]}, Tamaño: ${i[2]}")
    //    }
    //}

//fun matriz2(){
//    print("Cuantos productos quieres agregar: ")
//    val cantidad = readln().toInt()
//
//    val productos = Array(cantidad) { Producto("", "", "")}
//
//    for(i in 0 until cantidad){
//        println("Ingresa los datos del producto ${i + 1}: ")
//
//        print("Estilo Producto: ")
//        val estiloProducto = readln()
//
//        print("Material: ")
//        val materialProducto = readln()
//
//        print("Tamaño: ")
//        val tamañoProducto = readln()
//
//        productos[i] = Producto(estiloProducto, materialProducto, tamañoProducto)
//    }
//
//    println("Los datos de los productos ingresados son: ")
//    for(i in productos){
//        println("Estilo: ${i.estiloProducto}, Material: ${i.materialProducto}, Tamaño: ${i.tamañoProducto}")
//    }
//}
