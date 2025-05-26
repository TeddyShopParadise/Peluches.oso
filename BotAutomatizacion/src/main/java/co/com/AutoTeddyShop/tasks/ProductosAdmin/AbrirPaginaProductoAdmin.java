package co.com.AutoTeddyShop.tasks;

import co.com.AutoTeddyShop.userinterface.ProductoAdminTeddyShop;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Open;

public class AbrirPaginaProductoAdmin implements Task {

    ProductoAdminTeddyShop productoAdminTeddyShop;

    public static AbrirPaginaProductoAdmin lapagina() { return Tasks.instrumented(AbrirPaginaProductoAdmin.class);}

    @Override
    public <T extends Actor> void performAs(T actor) { actor.attemptsTo((Open.browserOn(productoAdminTeddyShop)));}
}