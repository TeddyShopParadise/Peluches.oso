package com.example.appinterface.Views.Productos

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.view.menu.MenuView
import com.example.appinterface.R

class MainProductosActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_mainproductos)
    }

    fun catalogoMenu(view: View) {
        val intent = Intent(this, CatalogoActivity::class.java)
        startActivity(intent)
    }

    fun categoriaMenu(view: View) {
        val intent = Intent(this, CategoriaActivity::class.java)
        startActivity(intent)
    }

    fun historialMenu(view: View) {
        val intent = Intent(this, HistorialPrecioActivity::class.java)
        startActivity(intent)
    }

    fun inventarioMenu(view: View){
        val intent = Intent(this, InventarioActivity::class.java)
        startActivity(intent)
    }

    fun productoMenu (view: View){
        val intent = Intent(this, ProductoActivity::class.java)
        startActivity(intent)
    }

    fun movimientoMenu(view: View){
        val intent = Intent(this, MovimientoActivity::class.java)
        startActivity(intent)
    }
}