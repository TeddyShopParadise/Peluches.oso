package co.com.AutoTeddyShop.models;

public class DatosLogin {
    private String usuarios;
    private String clave;

    public DatosLogin() {}

    public DatosLogin(String usuarios, String clave) {
        this.usuarios = usuarios;
        this.clave    = clave;
    }

    public String getUsuario() { return usuarios; }
    public String getContrasena() { return clave; }
}
