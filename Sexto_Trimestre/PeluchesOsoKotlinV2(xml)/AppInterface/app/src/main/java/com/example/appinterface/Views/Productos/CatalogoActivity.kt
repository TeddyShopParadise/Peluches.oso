package com.example.appinterface.Views.Productos
import Controller.Productos.CatalogoController
import Models.Productos.Catalogo
import android.app.AlertDialog
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.ConstraintLayout
import com.example.appinterface.R

class CatalogoActivity : AppCompatActivity() {
    private val catalogoController = CatalogoController()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_catalogo)
    }

    private fun createCell(text: String): TextView {
        return TextView(this).apply {
            this.text = text
            setPadding(16, 8, 16, 8)
            gravity = Gravity.CENTER
            layoutParams = TableRow.LayoutParams(0, TableRow.LayoutParams.WRAP_CONTENT, 1f)
        }
    }

    // Método para limpiar los textview
    private fun limpiarPantalla() {
        val table = findViewById<TableLayout>(R.id.tableCatalogos)
        if (table.childCount > 1) {
            table.removeViews(1, table.childCount - 1)
        }
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
        // Limpiar tabla (excepto encabezado)
        val table = findViewById<TableLayout>(R.id.tableCatalogos)
        if (table.childCount > 1) {
            table.removeViews(1, table.childCount - 1)
        }

        val catalogos = catalogoController.listarCatalogos(false) as List<Catalogo>

        for (catalogo in catalogos) {
            val row = TableRow(this).apply {
                // Datos del catálogo
                addView(createCell(catalogo.getNombreCatalogo()))
                addView(createCell(catalogo.getDescripcionCatalogo()))
                addView(createCell(if (catalogo.getDisponibilidadCatalogo()) "Sí" else "No"))

                // Contenedor para botones de acción
                val actionsLayout = LinearLayout(this@CatalogoActivity).apply {
                    orientation = LinearLayout.HORIZONTAL
                    layoutParams = TableRow.LayoutParams(0, TableRow.LayoutParams.WRAP_CONTENT, 1.5f)
                    gravity = Gravity.CENTER
                }

                // Botón Editar
                ImageButton(this@CatalogoActivity).apply {
                    setImageResource(R.drawable.ic_baseline_edit_24)
                    contentDescription = "Editar"
                    setOnClickListener { editarCatalogo(catalogo) }
                    layoutParams = LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.WRAP_CONTENT,
                        LinearLayout.LayoutParams.WRAP_CONTENT
                    ).apply {
                        setMargins(8, 0, 8, 0)
                    }
                    background = null
                }.also { actionsLayout.addView(it) }

                // Botón Eliminar
                ImageButton(this@CatalogoActivity).apply {
                    setImageResource(R.drawable.ic_baseline_delete_24)
                    contentDescription = "Eliminar"
                    setOnClickListener { eliminarCatalogo(catalogo) }
                    layoutParams = LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.WRAP_CONTENT,
                        LinearLayout.LayoutParams.WRAP_CONTENT
                    ).apply {
                        setMargins(8, 0, 8, 0)
                    }
                    background = null
                }.also { actionsLayout.addView(it) }

                // Botón Detalles
                ImageButton(this@CatalogoActivity).apply {
                    setImageResource(R.drawable.ic_baseline_info_24)
                    contentDescription = "Detalles"
                    setOnClickListener { verDetalles(catalogo) }
                    layoutParams = LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.WRAP_CONTENT,
                        LinearLayout.LayoutParams.WRAP_CONTENT
                    ).apply {
                        setMargins(8, 0, 8, 0)
                    }
                    background = null
                }.also { actionsLayout.addView(it) }

                addView(actionsLayout)
            }
            table.addView(row)
        }
    }

    private fun editarCatalogo(catalogo: Catalogo) {
        val layoutActualizar = findViewById<ConstraintLayout>(R.id.layoutActualizarCatalogo)
        layoutActualizar.visibility = View.VISIBLE

        findViewById<EditText>(R.id.editTextNombre).setText(catalogo.getNombreCatalogo())
        findViewById<EditText>(R.id.editTextEstilo).setText(catalogo.getEstiloCatalogo()) // Añadir esta línea
        findViewById<EditText>(R.id.editTextDescripcion).setText(catalogo.getDescripcionCatalogo())
        findViewById<Switch>(R.id.switchDisponibilidad).isChecked = catalogo.getDisponibilidadCatalogo()

        findViewById<Button>(R.id.btnActualizarCatalogo).setOnClickListener {
            val nuevoNombre = findViewById<EditText>(R.id.editTextNombre).text.toString()
            val nuevoEstilo = findViewById<EditText>(R.id.editTextEstilo).text.toString() // Añadir esta línea
            val nuevaDescripcion = findViewById<EditText>(R.id.editTextDescripcion).text.toString()
            val nuevaDisponibilidad = findViewById<Switch>(R.id.switchDisponibilidad).isChecked

            catalogoController.actualizarCatalogo(
                catalogo.getNombreCatalogo(),
                nuevoNombre,
                nuevaDescripcion,
                nuevaDisponibilidad,
                nuevoEstilo // Usar el nuevo valor
            )

            layoutActualizar.visibility = View.GONE
            listarCatalogos(findViewById(R.id.listarCatalogos))
        }

        findViewById<Button>(R.id.btnCancelarActualizar).setOnClickListener {
            layoutActualizar.visibility = View.GONE
        }
    }

    private fun eliminarCatalogo(catalogo: Catalogo) {
        // Obtener referencia al botón de listar
        val listarButton = findViewById<Button>(R.id.listarCatalogos)

        AlertDialog.Builder(this)
            .setTitle("Confirmar eliminación")
            .setMessage("¿Estás seguro de eliminar el catálogo ${catalogo.getNombreCatalogo()}?")
            .setPositiveButton("Eliminar") { _, _ ->
                catalogoController.eliminarCatalogo(catalogo.getNombreCatalogo())
                listarCatalogos(listarButton) // Usar la referencia obtenida
            }
            .setNegativeButton("Cancelar", null)
            .show()
    }

    private fun verDetalles(catalogo: Catalogo) {
        AlertDialog.Builder(this)
            .setTitle("Detalles del Catálogo")
            .setMessage("""
            Nombre: ${catalogo.getNombreCatalogo()}
            Descripción: ${catalogo.getDescripcionCatalogo()}
            Estilo: ${catalogo.getEstiloCatalogo()}
            Disponible: ${if (catalogo.getDisponibilidadCatalogo()) "Sí" else "No"}
        """.trimIndent())
            .setPositiveButton("Cerrar", null)
            .show()
    }
}


