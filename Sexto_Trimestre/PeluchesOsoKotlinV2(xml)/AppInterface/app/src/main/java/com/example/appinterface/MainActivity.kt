package com.example.appinterface

import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.appinterface.Views.EmpleadoActivity
import android.content.Intent
import com.example.appinterface.Views.AdministradorActivity
import com.example.appinterface.Views.Productos.CatalogoActivity
import com.example.appinterface.Views.Productos.MainProductosActivity

//import Controller.Productos.CategoriaController

class MainActivity : AppCompatActivity() {
    //private val categoriaController = CategoriaController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }

    fun empleadoMenu(view: View){
        val intent = Intent(this, EmpleadoActivity::class.java)
        startActivity(intent)
    }

    fun adminMenu(view: View){
        val intent = Intent(this, AdministradorActivity::class.java)
        startActivity(intent)
    }

}