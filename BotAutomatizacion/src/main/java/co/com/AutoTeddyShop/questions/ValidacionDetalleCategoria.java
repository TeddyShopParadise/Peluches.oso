package co.com.AutoTeddyShop.questions;

import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import co.com.AutoTeddyShop.tasks.CategoriasAdmin.NavegarHastaUltimaPaginaCategoria;
import net.serenitybdd.core.pages.WebElementFacade;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.waits.WaitUntil;
import org.openqa.selenium.By;

import java.util.List;

import static co.com.AutoTeddyShop.userinterface.CategoriasAdmin.InteraccionCategoriasAdmin.FILAS_TABLA_CATEGORIA;
import static co.com.AutoTeddyShop.userinterface.CategoriasAdmin.InteraccionCategoriasAdmin.TABLA_CATEGORIA;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class ValidacionDetalleCategoria implements Question<Boolean> {

    public static ValidacionDetalleCategoria validacionDetalleCategoria() {
        return new ValidacionDetalleCategoria();
    }

    @Override
    public Boolean answeredBy(Actor actor) {

        String nombreEsperado = actor.recall(SessionVariables.NombreCategoria.toString());
        String descripcionEsperada = actor.recall(SessionVariables.DescripcionCategoria.toString());

        actor.attemptsTo(WaitUntil.the(TABLA_CATEGORIA, isVisible()).forNoMoreThan(10).seconds());
        actor.attemptsTo(NavegarHastaUltimaPaginaCategoria.delListadoCategorias());

        List<WebElementFacade> filas = FILAS_TABLA_CATEGORIA.resolveAllFor(actor);
        if (filas.isEmpty()) {
            return false;
        }

        WebElementFacade ultimaFila = filas.get(filas.size() - 1);

        String nombreActual = ultimaFila.findElement(By.xpath("./td[1]")).getText();
        String descripcionActual = ultimaFila.findElement(By.xpath("./td[2]")).getText();

        boolean nombreValido = nombreEsperado.equals(nombreActual);
        boolean descripcionValida = descripcionEsperada.equals(descripcionActual);

        System.out.println("Comparación nombre: esperado=" + nombreEsperado + ", actual=" + nombreActual + " => " + nombreValido);
        System.out.println("Comparación descripción: esperado=" + descripcionEsperada + ", actual=" + descripcionActual + " => " + descripcionValida);

        return nombreValido && descripcionValida;
    }
}
