package com.example.appinterface.Views.Pedidos
import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.appinterface.R

class MainPedidoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_mainpedido)
    }
    fun pedidoMenu (view: View){
        val intent = Intent(this, PedidoActivity::class.java)
        startActivity(intent)
    }

    fun metodoPagoMenu(view: View){
        val intent = Intent(this, MetodoPagoActivity::class.java)
        startActivity(intent)
    }

    fun devolucionMenu (view: View){
        val intent = Intent(this, DevolucionesActivity::class.java)
        startActivity(intent)
    }

    fun facturaMenu (view: View){
        val intent = Intent(this, FacturasActivity::class.java)
        startActivity(intent)
    }

    fun detallefacturaMenu (view: View){
        val intent = Intent(this, DetalleFacturaActivity::class.java)
        startActivity(intent)
    }

    fun detallepedidoMenu (view: View){
        val intent = Intent(this, DetalleFacturaActivity::class.java)
        startActivity(intent)
    }



}