package co.com.AutoTeddyShop.tasks.UsuariosAdmin;

import co.com.AutoTeddyShop.models.DatosUsuario;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import java.util.List;

import static co.com.AutoTeddyShop.userinterface.UsuarioAdmin.InteraccionUsuariosAdmin.BUSCAR_USUARIO;

public class FiltrarUsuario implements Task {

    private List<DatosUsuario> datosUsuarios;

    public FiltrarUsuario(List<DatosUsuario> datosUsuarios) { this.datosUsuarios = datosUsuarios; }

    public static FiltrarUsuario filtrar(List<DatosUsuario> datosUsuarios) {
        return Instrumented.instanceOf(FiltrarUsuario.class).withProperties(datosUsuarios);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        String nombre = actor.recall(SessionVariables.NombreUsuario.toString());

        actor.attemptsTo(
                Click.on(BUSCAR_USUARIO),
                Enter.theValue(nombre).into(BUSCAR_USUARIO)
        );
    }
}
