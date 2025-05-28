package co.com.AutoTeddyShop.tasks.Empleado;

import co.com.AutoTeddyShop.models.DatosEmpleado;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import java.util.List;

import static co.com.AutoTeddyShop.tasks.Esperar.unosSegundos;
import static co.com.AutoTeddyShop.userinterface.Empleado.RegistrarEmpleadoTeddyShop.*;

public class RegistrarEmpleado implements Task {

    private List<DatosEmpleado> datosEmpleado;

    public RegistrarEmpleado(List<DatosEmpleado> datosEmpleado) {
        this.datosEmpleado = datosEmpleado;
    }

    public static RegistrarEmpleado regis(List<DatosEmpleado> datosEmpleado) {
        return Instrumented.instanceOf(RegistrarEmpleado.class).withProperties(datosEmpleado);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {

        actor.attemptsTo(
                Click.on(INPUT_DNI),
                Enter.theValue(datosEmpleado.get(0).getDni()).into(INPUT_DNI),
                Click.on(INPUT_NOMBREEMPLEADO),
                Enter.theValue(datosEmpleado.get(0).getNombreEmpleado()).into(INPUT_NOMBREEMPLEADO),
                Click.on(INPUT_TELEFONOEMPLEADO),
                Enter.theValue(datosEmpleado.get(0).getTelefonoEmpleado()).into(INPUT_TELEFONOEMPLEADO),
                Click.on(BTN_COMPANIA),
                Click.on(BTN_PELUCHESOSO),
                Click.on(BTN_CREAREMPLEADO),
                Click.on(BTN_CONFIRMACION),
                unosSegundos(4)
        );
    }
}
