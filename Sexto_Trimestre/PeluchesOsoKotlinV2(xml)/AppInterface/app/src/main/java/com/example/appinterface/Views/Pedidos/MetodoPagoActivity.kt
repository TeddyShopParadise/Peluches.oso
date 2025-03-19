package com.example.appinterface.Views.Pedidos

import Controller.Pedidos.MetodoPagoController
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class MetodoPagoActivity : AppCompatActivity() {
    private val metodoPagoController = MetodoPagoController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_metodopago)
    }

    fun crearMetodoPago(v: View){
        val nombreMetodoPago = findViewById<EditText>(R.id.nombreMetodoPago).text.toString()

        val mensaje = metodoPagoController.crearMetodoPago(nombreMetodoPago)
        findViewById<TextView>(R.id.textViewListado).text = mensaje
    }

    fun listarMetodoPagos(v: View) {
        val MetodoPagosTexto = metodoPagoController.listarMetodoPagos()
        val textViewMetodoPagos = findViewById<TextView>(R.id.textViewListado)
        textViewMetodoPagos.text = MetodoPagosTexto
    }
}

