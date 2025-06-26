package co.com.AutoTeddyShop.models;

public class DatosInventario {
    private int stockInicial;
    private int stockMinimo;
    private int stockMaximo;
    private double precioVenta;
    private double precioCompra;

    public DatosInventario() {}

    public DatosInventario(int stockInicial, int stockMinimo, int stockMaximo, double precioVenta, double precioCompra) {
        this.stockInicial = stockInicial;
        this.stockMinimo = stockMinimo;
        this.stockMaximo = stockMaximo;
        this.precioVenta = precioVenta;
        this.precioCompra = precioCompra;
    }

    public int getStockInicial() {
        return stockInicial;
    }

    public int getStockMinimo() {
        return stockMinimo;
    }

    public int getStockMaximo() {
        return stockMaximo;
    }

    public double getPrecioVenta() {
        return precioVenta;
    }

    public double getPrecioCompra() {
        return precioCompra;
    }
}
