package co.com.AutoTeddyShop.tasks;

import co.com.AutoTeddyShop.userinterface.ProductosUsuarioTeddyShop;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Open;

public class AbrirPaginaProductosUsuario implements Task {

    ProductosUsuarioTeddyShop productosUsuarioTeddyShop;

    public static AbrirPaginaProductosUsuario lapagina() {
        return Tasks.instrumented(AbrirPaginaProductosUsuario.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo((Open.browserOn(productosUsuarioTeddyShop)));
    }
}
