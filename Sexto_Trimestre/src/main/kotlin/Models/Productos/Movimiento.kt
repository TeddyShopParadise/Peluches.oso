package Models.Productos

class Movimiento (private var Fecha: String, private var CantidadIngreso: Int, private var CantidadVendida: Int){

    fun Movimiento(fecha: String, cantidadIngreso: Int, cantidadVendida: Int){
        this.Fecha = fecha
        this.CantidadIngreso = cantidadIngreso
        this.CantidadVendida = cantidadVendida
    }

    fun getFecha(): String{
        return Fecha
    }

    fun getCantidadIngreso(): Int{
        return CantidadIngreso
    }

    fun getCantidadVendida(): Int{
        return CantidadVendida
    }
}