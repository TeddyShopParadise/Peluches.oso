package com.example.appinterface.Views.Usuarios
import Controller.Usuarios.RolesController
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.Switch
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class RolesActivity: AppCompatActivity() {
    private val rolesController = RolesController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_rol)
    }

    fun crearRol(v: View){
        val nombreRol = findViewById<EditText>(R.id.nombreRol).text.toString()
        val estadoRol = findViewById<Switch>(R.id.estadoRol).isChecked

        val mensaje = rolesController.crearRol(estadoRol, nombreRol)
        findViewById<TextView>(R.id.textViewListado).text = mensaje
    }

    fun listarRoles(v: View) {
        val RolesTexto = rolesController.listarRoles()
        val textViewRoles = findViewById<TextView>(R.id.textViewListado)
        textViewRoles.text = RolesTexto
    }
}