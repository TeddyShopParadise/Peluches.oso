package Models.Usuarios

class Empleados(private var DniEmpleado: Int, private var TelefonoEmpleado: Int, private var CodigoEmpleado: String, private var NombreEmpleado: String) {

    fun Empleados(dniEmpleado: Int, telefonoEmpleado: Int, codigoEmpleado: String, nombreEmpleado: String){
        this.DniEmpleado = dniEmpleado
        this.TelefonoEmpleado = telefonoEmpleado
        this.CodigoEmpleado = codigoEmpleado
        this.NombreEmpleado = nombreEmpleado
    }

    fun getDniEmpleado(): Int{
        return DniEmpleado
    }

    fun getTelefonoEmpleado(): Int{
        return TelefonoEmpleado
    }

    fun getCodigoEmpleado(): String{
        return CodigoEmpleado
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

    fun setCodigoEmpleado(codigoEmpleado: String) {
        this.CodigoEmpleado = codigoEmpleado
    }

    fun setNombreEmpleado(nombreEmpleado: String) {
        this.NombreEmpleado = nombreEmpleado
    }

}