package co.com.AutoTeddyShop.tasks.UsuariosAdmin;

import co.com.AutoTeddyShop.models.DatosUsuario;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.SelectFromOptions;
import java.util.List;

import static co.com.AutoTeddyShop.userinterface.UsuarioAdmin.InteraccionUsuariosAdmin.*;

public class RegistrarUsuarioAdmin implements Task {
    private List<DatosUsuario> datosUsuario;

    public RegistrarUsuarioAdmin(List<DatosUsuario> datosUsuario) {
        this.datosUsuario = datosUsuario;
    }

    public static RegistrarUsuarioAdmin con(List<DatosUsuario> datosUsuario) {
        return Instrumented.instanceOf(RegistrarUsuarioAdmin.class).withProperties(datosUsuario);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        DatosUsuario usuario = datosUsuario.get(0);
        actor.attemptsTo(
                Enter.theValue(usuario.getEmail()).into(INPUT_EMAIL),
                Enter.theValue(usuario.getContrasena()).into(INPUT_CONTRASENA),
                Enter.theValue(usuario.getNombreUsuario()).into(INPUT_NOMBRE_USUARIO),
                Click.on(SELECT_ROLES),
                Click.on(BTN_ADMIN),
                Click.on(BTN_DEVOLVER),
                Click.on(SELECT_EMPLEADO),
                Click.on(BTN_EMPLEA),
                Click.on(BTN_DEVOLVER),
                Click.on(BTN_CREAR_USUARIO),
                Click.on(BTN_CREAR_FINAL)

        );
    }
}