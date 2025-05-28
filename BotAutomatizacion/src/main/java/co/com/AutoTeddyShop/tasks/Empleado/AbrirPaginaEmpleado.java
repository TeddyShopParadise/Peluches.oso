package co.com.AutoTeddyShop.tasks.Empleado;

import co.com.AutoTeddyShop.userinterface.Empleado.EmpleadoTeddyShop;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Open;

public class AbrirPaginaEmpleado implements Task {

    EmpleadoTeddyShop empleadoTeddyShop;

    public static AbrirPaginaEmpleado lapagina() { return Tasks.instrumented(AbrirPaginaEmpleado.class);}

    @Override
    public <T extends Actor> void performAs(T actor) { actor.attemptsTo((Open.browserOn(empleadoTeddyShop)));}
}