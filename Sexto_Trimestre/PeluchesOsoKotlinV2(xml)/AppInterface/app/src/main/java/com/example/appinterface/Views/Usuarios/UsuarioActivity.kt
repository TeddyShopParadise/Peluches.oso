package com.example.appinterface.Views.Usuarios

import Controller.Usuarios.UsuarioController
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class UsuarioActivity : AppCompatActivity() {

    private val usuarioController = UsuarioController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_usuario)
    }

    // Función que muestra el formulario de crear usuario
    fun mostrarFormulario(v: View) {
        val formulario = findViewById<LinearLayout>(R.id.contenedorFormulario)
        if (formulario.visibility == View.GONE) {
            formulario.visibility = View.VISIBLE
        } else {
            formulario.visibility = View.GONE
        }
    }
    fun mostrarFormularioBuscar(v: View) {
        val formulario = findViewById<LinearLayout>(R.id.contenedorFormularioBuscar)
        if (formulario.visibility == View.GONE) {
            formulario.visibility = View.VISIBLE
        } else {
            formulario.visibility = View.GONE
        }
    }
    fun mostrarFormularioActualizar(v: View) {
        val formularioActualizar = findViewById<LinearLayout>(R.id.contenedorFormularioActualizar)
        formularioActualizar.visibility = if (formularioActualizar.visibility == View.VISIBLE) {
            View.GONE
        } else {
            View.VISIBLE
        }
    }
    fun mostrarFormularioEliminar(v: View) {
        val formularioEliminar = findViewById<LinearLayout>(R.id.contenedorFormularioEliminar)
        formularioEliminar.visibility = if (formularioEliminar.visibility == View.VISIBLE) {
            View.GONE
        } else {
            View.VISIBLE
        }
    }

    // Crear un usuario
    fun crearUsuario(v: View) {
        val email = findViewById<EditText>(R.id.emailUsuario).text.toString()
        val telefono = findViewById<EditText>(R.id.telefonoUsuario).text.toString().toIntOrNull()
        val contrasena = findViewById<EditText>(R.id.contrasenaUsuario).text.toString()
        val username = findViewById<EditText>(R.id.usernameUsuario).text.toString()

        if (telefono != null) {
            val mensaje = usuarioController.crearUsuario(email, telefono, contrasena, username)
            findViewById<TextView>(R.id.textViewUsuarios).text = mensaje
        } else {
            findViewById<TextView>(R.id.textViewUsuarios).text = "Teléfono no válido"
        }
    }

    // Listar usuarios
    fun listarUsuarios(v: View) {
        val usuariosTexto = usuarioController.listarUsuarios()
        findViewById<TextView>(R.id.textViewUsuarios).text = usuariosTexto
    }

    fun buscarUsuario(v: View) {
        val id = findViewById<EditText>(R.id.idUsuario).text.toString()
        val mensaje = usuarioController.buscarUsuarioPorId(id)
        findViewById<TextView>(R.id.textViewUsuarios).text = mensaje
    }


        fun actualizarUsuario(v: View) {
            val id = findViewById<EditText>(R.id.idUsuario).text.toString()
            val email = findViewById<EditText>(R.id.emailUsuario).text.toString()
            val telefono = findViewById<EditText>(R.id.telefonoUsuario).text.toString().toInt()
            val contrasena = findViewById<EditText>(R.id.contrasenaUsuario).text.toString()
            val username = findViewById<EditText>(R.id.usernameUsuario).text.toString()

            val mensaje = usuarioController.actualizarUsuario(id, email, telefono, contrasena, username)
            findViewById<TextView>(R.id.textViewUsuarios).text = mensaje
        }

            fun eliminarUsuario(v: View) {
                val id = findViewById<EditText>(R.id.idUsuario).text.toString()
                val mensaje = usuarioController.eliminarUsuario(id)
                findViewById<TextView>(R.id.textViewUsuarios).text = mensaje
            }
}
