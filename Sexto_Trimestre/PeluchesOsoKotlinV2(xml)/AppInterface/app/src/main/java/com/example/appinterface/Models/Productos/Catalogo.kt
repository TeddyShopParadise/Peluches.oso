package Models.Productos

class Catalogo (private var NombreCatalogo: String,  private var DescripcionCatalogo: String, private var DisponibilidadCatalogo: Boolean, private var EstiloCatalogo: String){

    fun Catalogo(nombreCatalogo: String, descripcionCatalogo: String, disponibilidadCatalogo: Boolean, estiloCatalogo: String){
        this.NombreCatalogo = nombreCatalogo
        this.DescripcionCatalogo = descripcionCatalogo
        this.DisponibilidadCatalogo = disponibilidadCatalogo
        this.EstiloCatalogo = estiloCatalogo
    }


    fun getNombreCatalogo(): String {
        return NombreCatalogo
    }

    fun getDescripcionCatalogo(): String {
        return DescripcionCatalogo
    }

    fun getDisponibilidadCatalogo(): Boolean {
        return DisponibilidadCatalogo
    }

    fun getEstiloCatalogo(): String {
        return EstiloCatalogo
    }

    fun setNombreCatalogo(nombreCatalogo: String){
        this.NombreCatalogo = nombreCatalogo
    }

    fun setDescripcionCatalogo(descripcionCatalogo: String){
        this.DescripcionCatalogo = descripcionCatalogo
    }

    fun setDisponibilidadCatalogo(disponibilidadCatalogo: Boolean){
        this.DisponibilidadCatalogo = DisponibilidadCatalogo
    }

    fun setEstiloCatalogo(estiloCatalogo: String){
        this.EstiloCatalogo = estiloCatalogo
    }

}