package Models.Productos

class Categoria(private var nombreCategoria: String, private var descripcionCategoria: String) {

    fun getNombreCategoria(): String {
        return nombreCategoria
    }

    fun getDescripcionCategoria(): String {
        return descripcionCategoria
    }

    fun setNombreCategoria(nombreCategoria: String) {
        this.nombreCategoria = nombreCategoria
    }

    fun setDescripcionCategoria(descripcionCategoria: String) {
        this.descripcionCategoria = descripcionCategoria
    }
}