package Models.Pedidos

class Devoluciones (/*private var IdDevolucion : Int,*/ private var DetalleDevolucion : String){

    fun Devoluciones(/*idDevolucion: Int,*/ detalleDevolucion: String){
        //this.IdDevolucion = idDevolucion
        this.DetalleDevolucion = detalleDevolucion
    }

    //fun getIdDevolucion(): Int{
    //    return IdDevolucion
    //}

    fun getDetalleDevolucion(): String {
        return DetalleDevolucion
    }

    //fun setIdDevolucion(idDevolucion: Int){
    //    this.IdDevolucion = idDevolucion
    //}

    fun setDetalleDevolucion(detalleDevolucion: String){
        this.DetalleDevolucion = detalleDevolucion
    }
}