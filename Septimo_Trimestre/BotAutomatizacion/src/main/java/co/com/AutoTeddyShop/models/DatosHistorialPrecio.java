package co.com.AutoTeddyShop.models;


public class DatosHistorialPrecio {

    private String precioHistorialPrecio;

    private String fechaInicio;

    private String fechaFinal;

    public DatosHistorialPrecio(){}

    public DatosHistorialPrecio(String PrecioHistorialPrecio, String FechaInicio, String FechaFinal){
        this.precioHistorialPrecio = PrecioHistorialPrecio;
        this.fechaInicio = FechaInicio;
        this.fechaFinal = FechaFinal;
    }

    public String getPrecioHistorialPrecio() {

        return precioHistorialPrecio; }


    public String getFechaInicio() {

        return fechaInicio; }

    public String getFechaFinal() {

        return fechaFinal; }



}
