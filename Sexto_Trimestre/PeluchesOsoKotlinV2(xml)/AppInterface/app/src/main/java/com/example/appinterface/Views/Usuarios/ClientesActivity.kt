package com.example.appinterface.Views.Usuarios

import Controller.Usuarios.ClientesController
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class ClientesActivity : AppCompatActivity() {
    private val clientesController = ClientesController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_clientes)
    }

    // Función para crear un cliente
    fun crearCliente(v: View) {
        val dni = findViewById<EditText>(R.id.dniCliente).text.toString().toInt()
        val nombre = findViewById<EditText>(R.id.nombreCliente).text.toString()
        val telefono = findViewById<EditText>(R.id.telefonoCliente).text.toString().toInt()
        val apellido = findViewById<EditText>(R.id.apellidoCliente).text.toString()

        val mensaje = clientesController.crearCliente(dni, nombre, telefono, apellido)
        findViewById<TextView>(R.id.textViewListadoClientes).text = mensaje
    }

    // Función para listar todos los clientes
    fun listarClientes(v: View) {
        val clientesTexto = clientesController.listarClientes()
        val textViewClientes = findViewById<TextView>(R.id.textViewListadoClientes)
        textViewClientes.text = clientesTexto
    }

    // Función para buscar un cliente por DNI
    fun buscarClientePorDni(v: View) {
        val dniCliente = findViewById<EditText>(R.id.dniClienteBuscar).text.toString()

        val mensaje = clientesController.buscarClientePorDni(dniCliente)
        findViewById<TextView>(R.id.textViewListadoClientes).text = mensaje
    }

    // Función para actualizar un cliente
    fun actualizarCliente(v: View) {
        val dniCliente = findViewById<EditText>(R.id.dniClienteActualizar).text.toString()
        val nuevoNombre = findViewById<EditText>(R.id.nuevoNombreCliente).text.toString()
        val nuevoTelefono = findViewById<EditText>(R.id.nuevoTelefonoCliente).text.toString().toInt()
        val nuevoApellido = findViewById<EditText>(R.id.nuevoApellidoCliente).text.toString()

        val mensaje = clientesController.actualizarCliente(dniCliente, nuevoNombre, nuevoTelefono, nuevoApellido)
        findViewById<TextView>(R.id.textViewListadoClientes).text = mensaje
    }

    // Función para eliminar un cliente
    fun eliminarCliente(v: View) {
        val dniCliente = findViewById<EditText>(R.id.dniClienteEliminar).text.toString()

        val mensaje = clientesController.eliminarCliente(dniCliente)
        findViewById<TextView>(R.id.textViewListadoClientes).text = mensaje
    }
}
