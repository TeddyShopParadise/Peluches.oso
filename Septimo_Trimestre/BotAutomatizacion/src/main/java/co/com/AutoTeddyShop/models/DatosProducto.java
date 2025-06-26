package co.com.AutoTeddyShop.models;

public class DatosProducto {
    private int id;
    private String estiloProducto;
    private int disponibilidadProducto;
    private String tamañoProducto;
    private String imagen;

    public DatosProducto() {}

    public DatosProducto(int id, String estiloProducto, int disponibilidadProducto, String tamañoProducto, String imagen ) {
        this.id = id;
        this.estiloProducto = estiloProducto;
        this.disponibilidadProducto = disponibilidadProducto;
        this.tamañoProducto = tamañoProducto;
        this.imagen = imagen;
    }

    public int getId() {
        return id;
    }

    public String getEstiloProducto() {
        return estiloProducto;
    }

    public int getDisponibilidadProducto() {
        return disponibilidadProducto;
    }

    public String getTamañoProducto() {
        return tamañoProducto;
    }

    public String getImagen() {
        return imagen;
    }




    public void setEstiloProducto(String estiloProducto) {
        this.estiloProducto = estiloProducto;
    }

    public void setDisponibilidadProducto(int disponibilidadProducto) {
        this.disponibilidadProducto = disponibilidadProducto;
    }

    public void setTamañoProducto(String tamañoProducto) {
        this.tamañoProducto = tamañoProducto;
    }

}
