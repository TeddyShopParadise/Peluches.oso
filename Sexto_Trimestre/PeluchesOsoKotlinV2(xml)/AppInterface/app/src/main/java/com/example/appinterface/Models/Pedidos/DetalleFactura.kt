package Models.Pedidos

class DetalleFactura(
    private var numFactura: Int,  // Nuevo campo
    private var numDetalle: Int,
    private var precioDetalleFactura: Double,
    private var cantidadDetallePedido: Int
) {
    // Métodos GET
    fun getNumFactura(): Int {  // Nuevo getter
        return numFactura
    }

    fun getNumDetalle(): Int {
        return numDetalle
    }

    fun getPrecioDetalleFactura(): Double {
        return precioDetalleFactura
    }

    fun getCantidadDetallePedido(): Int {
        return cantidadDetallePedido
    }

    // Métodos SET
    fun setNumFactura(numFactura: Int) {  // Nuevo setter
        this.numFactura = numFactura
    }

    fun setNumDetalle(numDetalle: Int) {
        this.numDetalle = numDetalle
    }

    fun setPrecioDetalleFactura(precioDetalleFactura: Double) {
        this.precioDetalleFactura = precioDetalleFactura
    }

    fun setCantidadDetallePedido(cantidadDetallePedido: Int) {
        this.cantidadDetallePedido = cantidadDetallePedido
    }
}
