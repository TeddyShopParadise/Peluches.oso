package Models.Productos

class Inventario (private var StockMinimo: Int, private var PrecioVenta: Double, private var PrecioCompra: Double, private var Stock:  Int, private var StockMaximo: Int){

    fun Inventario(stockMinimo: Int, precioVenta: Double, precioCompra: Double, stock: Int, stockMaximo: Int ){
        //this.IdInventario = idInventario
        this.StockMinimo = stockMinimo
        this.PrecioVenta = precioVenta
        this.PrecioCompra = precioCompra
        this.Stock = stock
        this.StockMaximo = stockMaximo
    }

    /*fun getIdInventario(): Int{
        return IdInventario
    }*/

    fun getStockMinimo(): Int {
        return StockMinimo
    }

    fun getPrecioVenta(): Double{
        return PrecioVenta
    }

    fun getPrecioCompra(): Double{
        return PrecioCompra
    }

    fun getStock(): Int{
        return Stock
    }

    fun getStockMaximo(): Int{
        return StockMaximo
    }
}