package com.example.appinterface.Views.Productos

import Controllers.Productos.ProductoController
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class ProductoActivity : AppCompatActivity() {
    private val productoController = ProductoController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_producto)
    }

    // Función para crear un producto
    fun crearProducto(v: View) {
        val estilo = findViewById<EditText>(R.id.estiloProducto).text.toString()
        val material = findViewById<EditText>(R.id.materialProducto).text.toString()
        val tamaño = findViewById<EditText>(R.id.tamañoProducto).text.toString()
        val disponibilidad = findViewById<EditText>(R.id.disponibilidadProducto).text.toString().toBoolean()

        val mensaje = productoController.crearProducto(estilo, material, tamaño, disponibilidad)
        findViewById<TextView>(R.id.textViewListadoProductos).text = mensaje
    }

    // Función para listar todos los productos
    fun listarProductos(v: View) {
        val productosTexto = productoController.listarProductos()
        val textViewProductos = findViewById<TextView>(R.id.textViewListadoProductos)
        textViewProductos.text = productosTexto
    }

    // Función para buscar un producto por ID
    fun buscarProductoPorId(v: View) {
        val idProducto = findViewById<EditText>(R.id.idProductoBuscar).text.toString()

        val mensaje = productoController.buscarProductoPorId(idProducto)
        findViewById<TextView>(R.id.textViewListadoProductos).text = mensaje
    }

    // Función para actualizar un producto
    fun actualizarProducto(v: View) {
        val idProducto = findViewById<EditText>(R.id.idProductoActualizar).text.toString()
        val nuevoEstilo = findViewById<EditText>(R.id.nuevoEstiloProducto).text.toString()
        val nuevoMaterial = findViewById<EditText>(R.id.nuevoMaterialProducto).text.toString()
        val nuevoTamaño = findViewById<EditText>(R.id.nuevoTamañoProducto).text.toString()
        val nuevaDisponibilidad = findViewById<EditText>(R.id.nuevaDisponibilidadProducto).text.toString().toBoolean()

        val mensaje = productoController.actualizarProducto(idProducto, nuevoEstilo, nuevoMaterial, nuevoTamaño, nuevaDisponibilidad)
        findViewById<TextView>(R.id.textViewListadoProductos).text = mensaje
    }

    // Función para eliminar un producto
    fun eliminarProducto(v: View) {
        val idProducto = findViewById<EditText>(R.id.idProductoEliminar).text.toString()

        val mensaje = productoController.eliminarProducto(idProducto)
        findViewById<TextView>(R.id.textViewListadoProductos).text = mensaje
    }
}
