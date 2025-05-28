package co.com.AutoTeddyShop.tasks.UsuariosAdmin;

import co.com.AutoTeddyShop.userinterface.UsuarioAdmin.UsuarioAdminTeddyShop;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Open;

public class AbrirPaginaUsuarioAdmin implements Task {
    UsuarioAdminTeddyShop usuarioAdminPage;

    public static AbrirPaginaUsuarioAdmin lapagina() {
        return Tasks.instrumented(AbrirPaginaUsuarioAdmin.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(Open.browserOn(usuarioAdminPage));
    }
}