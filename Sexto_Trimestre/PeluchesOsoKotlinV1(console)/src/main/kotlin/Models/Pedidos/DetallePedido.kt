package Models.Pedidos

class DetallePedido (private var NumDetallePedido : Int, private var PrecioDetallePedido : Double, private var CantidadDetallePedido : Int, ){

    fun DetallePedido(numDetallePedido: Int, precioDetallePedido: Double, cantidadDetallePedido: Int ){
        this.NumDetallePedido = numDetallePedido
        this.PrecioDetallePedido = precioDetallePedido
        this.CantidadDetallePedido = cantidadDetallePedido
    }

    fun getNumDetallePedido(): Int {
        return NumDetallePedido
    }

    fun getPrecioDetallePedido(): Double {
        return PrecioDetallePedido
    }

    fun getCantidadDetallePedido(): Int {
        return CantidadDetallePedido
    }

}