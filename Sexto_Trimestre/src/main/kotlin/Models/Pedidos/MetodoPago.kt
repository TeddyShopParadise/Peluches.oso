package Models.Pedidos

class MetodoPago (private var NombreMetodoPago: String) {
    fun MetodoPago(nombreMetodoPago: String){
        this.NombreMetodoPago = nombreMetodoPago
    }

    fun getNombreMetodoPago(): String{
        return NombreMetodoPago
    }

    fun setNombreMetodoPago(nombreMetodoPago: String){
        this.NombreMetodoPago = nombreMetodoPago
    }
}