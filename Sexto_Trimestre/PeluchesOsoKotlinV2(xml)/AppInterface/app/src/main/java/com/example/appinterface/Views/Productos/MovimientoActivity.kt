package com.example.appinterface.Views.Productos;

import Controller.Productos.MovimientoController;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import com.example.appinterface.R;

class MovimientoActivity : AppCompatActivity () {
    private val movimientoController =  MovimientoController();


     override fun onCreate(savedInstanceState :Bundle?) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_movimiento);
    }

    fun  crearMovimiento(v: View ) {
     val fecha = findViewById<EditText>(R.id.fechaMovimiento).text.toString()
       val cantidadIngreso = findViewById<EditText>(R.id.cantidadIngreso).text.toString().toInt()
        val cantidadSalida = findViewById<EditText>(R.id.cantidadSalida).text.toString().toInt()

        val  mensaje = movimientoController.crearMovimiento(fecha, cantidadIngreso, cantidadSalida)
        findViewById<TextView>(R.id.textViewMovimientos).text = mensaje
    }
     fun listarMovimientos(v: View ) {
         val movimientosTexto = movimientoController.listarMovimientos();
        findViewById<TextView>(R.id.textViewMovimientos).text = movimientosTexto
    }
}