package com.example.appinterface.Views.Productos

import Controller.Productos.HistorialPrecioController
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.Switch
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R


class HistorialPrecioActivity : AppCompatActivity(){

    private val historialPrecioController = HistorialPrecioController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_historialprecio)
    }

    fun crearHistorial(v: View) {
        val precio = findViewById<EditText>(R.id.precio).text.toString().toDouble()
        val fechaInicio = findViewById<EditText>(R.id.fechaInicio).text.toString()
        val fechaFin = findViewById<EditText>(R.id.fechaFin).text.toString()
        val estadoPrecio = findViewById<Switch>(R.id.estadoPrecio).isChecked

        val mensaje = historialPrecioController.crearHistorialPrecio(precio, fechaInicio, fechaFin, estadoPrecio)
        findViewById<TextView>(R.id.textViewListado).text = mensaje
    }

    fun listarHistorial(v: View) {
        val historialTexto = historialPrecioController.listarHistorialPrecios()
        val textViewHistorial = findViewById<TextView>(R.id.textViewListado)
        textViewHistorial.text = historialTexto
    }

}