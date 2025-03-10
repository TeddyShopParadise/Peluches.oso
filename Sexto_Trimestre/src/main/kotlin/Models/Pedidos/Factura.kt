package Models.Pedidos

class Factura (private var FechaCreacionFactura: String, private var HoraCreacionFacura: String) {

    fun Factura(fechaCreacionFactura: String, horaCreacionFactura: String){
        this.FechaCreacionFactura = fechaCreacionFactura
        this.HoraCreacionFacura = horaCreacionFactura
    }

    fun getFechaCreacionFactura(): String{
        return FechaCreacionFactura
    }

    fun getHoraCreacionFacura(): String{
        return HoraCreacionFacura
    }
}