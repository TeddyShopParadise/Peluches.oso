package com.example.appinterface.Views.Pedidos

import Controller.Pedidos.DetallePedidoController
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class DetallePedidoActivity : AppCompatActivity() {
    private val detallePedidoController = DetallePedidoController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detallepedido)
    }

    fun crearDetallePedido(v: View) {
        val numDetalle = findViewById<EditText>(R.id.numDetallePedido).text.toString().toInt()
        val precio = findViewById<EditText>(R.id.precioDetallePedido).text.toString().toDouble()
        val cantidad = findViewById<EditText>(R.id.cantidadDetallePedido).text.toString().toInt()

        val mensaje = detallePedidoController.crearDetallePedido(numDetalle, precio, cantidad)
        findViewById<TextView>(R.id.textViewResultados).text = mensaje
    }

    fun listarDetallesPedido(v: View) {
        val listaDetalles = detallePedidoController.listarDetallesPedido()
        findViewById<TextView>(R.id.textViewResultados).text = listaDetalles
    }
}
