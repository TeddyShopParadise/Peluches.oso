package co.com.AutoTeddyShop.tasks.Inventario;

import co.com.AutoTeddyShop.userinterface.Inventario.InventarioTeddyShop;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Open;

public class AbrirPaginaInventario implements Task {

    InventarioTeddyShop inventarioTeddyShop;

    public static AbrirPaginaInventario lapagina() {
        return Tasks.instrumented(AbrirPaginaInventario.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) { actor.attemptsTo((Open.browserOn(inventarioTeddyShop)));}

}
