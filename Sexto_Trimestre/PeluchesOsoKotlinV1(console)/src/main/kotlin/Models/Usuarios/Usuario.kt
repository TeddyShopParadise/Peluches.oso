package Models.Usuarios

class Usuario (private var Email: String, private var Telefono: Int, private var Contrasena: String, private var Username: String){

    fun Usuario(email: String, telefono: Int, contrasena: String, username: String){
        this.Email = email
        this.Telefono = telefono
        this.Contrasena = contrasena
        this.Username = username
    }

    fun getEmail(): String{
        return Email
    }

    fun getTelefono(): Int{
        return Telefono
    }

    fun getContrasena(): String{
        return Contrasena
    }

    fun getUsername(): String{
        return Username
    }

    fun setEmail(email: String){
        this.Email = email
    }

    fun setTelefono(telefono: Int){
        this.Telefono = telefono
    }

    fun setContrasena(contrasena: String){
        this.Contrasena = contrasena
    }
    fun setUsername(username: String){
        this.Username = username
    }
}