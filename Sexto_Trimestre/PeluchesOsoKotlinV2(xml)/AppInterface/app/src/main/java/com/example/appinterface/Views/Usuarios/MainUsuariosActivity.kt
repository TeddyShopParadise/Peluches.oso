package com.example.appinterface.Views.Usuarios
import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R
import com.example.appinterface.Views.Productos.ProductoActivity

class MainUsuariosActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_mainusuarios)
    }

    fun rolMenu (view: View){
        val intent = Intent(this, RolesActivity::class.java)
        startActivity(intent)
    }

    fun clienteMenu (view: View){
        val intent = Intent(this, ClientesActivity::class.java)
        startActivity(intent)
    }

    fun empleadoMenu (view: View){
        val intent = Intent(this, EmpleadosActivity::class.java)
        startActivity(intent)
    }

    fun usuarioMenu (view: View){
        val intent = Intent(this, UsuarioActivity::class.java)
        startActivity(intent)
    }

}