package co.com.AutoTeddyShop.tasks.HistorialPrecio;

import co.com.AutoTeddyShop.userinterface.HIstorialPrecio.HistorialPrecioTeddyShop;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Open;

public class AbrirPaginaHistorialPrecio implements Task {

    public static AbrirPaginaHistorialPrecio lapagina() {
        return Tasks.instrumented(AbrirPaginaHistorialPrecio.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Open.browserOn(new HistorialPrecioTeddyShop())
        );
    }
}