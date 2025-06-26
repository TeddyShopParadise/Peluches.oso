package co.com.AutoTeddyShop.models;

public class DatosCompraProducto {

    private String nombrePaga;
    private String telefonoPaga;
    private String nombreRecibe;
    private String telefonoRecibe;
    private String direccion;
    private String barrio;
    private String localidad;

    public String getNombrePaga() {
        return nombrePaga;
    }

    public void setNombrePaga(String nombrePaga) {
        this.nombrePaga = nombrePaga;
    }

    public String getTelefonoPaga() {
        return telefonoPaga;
    }

    public void setTelefonoPaga(String telefonoPaga) {
        this.telefonoPaga = telefonoPaga;
    }

    public String getNombreRecibe() {
        return nombreRecibe;
    }

    public void setNombreRecibe(String nombreRecibe) {
        this.nombreRecibe = nombreRecibe;
    }

    public String getTelefonoRecibe() {
        return telefonoRecibe;
    }

    public void setTelefonoRecibe(String telefonoRecibe) {
        this.telefonoRecibe = telefonoRecibe;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getBarrio() {
        return barrio;
    }

    public void setBarrio(String barrio) {
        this.barrio = barrio;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public DatosCompraProducto(
            String nombrePaga, String telefonoPaga,
            String nombreRecibe, String telefonoRecibe,
            String direccion, String barrio, String localidad){
        this.nombrePaga = nombrePaga;
        this.telefonoPaga = telefonoPaga;
        this.nombreRecibe = nombreRecibe;
        this.telefonoRecibe = telefonoRecibe;
        this.direccion = direccion;
        this.barrio = barrio;
        this.localidad = localidad;
    }
}
