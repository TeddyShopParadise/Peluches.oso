package com.example.appinterface.Views.Pedidos

import Controller.Pedidos.DevolucionesController
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class DevolucionesActivity : AppCompatActivity() {
    private val devolucionesController = DevolucionesController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_devoluciones)
    }

    // Función para crear una devolución
    fun crearDevolucion(v: View) {
        val detalleDevolucion = findViewById<EditText>(R.id.detalleDevolucion).text.toString()

        val mensaje = devolucionesController.crearDevolucion(detalleDevolucion)
        findViewById<TextView>(R.id.textViewListadoDevoluciones).text = mensaje
    }

    // Función para listar todas las devoluciones
    fun listarDevoluciones(v: View) {
        val devolucionesTexto = devolucionesController.listarDevoluciones()
        val textViewDevoluciones = findViewById<TextView>(R.id.textViewListadoDevoluciones)
        textViewDevoluciones.text = devolucionesTexto
    }

    // Función para buscar una devolución por ID
    fun buscarDevolucionPorId(v: View) {
        val idDevolucion = findViewById<EditText>(R.id.idDevolucionBuscar).text.toString()

        val mensaje = devolucionesController.buscarDevolucionPorId(idDevolucion)
        findViewById<TextView>(R.id.textViewListadoDevoluciones).text = mensaje
    }

    // Función para actualizar una devolución por ID
    fun actualizarDevolucion(v: View) {
        val idDevolucion = findViewById<EditText>(R.id.idDevolucionActualizar).text.toString()
        val nuevoDetalleDevolucion = findViewById<EditText>(R.id.nuevoDetalleDevolucion).text.toString()

        val mensaje = devolucionesController.actualizarDevolucion(idDevolucion, nuevoDetalleDevolucion)
        findViewById<TextView>(R.id.textViewListadoDevoluciones).text = mensaje
    }

    // Función para eliminar una devolución por ID
    fun eliminarDevolucion(v: View) {
        val idDevolucion = findViewById<EditText>(R.id.idDevolucionEliminar).text.toString()

        val mensaje = devolucionesController.eliminarDevolucion(idDevolucion)
        findViewById<TextView>(R.id.textViewListadoDevoluciones).text = mensaje
    }
}
