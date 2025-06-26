package co.com.AutoTeddyShop.tasks.CatalogosAdmin;

import co.com.AutoTeddyShop.userinterface.CatalogosAdmin.CatalogoAdminTeddyShop;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Open;

public class AbrirPaginaCatalogoAdmin implements Task {

    CatalogoAdminTeddyShop catalogoAdminTeddyShop;

    public static AbrirPaginaCatalogoAdmin lapagina() { return Tasks.instrumented(AbrirPaginaCatalogoAdmin.class); }

    @Override
    public <T extends Actor> void performAs(T actor) { actor.attemptsTo((Open.browserOn(catalogoAdminTeddyShop))); }
}
