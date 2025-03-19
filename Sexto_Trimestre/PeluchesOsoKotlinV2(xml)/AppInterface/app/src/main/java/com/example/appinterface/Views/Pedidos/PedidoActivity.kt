package com.example.appinterface.Views.Pedidos

import Controller.Pedidos.PedidoController
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class PedidoActivity : AppCompatActivity() {
    private val pedidoController = PedidoController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_pedido)
    }

    // Función para crear un pedido
    fun crearPedido(v: View) {
        val tamañoOso = findViewById<EditText>(R.id.tamañoOso).text.toString()
        val nombreComprador = findViewById<EditText>(R.id.nombreComprador).text.toString()
        val apellidoComprador = findViewById<EditText>(R.id.apellidoComprador).text.toString()
        val numeroComprador = findViewById<EditText>(R.id.numeroComprador).text.toString().toInt()
        val nombreAgendador = findViewById<EditText>(R.id.nombreAgendador).text.toString()
        val apellidoAgendador = findViewById<EditText>(R.id.apellidoAgendador).text.toString()
        val numeroAgendador = findViewById<EditText>(R.id.numeroAgendador).text.toString().toInt()
        val localidad = findViewById<EditText>(R.id.localidad).text.toString()
        val direccion = findViewById<EditText>(R.id.direccion).text.toString()
        val barrio = findViewById<EditText>(R.id.barrio).text.toString()

        val mensaje = pedidoController.crearPedido(tamañoOso, nombreComprador, apellidoComprador, numeroComprador,
            nombreAgendador, apellidoAgendador, numeroAgendador, localidad,
            direccion, barrio)
        findViewById<TextView>(R.id.textViewListadoPedidos).text = mensaje
    }

    // Función para listar todos los pedidos
    fun listarPedidos(v: View) {
        val pedidosTexto = pedidoController.listarPedidos()
        findViewById<TextView>(R.id.textViewListadoPedidos).text = pedidosTexto
    }

    // Función para buscar un pedido por ID
    fun buscarPedidoPorId(v: View) {
        val idPedido = findViewById<EditText>(R.id.idPedidoBuscar).text.toString()
        val mensaje = pedidoController.buscarPedidoPorId(idPedido)
        findViewById<TextView>(R.id.textViewListadoPedidos).text = mensaje
    }

    // Función para actualizar un pedido
    fun actualizarPedido(v: View) {
        val idPedido = findViewById<EditText>(R.id.idPedidoActualizar).text.toString()
        val nuevoTamañoOso = findViewById<EditText>(R.id.nuevoTamañoOso).text.toString()
        val nuevoNombreComprador = findViewById<EditText>(R.id.nuevoNombreComprador).text.toString()
        val nuevoApellidoComprador = findViewById<EditText>(R.id.nuevoApellidoComprador).text.toString()
        val nuevoNumeroComprador = findViewById<EditText>(R.id.nuevoNumeroComprador).text.toString().toInt()
        val nuevoNombreAgendador = findViewById<EditText>(R.id.nuevoNombreAgendador).text.toString()
        val nuevoApellidoAgendador = findViewById<EditText>(R.id.nuevoApellidoAgendador).text.toString()
        val nuevoNumeroAgendador = findViewById<EditText>(R.id.nuevoNumeroAgendador).text.toString().toInt()
        val nuevaLocalidad = findViewById<EditText>(R.id.nuevaLocalidad).text.toString()
        val nuevaDireccion = findViewById<EditText>(R.id.nuevaDireccion).text.toString()
        val nuevoBarrio = findViewById<EditText>(R.id.nuevoBarrio).text.toString()

        val mensaje = pedidoController.actualizarPedido(idPedido, nuevoTamañoOso, nuevoNombreComprador, nuevoApellidoComprador,
            nuevoNumeroComprador, nuevoNombreAgendador, nuevoApellidoAgendador,
            nuevoNumeroAgendador, nuevaLocalidad, nuevaDireccion, nuevoBarrio)
        findViewById<TextView>(R.id.textViewListadoPedidos).text = mensaje
    }

    // Función para eliminar un pedido
    fun eliminarPedido(v: View) {
        val idPedido = findViewById<EditText>(R.id.idPedidoEliminar).text.toString()
        val mensaje = pedidoController.eliminarPedido(idPedido)
        findViewById<TextView>(R.id.textViewListadoPedidos).text = mensaje
    }
}
