package co.com.AutoTeddyShop.tasks.CategoriasAdmin;

import co.com.AutoTeddyShop.models.DatosCategoria;
import co.com.AutoTeddyShop.tasks.Esperar;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import java.util.List;

import static co.com.AutoTeddyShop.userinterface.CategoriasAdmin.InteraccionCategoriasAdmin.*;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

import co.com.AutoTeddyShop.models.Utilidades.NumeroRandom;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;

public class NavegacionCategorias implements Task {

    private final List<DatosCategoria> datosCategoria;

    public NavegacionCategorias(List<DatosCategoria> datosCategoria) {
        this.datosCategoria = datosCategoria;
    }

    public static NavegacionCategorias conLosDatos(List<DatosCategoria> datosCategoria) {
        return Instrumented.instanceOf(NavegacionCategorias.class).withProperties(datosCategoria);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        DatosCategoria datos = datosCategoria.get(0);
        String nombreCategoriaConAleatorio = datos.getNombreCategoria() + NumeroRandom.generarNumeroAleatorioBll();

        actor.attemptsTo(
                Click.on(INPUT_NOMBRECATEGORIA),
                Esperar.unosSegundos(1),
                Enter.theValue(nombreCategoriaConAleatorio).into(INPUT_NOMBRECATEGORIA),
                Esperar.unosSegundos(1),
                Click.on(INPUT_DESCRIPCIONCATEGORIA),
                Esperar.unosSegundos(1),
                Enter.theValue(datos.getDescripcionCategoria()).into(INPUT_DESCRIPCIONCATEGORIA),
                Esperar.unosSegundos(1),
                Click.on(BTN_CATEGORIA),
                Esperar.unosSegundos(1),
                Click.on(BTN_CONFIRMACION)
        );

        theActorInTheSpotlight().remember(SessionVariables.NombreCategoria.toString(), nombreCategoriaConAleatorio);
        theActorInTheSpotlight().remember(SessionVariables.DescripcionCategoria.toString(), datos.getDescripcionCategoria());
    }
}
