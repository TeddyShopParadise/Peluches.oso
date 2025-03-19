package Models.Usuarios

class Roles (private var Estado: Boolean, private var Nombre: String){
    fun Roles(estado: Boolean, nombre: String){
        this.Estado = estado
        this.Nombre = nombre
    }

    fun getEstado(): Boolean{
        return Estado
    }

    fun getNombre(): String{
        return Nombre
    }

    fun setEstado(estado: Boolean){
        this.Estado = estado
    }

    fun setNombre(nombre: String){
        this.Nombre = nombre
    }
}
