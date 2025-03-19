package Models

class Compania (private var NIT: String = "1033803030", private var TelefonoEmpresa: String = "3103221166", private var NombreEmpresa: String = "Peluches.oso", private var DireccionEmpresa: String = "Calle 46 #3b-47"){

    fun Compania(nit: String, telefonoEmpresa: String, nombreEmpresa: String, direccionEmpresa: String){
        this.NIT = nit
        this.TelefonoEmpresa = telefonoEmpresa
        this.NombreEmpresa = nombreEmpresa
        this.DireccionEmpresa = direccionEmpresa
    }

    fun getNIT(): String{
        return NIT
    }

    fun getTelefonoEmpresa(): String{
        return TelefonoEmpresa
    }

    fun getNombreEmpresa(): String{
        return NombreEmpresa
    }

    fun getDireccionEmpresa(): String{
        return DireccionEmpresa
    }
}