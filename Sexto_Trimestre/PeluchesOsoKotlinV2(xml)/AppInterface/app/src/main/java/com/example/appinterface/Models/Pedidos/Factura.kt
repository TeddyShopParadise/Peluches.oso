package Models.Pedidos

class Factura(
    private var fechaCreacionFactura: String,
    private var horaCreacionFactura: String,
    private var montoTotal: Double // <-- Agregado
) {
    fun getFechaCreacionFactura(): String {
        return fechaCreacionFactura
    }

    fun getHoraCreacionFactura(): String {
        return horaCreacionFactura
    }

    fun getMontoTotal(): Double { // <-- Agregado
        return montoTotal
    }

    fun setFechaCreacionFactura(nuevaFecha: String) {
        this.fechaCreacionFactura = nuevaFecha
    }

    fun setHoraCreacionFactura(nuevaHora: String) {
        this.horaCreacionFactura = nuevaHora
    }

    fun setMontoTotal(nuevoMonto: Double) { // <-- Agregado
        this.montoTotal = nuevoMonto
    }
}
