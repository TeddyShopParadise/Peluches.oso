package co.com.AutoTeddyShop.tasks.CatalogosAdmin;

import co.com.AutoTeddyShop.models.DatosCatalogos;
import co.com.AutoTeddyShop.models.DatosCategoria;
import co.com.AutoTeddyShop.models.Utilidades.NumeroRandom;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import co.com.AutoTeddyShop.tasks.Esperar;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.Upload;

import java.io.File;
import java.util.List;

import static co.com.AutoTeddyShop.userinterface.CatalogosAdmin.CrearCatalogoAdmin.*;
import static co.com.AutoTeddyShop.userinterface.CategoriasAdmin.InteraccionCategoriasAdmin.INPUT_NOMBRECATEGORIA;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class NavegacionCatalogosAdmin implements Task {

    private List<DatosCatalogos> datosCatalogos;

    public NavegacionCatalogosAdmin(List<DatosCatalogos> datosCatalogos) { this.datosCatalogos = datosCatalogos; }

    public static NavegacionCatalogosAdmin aute(List<DatosCatalogos> datosCatalogos) {
        return Instrumented.instanceOf(NavegacionCatalogosAdmin.class).withProperties(datosCatalogos);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        DatosCatalogos datos = datosCatalogos.get(0);

        String nombreCatalogoConAleatorio = datos.getNombreCatalogo()        + NumeroRandom.generarNumeroAleatorioBll();

        actor.attemptsTo(
                Click.on(INPUT_NOMBRECATALOGO),
                Esperar.unosSegundos(1),
                Enter.theValue(nombreCatalogoConAleatorio).into(INPUT_NOMBRECATALOGO),

                Click.on(INPUT_DESCRIPCIONCATALOGO),
                Enter.theValue(datosCatalogos.get(0).getDescripcionCatalogo()).into(INPUT_DESCRIPCIONCATALOGO),

                Click.on(BTN_COMPANIA),
                Click.on(BTN_SELECCIONARCOMPANIA),

                //Click.on(BTN_SELECCCIONARIMAGEN),
                //Upload.theFile(new File("src/test/resources/imagenes/imagen1.jpg").toPath()).to(BTN_SELECCCIONARIMAGEN),

                Click.on(BTN_CREARCATALOGO),
                Esperar.unosSegundos(1),
                Click.on(BTN_CONFIRMACIONCREAR),
                Esperar.unosSegundos(1)

        );

        theActorInTheSpotlight().remember(SessionVariables.Nombrecatalogo.toString(), nombreCatalogoConAleatorio);

    }
}
