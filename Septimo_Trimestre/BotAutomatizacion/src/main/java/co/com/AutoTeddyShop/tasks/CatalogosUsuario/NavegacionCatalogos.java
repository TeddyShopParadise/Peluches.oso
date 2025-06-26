package co.com.AutoTeddyShop.tasks.CatalogosUsuario;

import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import java.util.List;
import static co.com.AutoTeddyShop.userinterface.CatalogosUsuario.VisualizarCatalogos.*;
import static co.com.AutoTeddyShop.tasks.Esperar.unosSegundos;
import static co.com.AutoTeddyShop.userinterface.ProductosUsuario.InteraccionProductosUsuario.BOTON_ACEPTARCODESPACE;

public class NavegacionCatalogos implements Task{


    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(BOTON_ACEPTARCODESPACE),
                Click.on(SIDEBAR),
                Click.on(BTN_LISTADESPLEGABLE),
                unosSegundos(1),
                //Click.on(BTN_MENU_PRODUCTOS),
                unosSegundos(1),
                Click.on(BTN_CATALOGOS),
                unosSegundos(1),
                Click.on(BTN_VERPRODUCTOS),
                unosSegundos(3)
        );
    }
}