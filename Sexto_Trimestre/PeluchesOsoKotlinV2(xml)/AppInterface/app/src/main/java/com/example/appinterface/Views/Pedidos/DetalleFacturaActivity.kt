package com.example.appinterface.Views.Pedidos;

import Controller.Pedidos.DetalleFacturaController;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import com.example.appinterface.R;

class DetalleFacturaActivity : AppCompatActivity() {
    private val detalleFacturaController = DetalleFacturaController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detallefactura)
    }

    fun crearDetalleFactura(v: View) {
        val numFactura = findViewById<EditText>(R.id.numFactura).text.toString().toInt()
        val numDetalle = findViewById<EditText>(R.id.numDetalle).text.toString().toInt()
        val precio = findViewById<EditText>(R.id.precioDetalle).text.toString().toDouble()
        val cantidad = findViewById<EditText>(R.id.cantidadDetalle).text.toString().toInt()

        val mensaje = detalleFacturaController.crearDetalleFactura(numFactura, numDetalle, precio, cantidad)
        findViewById<TextView>(R.id.textViewDetallesFactura).text = mensaje
    }

    fun listarDetallesFactura(v: View) {
        val detallesTexto = detalleFacturaController.listarDetallesFactura()
        findViewById<TextView>(R.id.textViewDetallesFactura).text = detallesTexto
    }
}
