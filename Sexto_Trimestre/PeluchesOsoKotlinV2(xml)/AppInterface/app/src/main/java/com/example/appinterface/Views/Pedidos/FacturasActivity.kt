package com.example.appinterface.Views.Pedidos

import Controller.Pedidos.FacturaController
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class FacturasActivity : AppCompatActivity() {
    private val facturaController = FacturaController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_facturas)
    }

    fun crearFactura(v: View) {
        val numeroFactura = findViewById<EditText>(R.id.numeroFactura).text.toString().trim()
        val fechaFactura = findViewById<EditText>(R.id.fechaFactura).text.toString().trim()
        val montoTotalText = findViewById<EditText>(R.id.montoTotal).text.toString().trim()

        // Validar que los campos no estén vacíos
        if (numeroFactura.isEmpty() || fechaFactura.isEmpty() || montoTotalText.isEmpty()) {
            Toast.makeText(this, "Todos los campos son obligatorios", Toast.LENGTH_SHORT).show()
            return
        }

        // Intentar convertir el monto a Double
        val montoTotal = montoTotalText.toDoubleOrNull()
        if (montoTotal == null) {
            Toast.makeText(this, "El monto debe ser un número válido", Toast.LENGTH_SHORT).show()
            return
        }

        val mensaje = facturaController.crearFactura(numeroFactura, fechaFactura, montoTotal)
        findViewById<TextView>(R.id.textViewListado).text = mensaje
    }


    fun listarFacturas(v: View) {
        val facturasTexto = facturaController.listarFacturas()
        findViewById<TextView>(R.id.textViewListado).text = facturasTexto
    }
}
