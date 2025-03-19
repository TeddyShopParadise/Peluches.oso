package com.example.appinterface.Views.Productos
import Controller.Productos.CatalogoController
import Controller.Productos.CategoriaController
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.Switch
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class CategoriaActivity : AppCompatActivity(){
    private val categoriaController = CategoriaController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_categoria)
    }

    fun crearCategoria(v: View) {
        val nombreCategoria = findViewById<EditText>(R.id.nombreCategoria).text.toString()
        val descripcionCategoria = findViewById<EditText>(R.id.descripcionCategoria).text.toString()

       val mensaje = categoriaController.crearCategoria(nombreCategoria, descripcionCategoria)
       findViewById<TextView>(R.id.textViewListado).text = mensaje

    }

    fun listarCategorias(v: View) {
        val categoriasTexto = categoriaController.listarCategorias()
        val textViewCategorias = findViewById<TextView>(R.id.textViewListado)
        textViewCategorias.text = categoriasTexto
    }

}