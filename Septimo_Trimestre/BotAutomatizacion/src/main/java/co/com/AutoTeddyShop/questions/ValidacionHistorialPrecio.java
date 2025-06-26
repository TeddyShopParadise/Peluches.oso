package co.com.AutoTeddyShop.questions;

import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import co.com.AutoTeddyShop.tasks.HistorialPrecio.NavegarHastaUltimaPagina;
import net.serenitybdd.core.pages.WebElementFacade;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.waits.WaitUntil;
import org.openqa.selenium.By;

import java.util.List;


import static co.com.AutoTeddyShop.models.Utilidades.ValidacionesHistorial.fechasSonIguales;
import static co.com.AutoTeddyShop.models.Utilidades.ValidacionesHistorial.preciosSonIguales;
import static co.com.AutoTeddyShop.userinterface.HIstorialPrecio.InteraccionHistorialPrecio.*;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class ValidacionHistorialPrecio implements Question<Boolean> {

    public static ValidacionHistorialPrecio validacionHistorialPrecio() {
        return new ValidacionHistorialPrecio();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        String precioEsperado = actor.recall(SessionVariables.PrecioHistorial.toString());
        String fechaInicioEsperada = actor.recall(SessionVariables.FechaInicioHistorial.toString());
        String fechaFinalEsperada = actor.recall(SessionVariables.FechaFinalHistorial.toString());


        actor.attemptsTo(WaitUntil.the(TABLA_HISTORIAL, isVisible()).forNoMoreThan(10).seconds());
        actor.attemptsTo(NavegarHastaUltimaPagina.delHistorial());

        List<WebElementFacade> filas = FILAS_TABLA.resolveAllFor(actor);
        if (filas.isEmpty()) {
            return false;
        }

        WebElementFacade ultimaFila = filas.get(filas.size() - 1);

        String precioActual = ultimaFila.findElement(By.xpath("./td[1]")).getText();
        String fechaInicioActual = ultimaFila.findElement(By.xpath("./td[2]")).getText();
        String fechaFinActual = ultimaFila.findElement(By.xpath("./td[3]")).getText();

        boolean precioValido = preciosSonIguales(precioEsperado, precioActual);
        boolean fechasInicioIguales = fechasSonIguales(fechaInicioEsperada, fechaInicioActual, "dd-MM-yyyy", "d/M/yyyy");
        boolean fechasFinalIguales = fechasSonIguales(fechaFinalEsperada, fechaFinActual, "dd-MM-yyyy", "d/M/yyyy");

        System.out.println("Comparación de precio: esperado=" + precioEsperado + ", actual=" + precioActual + " => " + precioValido);
        System.out.println("Comparación de fecha inicio: esperado=" + fechaInicioEsperada + ", actual=" + fechaInicioActual + " => " + fechasInicioIguales);
        System.out.println("Comparación de fecha final: esperado=" + fechaFinalEsperada + ", actual=" + fechaFinActual + " => " + fechasFinalIguales);
        System.out.println("¿Validación exitosa? " + (precioValido && fechasInicioIguales && fechasFinalIguales));

        return precioValido && fechasInicioIguales && fechasFinalIguales;
    }

}
