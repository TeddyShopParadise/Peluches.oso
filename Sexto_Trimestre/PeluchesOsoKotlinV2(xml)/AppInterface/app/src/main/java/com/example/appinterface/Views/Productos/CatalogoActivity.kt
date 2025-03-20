package com.example.appinterface.Views.Productos
import Controller.Productos.CatalogoController
import android.app.AlertDialog
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.Switch
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.ConstraintLayout
import com.example.appinterface.R

class CatalogoActivity : AppCompatActivity() {
    private val catalogoController = CatalogoController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_catalogo)
    }

    // Método para limpiar los textview
    private fun limpiarPantalla() {
        findViewById<TextView>(R.id.textViewListado).text = ""
    }

    // Método para mostrar un Toast
    private fun mostrarToast(mensaje: String) {
        Toast.makeText(this, mensaje, Toast.LENGTH_LONG).show()
    }

    fun crearCatalogo(v: View) {
        limpiarPantalla()

        val nombreCatalogo = findViewById<EditText>(R.id.nombreCatalogo).text.toString()
        val descripcionCatalogo = findViewById<EditText>(R.id.descripcionCatalogo).text.toString()
        val disponibilidadCatalogo = findViewById<Switch>(R.id.disponibilidadCatalogo).isChecked
        val estiloCatalogo = findViewById<EditText>(R.id.estiloCatalogo).text.toString()

        if (nombreCatalogo.isNotEmpty() && descripcionCatalogo.isNotEmpty() && estiloCatalogo.isNotEmpty()) {
            val mensaje = catalogoController.crearCatalogo(nombreCatalogo, descripcionCatalogo, disponibilidadCatalogo, estiloCatalogo)
            mostrarToast(mensaje)
        } else {
            mostrarToast("Por favor, completa todos los campos antes de crear el catálogo.")
        }
    }

    fun listarCatalogos(v: View) {
        limpiarPantalla()

        val catalogosTexto = catalogoController.listarCatalogos()
        val textViewCatalogos = findViewById<TextView>(R.id.textViewListado)
        textViewCatalogos.text = catalogosTexto
    }

    fun actualizarCatalogoDialog(v: View) {
        limpiarPantalla()

        val layoutActualizar = findViewById<ConstraintLayout>(R.id.layoutActualizarCatalogo)
        layoutActualizar.visibility = View.VISIBLE

        val btnActualizar = findViewById<Button>(R.id.btnActualizarCatalogo)
        val btnCancelar = findViewById<Button>(R.id.btnCancelarActualizar)

        val editTextNombre = findViewById<EditText>(R.id.editTextNombre)
        val editTextDescripcion = findViewById<EditText>(R.id.editTextDescripcion)
        val switchDisponibilidad = findViewById<Switch>(R.id.switchDisponibilidad)
        val editTextEstilo = findViewById<EditText>(R.id.editTextEstilo)

        // Mostrar un cuadro de texto para buscar el catálogo
        val editTextBuscar = EditText(this)
        editTextBuscar.hint = "Ingresa el nombre del catálogo"

        val dialogBuscar = AlertDialog.Builder(this)
            .setTitle("Buscar Catálogo")
            .setMessage("Ingrese el nombre del catálogo a actualizar")
            .setView(editTextBuscar)
            .setPositiveButton("Buscar") { _, _ ->
                val nombreCatalogo = editTextBuscar.text.toString()

                val catalogo = catalogoController.buscarCatalogoPorNombre(nombreCatalogo)
                if (catalogo != null) {
                    // Llenar los campos con la información actual
                    editTextNombre.setText(catalogo.getNombreCatalogo())
                    editTextDescripcion.setText(catalogo.getDescripcionCatalogo())
                    switchDisponibilidad.isChecked = catalogo.getDisponibilidadCatalogo()
                    editTextEstilo.setText(catalogo.getEstiloCatalogo())
                } else {
                    mostrarToast("Catálogo no encontrado.")
                    layoutActualizar.visibility = View.GONE
                }
            }
            .setNegativeButton("Cancelar") { _, _ ->
                layoutActualizar.visibility = View.GONE
            }
            .create()

        dialogBuscar.show()

        btnActualizar.setOnClickListener {
            val nuevoNombre = editTextNombre.text.toString()
            val nuevaDescripcion = editTextDescripcion.text.toString()
            val nuevaDisponibilidad = switchDisponibilidad.isChecked
            val nuevoEstilo = editTextEstilo.text.toString()

            val mensaje = catalogoController.actualizarCatalogo(
                editTextBuscar.text.toString(), nuevoNombre, nuevaDescripcion, nuevaDisponibilidad, nuevoEstilo
            )
            mostrarToast(mensaje)
            layoutActualizar.visibility = View.GONE
        }

        btnCancelar.setOnClickListener {
            layoutActualizar.visibility = View.GONE
        }
    }
    fun eliminarCatalogo(v: View) {
        limpiarPantalla()
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

                val mensaje = if (nombreCatalogo.isNotEmpty()) {
                    catalogoController.eliminarCatalogo(nombreCatalogo)
                } else {
                    "Por favor ingresa un nombre válido."
                }

                mostrarToast(mensaje)  // Mostrar mensaje con Toast
            }
            .setNegativeButton("Cancelar") { dialog, which ->
                dialog.dismiss() // Cerrar el diálogo si se cancela
            }
            .create()

        // Mostrar el diálogo
        alertDialog.show()
    }
}


