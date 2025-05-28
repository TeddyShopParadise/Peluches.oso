package co.com.AutoTeddyShop.models;

public class DatosUsuario {
    private String email;
    private String contrasena;
    private String nombreUsuario;


    // Constructor
    public DatosUsuario(String email, String contrasena, String nombreUsuario) {
        this.email = email;
        this.contrasena = contrasena;
        this.nombreUsuario = nombreUsuario;

    }

    // Getters y Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }

    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }


}