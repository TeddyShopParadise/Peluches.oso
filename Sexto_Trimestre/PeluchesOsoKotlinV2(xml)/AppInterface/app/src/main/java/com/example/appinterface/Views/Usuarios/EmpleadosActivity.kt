package com.example.appinterface.Views.Usuarios

import Controller.Usuarios.EmpleadosController
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.Switch
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class EmpleadosActivity : AppCompatActivity() {
    private val empleadosController = EmpleadosController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_empleadocrud)
    }

    fun crearEmpleado(v: View){
        val DniEmpleado = findViewById<EditText>(R.id.DniEmpleado).text.toString().toInt()
        val TelefonoEmpleado = findViewById<EditText>(R.id.TelefonoEmpleado).text.toString().toInt()
        val NombreEmpleado = findViewById<EditText>(R.id.NombreEmpleado).text.toString()


        val mensaje = empleadosController.crearEmpleado(DniEmpleado, TelefonoEmpleado, NombreEmpleado )
        findViewById<TextView>(R.id.textViewListado).text = mensaje
    }

    fun listarEmpleados(v: View) {
        val EmpleadosTexto = empleadosController.listarEmpleados()
        val textViewEmpleados = findViewById<TextView>(R.id.textViewListado)
        textViewEmpleados.text = EmpleadosTexto
    }

}