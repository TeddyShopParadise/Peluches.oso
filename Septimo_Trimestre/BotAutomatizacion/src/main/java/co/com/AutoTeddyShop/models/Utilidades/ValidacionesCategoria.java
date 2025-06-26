package co.com.AutoTeddyShop.models.Utilidades;

public class ValidacionesCategoria {

    public static boolean nombreCategoriaEsIgual(String nombreEsperado, String nombreActual) {
        if (nombreEsperado == null || nombreActual == null) {
            return false;
        }

        // Comparación ignorando mayúsculas/minúsculas y espacios extras
        return nombreEsperado.trim().equalsIgnoreCase(nombreActual.trim());
    }

    public static boolean descripcionCategoriaEsIgual(String descripcionEsperada, String descripcionActual) {
        if (descripcionEsperada == null || descripcionActual == null) {
            return false;
        }

        // Comparación ignorando mayúsculas/minúsculas y espacios extras
        return descripcionEsperada.trim().equalsIgnoreCase(descripcionActual.trim());
    }
}