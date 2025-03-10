package Models.Pedidos

class DetalleFactura (private var NumDetalle: Int, private var PrecioDetalleFactura: Double, private var CantidadDetallePedido: Int ){

    fun DetalleFactura(numDetalle: Int, precioDetalleFactura: Double, cantidadDetalleFactura: Int){
        this.NumDetalle = numDetalle
        this.PrecioDetalleFactura = precioDetalleFactura
        this.CantidadDetallePedido = cantidadDetalleFactura
    }

    fun getNumDetalle(): Int{
        return NumDetalle
    }

    fun getPrecioDetalleFactura(): Double{
        return PrecioDetalleFactura
    }

    fun getCantidadDetallePedido(): Int{
        return CantidadDetallePedido
    }
}