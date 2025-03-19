package Models.Productos

class HistorialPrecio(private var Precio: Double?, private var FechaInicio: String, private var FechaFin: String, private var EstadoPrecio: Boolean) {

    fun HistorialPrecio(precio: Double, fechaInicio: String, fechaFin: String, estadoPrecio: Boolean){
        this.Precio  = precio
        this.FechaInicio = fechaInicio
        this.FechaFin = fechaFin
        this.EstadoPrecio = estadoPrecio
    }

    fun getPrecio(): Double? {
        return Precio
    }

    fun getFechaInicio(): String {
        return FechaInicio
    }

    fun getFechaFin(): String {
        return FechaFin
    }

    fun getEstadoPrecio(): Boolean {
        return EstadoPrecio
    }

    fun setPrecio(precio: Double?){
        this.Precio = precio
    }

    fun setFechaInicio(fechaInicio: String){
        this.FechaInicio = fechaInicio
    }

    fun setFechaFin(fechaFin: String){
        this.FechaFin = fechaFin
    }

    fun setEstadoPrecio(estadoPrecio: Boolean){
        this.EstadoPrecio = estadoPrecio
    }
}