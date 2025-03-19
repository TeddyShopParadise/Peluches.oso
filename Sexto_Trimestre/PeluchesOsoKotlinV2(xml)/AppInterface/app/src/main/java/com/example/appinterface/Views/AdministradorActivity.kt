package com.example.appinterface.Views

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R
import com.example.appinterface.Views.Pedidos.MainPedidoActivity
import com.example.appinterface.Views.Productos.MainProductosActivity
import com.example.appinterface.Views.Usuarios.MainUsuariosActivity

class AdministradorActivity : AppCompatActivity(){
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_admin)
    }

    fun mainProducto(view: View){
        val intent = Intent(this, MainProductosActivity::class.java)
        startActivity(intent)
    }

    fun mainUsuario(view: View){
        val intent = Intent(this, MainUsuariosActivity::class.java)
        startActivity(intent)
    }

    fun mainPedido(view: View){
        val intent = Intent(this, MainPedidoActivity::class.java)
        startActivity(intent)
    }
}