package co.com.AutoTeddyShop.tasks;

import co.com.AutoTeddyShop.userinterface.CatalogosUsuarioTeddyShop;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Open;

public class AbrirPaginaCatalogoUsuario implements Task {

    CatalogosUsuarioTeddyShop catalogosUsuarioTeddyShop;

    public static AbrirPaginaCatalogoUsuario lapagina() {
        return Tasks.instrumented(AbrirPaginaCatalogoUsuario.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo((Open.browserOn(catalogosUsuarioTeddyShop)));
    }
}