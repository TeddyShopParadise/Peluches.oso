package Models.Productos

class Categoria (private var NombreCategoria: String, private var DescripcionCategoria: String){
    fun Categoria(nombreCategoria: String, descripcionCategoria: String){
        this.NombreCategoria = nombreCategoria
        this.DescripcionCategoria = descripcionCategoria
    }

    fun getNombreCategoria(): String {
        return NombreCategoria
    }

    fun getDescripcionCategoria(): String {
        return DescripcionCategoria
    }

    fun setNombreCategoria(nombreCategoria: String) {
        this.NombreCategoria = nombreCategoria
    }

    fun setDescripcionCategoria(descripcionCategoria: String) {
        this.DescripcionCategoria = descripcionCategoria
    }
}