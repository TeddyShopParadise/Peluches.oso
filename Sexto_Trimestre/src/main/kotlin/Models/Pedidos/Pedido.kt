package Models.Pedidos

class Pedido (private var TamañoOso: String, private var NombreComprador: String, private var ApellidoComprador: String, private var NumeroComprador: Int, private var NombreAgendador: String, private var ApellidoAgendador: String, private var NumeroAgendador: Int, private var Localidad: String, private var Direccion: String, private var Barrio: String){
   fun Pedido(tamañoOso: String, nombreComprador: String, apellidoComprador: String, numeroComprador: Int, nombreAgendador: String, apellidoAgendador: String, numeroAgendador: Int, localidad: String, direccion: String, barrio: String){
      this.TamañoOso = tamañoOso
      this.NombreComprador = nombreComprador
      this.ApellidoComprador = apellidoComprador
      this.NumeroComprador = numeroComprador
      this.NombreAgendador = nombreAgendador
      this.ApellidoAgendador = apellidoAgendador
      this.NumeroAgendador = numeroAgendador
      this.Localidad = localidad
      this.Direccion = direccion
      this.Barrio = barrio
   }

   fun getTamañoOso(): String{
      return TamañoOso
   }

   fun getNombreComprador(): String {
      return NombreComprador
   }

   fun getApellidoComprador(): String{
      return ApellidoComprador
   }

   fun getNumeroComprador(): Int {
      return NumeroComprador
   }

   fun getNombreAgendador(): String {
      return NombreAgendador
   }

   fun getApellidoAgendador(): String {
      return ApellidoAgendador
   }

   fun getNumeroAgendador(): Int {
      return NumeroAgendador
   }

   fun getLocalidad(): String{
      return Localidad
   }

   fun getDireccion(): String {
      return Direccion
   }

   fun getBarrio(): String {
      return Barrio
   }


   fun setTamañoOso(tamañoOso: String) {
      this.TamañoOso = tamañoOso
   }

   fun setNombreComprador(nombreComprador: String){
      this.NombreComprador = nombreComprador
   }

   fun setApellidoComprador(apellidoComprador: String){
      this.ApellidoComprador = apellidoComprador
   }

   fun setNumeroComprador(numeroComprador: Int){
      this.NumeroComprador = numeroComprador
   }

   fun setNombreAgendador(nombreAgendador: String){
      this.NombreAgendador = nombreAgendador
   }

   fun setApellidoAgendador(apellidoAgendador: String){
      this.ApellidoAgendador = apellidoAgendador
   }

   fun setNumeroAgendador(numeroAgendador: Int){
      this.NumeroAgendador = numeroAgendador
   }

   fun setLocalidad(localidad: String){
      this.Localidad = localidad
   }

   fun setBarrio(barrio: String){
      this.Barrio = barrio
   }

   fun setDireccion(direccion: String){
      this.Direccion = direccion
   }
}