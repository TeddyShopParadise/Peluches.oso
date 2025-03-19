package com.example.appinterface.Views.Productos
import Controller.Productos.CatalogoController
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.Switch
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class CatalogoActivity : AppCompatActivity(){
    private val catalogoController = CatalogoController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_catalogo)
    }


    fun crearCatalogo(v: View){
        val nombreCatalogo = findViewById<EditText>(R.id.precio).text.toString()
        val descripcionCatalogo = findViewById<EditText>(R.id.descripcionCatalogo).text.toString()
        val disponibilidadCatalogo = findViewById<Switch>(R.id.disponibilidadCatalogoo).isChecked
        val estiloCatalogo = findViewById<EditText>(R.id.estiloCatalogo).text.toString()

        val mensaje = catalogoController.crearCatalogo(nombreCatalogo, descripcionCatalogo, disponibilidadCatalogo, estiloCatalogo)
        findViewById<TextView>(R.id.textViewListado).text = mensaje
    }

    fun listarCatalogos(v: View) {
        val catalogosTexto = catalogoController.listarCatalogos()
        val textViewCatalogos = findViewById<TextView>(R.id.textViewListado)
        textViewCatalogos.text = catalogosTexto
    }
}