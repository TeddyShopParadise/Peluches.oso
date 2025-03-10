package Models.Usuarios

class Clientes (private var DniCliente: Int, private var NombreCliente: String, private var TelefonoCliente: Int, private var ApellidoCliente: String){

    fun Clientes(dniCliente: Int, nombreCliente: String, telefonoCliente: Int, apellidoCliente: String){
        this.DniCliente = dniCliente
        this.NombreCliente = nombreCliente
        this.TelefonoCliente = telefonoCliente
        this.ApellidoCliente = apellidoCliente
    }

    fun getDniCliente(): Int{
        return DniCliente
    }

    fun getNombreCliente(): String{
        return NombreCliente
    }

    fun getTelefonoCliente(): Int{
        return TelefonoCliente
    }

    fun getApellidoCliente(): String{
        return ApellidoCliente
    }
}