package co.com.AutoTeddyShop.tasks.Login;

import co.com.AutoTeddyShop.models.DatosLogin;
import co.com.AutoTeddyShop.tasks.Esperar;
import co.com.AutoTeddyShop.userinterface.Login.LoginPageTeddyShop;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import java.util.List;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class IniciarSesionTeddyShop implements Task {

    private List<DatosLogin> datos;

    public IniciarSesionTeddyShop(List<DatosLogin> datos) {
        this.datos = datos;
    }

    public static IniciarSesionTeddyShop con(List<DatosLogin> datos) {
        return instrumented(IniciarSesionTeddyShop.class, datos);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        DatosLogin dato = datos.get(0);

        actor.attemptsTo(
                Enter.theValue(dato.getUsuario()).into(LoginPageTeddyShop.INPUT_USUARIO),
                Enter.theValue(dato.getContrasena()).into(LoginPageTeddyShop.INPUT_CONTRASENA),
                Click.on(LoginPageTeddyShop.BOTON_INICIAR_SESION),
                Esperar.unosSegundos(2)
        );
    }
}