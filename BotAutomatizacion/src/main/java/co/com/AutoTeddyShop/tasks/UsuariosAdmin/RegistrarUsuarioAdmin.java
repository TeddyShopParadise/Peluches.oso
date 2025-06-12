package co.com.AutoTeddyShop.tasks.UsuariosAdmin;

import co.com.AutoTeddyShop.models.DatosUsuario;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.SelectFromOptions;
import java.util.List;

import static co.com.AutoTeddyShop.models.Utilidades.NumeroRandom.generarNumeroAleatorio;
import static co.com.AutoTeddyShop.userinterface.UsuarioAdmin.InteraccionUsuariosAdmin.*;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

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

        //Separar el correo antes del @
        String[] partesCorreo = usuario.getEmail().split("@");
        String Email = partesCorreo[0] + generarNumeroAleatorio() + "@" + partesCorreo[1];
        String Nombre = usuario.getNombreUsuario() + generarNumeroAleatorio();

        actor.attemptsTo(
                Enter.theValue(Email).into(INPUT_EMAIL),
                Enter.theValue(usuario.getContrasena()).into(INPUT_CONTRASENA),
                Enter.theValue(Nombre).into(INPUT_NOMBRE_USUARIO),
                Click.on(SELECT_ROLES),
                Click.on(BTN_ADMIN),
                Click.on(BTN_DEVOLVER),
                Click.on(SELECT_EMPLEADO),
                Click.on(BTN_EMPLEA),
                Click.on(BTN_DEVOLVER),
                Click.on(BTN_CREAR_USUARIO),
                Click.on(BTN_CREAR_FINAL)
        );
        theActorInTheSpotlight().remember(SessionVariables.EmailUsuario.toString(), Email);
        theActorInTheSpotlight().remember(SessionVariables.NombreUsuario.toString(), Nombre);
    }
}