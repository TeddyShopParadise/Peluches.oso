package co.com.AutoTeddyShop.models;

import java.io.File;
import java.nio.file.Path;

public class DatosCatalogos {

    private String nombreCatalogo;
    private String descripcionCatalogo;
    //private File imagen;

    public String getNombreCatalogo() {
        return nombreCatalogo;
    }

    public void setNombreCatalogo(String nombreCatalogo) {
        this.nombreCatalogo = nombreCatalogo;
    }

    public String getDescripcionCatalogo() {
        return descripcionCatalogo;
    }

    public void setDescripcionCatalogo(String descripcionCatalogo) {
        this.descripcionCatalogo = descripcionCatalogo;
    }

    //public Path getImagenPath() {
    //    return imagen.toPath();
    //}
//
    //public void setImagen(File imagen) {
    //    this.imagen = imagen;
    //}

    public DatosCatalogos(String nombreCatalogo, String descripcionCatalogo, File imagen) {
        this.nombreCatalogo = nombreCatalogo;
        this.descripcionCatalogo = descripcionCatalogo;
        //this.imagen = imagen;
    }
}
