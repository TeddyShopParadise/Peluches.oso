package com.example.appinterface.Views.Productos

import Controller.Productos.CatalogoController
import Controller.Productos.InventarioController
import Models.Productos.Inventario
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class InventarioActivity : AppCompatActivity(){
    private val inventarioController = InventarioController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_inventario)
    }

    fun crearInventario(v: View){
        val precioCompra = findViewById<EditText>(R.id.precioCompra).text.toString().toDouble()
        val precioVenta = findViewById<EditText>(R.id.precioVenta).text.toString().toDouble()
        val stockMinimo = findViewById<EditText>(R.id.stockMinimo).text.toString().toInt()
        val stockMaximo = findViewById<EditText>(R.id.stockMaximo).text.toString().toInt()
        val stock = findViewById<EditText>(R.id.stock).text.toString().toInt()

        val mensaje = inventarioController.crearInventario(stockMinimo, precioCompra, precioVenta, stock, stockMaximo)
        findViewById<TextView>(R.id.textViewListado).text = mensaje
    }

    fun listarInventario(v: View){
        val inventarioTexto = inventarioController.listarInventarios()
        val textViewInventario = findViewById<TextView>(R.id.textViewListado)
        textViewInventario.text = inventarioTexto
    }
}