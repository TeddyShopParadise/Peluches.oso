package co.com.AutoTeddyShop.models.Utilidades;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Locale;

public class ValidacionesHistorial {

    public static boolean preciosSonIguales(String precioEsperado, String precioActual) {
        NumberFormat format = NumberFormat.getInstance(new Locale("es", "ES"));
        try {
            String limpioActual = precioActual.replaceAll("[^\\d,\\.]+", "");
            String limpioEsperado = precioEsperado.replaceAll("[^\\d,\\.]+", "");

            BigDecimal bdEsperado = new BigDecimal(format.parse(limpioEsperado).toString());
            BigDecimal bdActual = new BigDecimal(format.parse(limpioActual).toString());

            return bdEsperado.compareTo(bdActual) == 0;
        } catch (ParseException e) {
            return false;
        }
    }

    public static boolean fechasSonIguales(String fechaEsperada, String fechaActual, String formatoEsperado, String formatoActual) {
        try {
            DateTimeFormatter formatterEsperado = DateTimeFormatter.ofPattern(formatoEsperado);
            DateTimeFormatter formatterActual = DateTimeFormatter.ofPattern(formatoActual);

            LocalDate dateEsperada = LocalDate.parse(fechaEsperada, formatterEsperado);
            LocalDate dateActual = LocalDate.parse(fechaActual, formatterActual).plusDays(1); // Ajuste

            return dateEsperada.equals(dateActual);
        } catch (DateTimeParseException e) {
            return false;
        }
    }
}