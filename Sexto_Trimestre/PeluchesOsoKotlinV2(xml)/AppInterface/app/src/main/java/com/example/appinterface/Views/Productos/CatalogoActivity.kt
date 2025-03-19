package com.example.appinterface.Views.Productos
import Controller.Productos.CatalogoController
import android.app.AlertDialog
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

    fun eliminarCatalogo(v: View) {
        // Crear el EditText donde el usuario ingresará el nombre del catálogo a eliminar
        val editText = EditText(this)
        editText.hint = "Ingresa el nombre del catálogo"

        // Crear el AlertDialog
        val alertDialog = AlertDialog.Builder(this)
            .setTitle("Eliminar Catálogo")
            .setMessage("Por favor ingresa el nombre exacto del catálogo a eliminar.")
            .setView(editText)
            .setPositiveButton("Eliminar") { dialog, which ->
                val nombreCatalogo = editText.text.toString()

                if (nombreCatalogo.isNotEmpty()) {
                    val mensaje = catalogoController.eliminarCatalogo(nombreCatalogo)
                    findViewById<TextView>(R.id.textViewCatalogo).text = mensaje
                } else {
                    findViewById<TextView>(R.id.textViewCatalogo).text = "Por favor ingresa un nombre válido."
                }
            }
            .setNegativeButton("Cancelar") { dialog, which ->
                dialog.dismiss() // Cerrar el diálogo si se cancela
            }
            .create()

        // Mostrar el diálogo
        alertDialog.show()
    }

}