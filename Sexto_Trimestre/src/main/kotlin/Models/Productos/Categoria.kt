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
}