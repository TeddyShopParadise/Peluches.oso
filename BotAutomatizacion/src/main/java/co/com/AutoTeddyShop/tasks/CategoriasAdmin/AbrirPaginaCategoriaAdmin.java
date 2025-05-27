package co.com.AutoTeddyShop.tasks.CategoriasAdmin;

import co.com.AutoTeddyShop.userinterface.CategoriasAdmin.CategoriaAdminTeddyShop;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Open;

public class AbrirPaginaCategoriaAdmin implements Task {

    CategoriaAdminTeddyShop categoriaAdminTeddyShop;

    public static AbrirPaginaCategoriaAdmin lapagina() {
        return Tasks.instrumented(AbrirPaginaCategoriaAdmin.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo((Open.browserOn(categoriaAdminTeddyShop)));
    }
}