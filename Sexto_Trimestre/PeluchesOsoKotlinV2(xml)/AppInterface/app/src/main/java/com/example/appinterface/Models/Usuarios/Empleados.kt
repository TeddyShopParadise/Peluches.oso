package Models.Usuarios

class Empleados(private var DniEmpleado: Int, private var TelefonoEmpleado: Int, private var NombreEmpleado: String) {

    fun Empleados(dniEmpleado: Int, telefonoEmpleado: Int, nombreEmpleado: String){
        this.DniEmpleado = dniEmpleado
        this.TelefonoEmpleado = telefonoEmpleado
        this.NombreEmpleado = nombreEmpleado
    }

    fun getDniEmpleado(): Int{
        return DniEmpleado
    }

    fun getTelefonoEmpleado(): Int{
        return TelefonoEmpleado
    }


    fun getNombreEmpleado(): String{
        return NombreEmpleado
    }

    fun setDniEmpleado(dniEmpleado: Int) {
        this.DniEmpleado = dniEmpleado
    }

    fun setTelefonoEmpleado(telefonoEmpleado: Int) {
        this.TelefonoEmpleado = telefonoEmpleado
    }

    fun setNombreEmpleado(nombreEmpleado: String) {
        this.NombreEmpleado = nombreEmpleado
    }

}