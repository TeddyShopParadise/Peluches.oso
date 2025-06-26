package co.com.AutoTeddyShop.tasks.Empleado;

import co.com.AutoTeddyShop.models.DatosEmpleado;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.Scroll;

import java.util.List;

import static co.com.AutoTeddyShop.tasks.Esperar.unosSegundos;
import static co.com.AutoTeddyShop.userinterface.Empleado.RegistrarEmpleadoTeddyShop.*;


public class FiltrarEmpleado implements Task {

    private List<DatosEmpleado> datosEmpleado;

    public FiltrarEmpleado(List<DatosEmpleado> datosEmpleado) { this.datosEmpleado = datosEmpleado; }

    public static FiltrarEmpleado filtrar(List<DatosEmpleado> datosEmpleado){
        return Instrumented.instanceOf(FiltrarEmpleado.class).withProperties(datosEmpleado);
    }


    @Override
    public <T extends Actor> void performAs(T actor) {
        String filtro = actor.recall(SessionVariables.DniEmpleado.toString());
        actor.attemptsTo(
                Scroll.to(BUSCAR_EMPLEADO),
                Click.on(BUSCAR_EMPLEADO),
                Enter.theValue(filtro).into(BUSCAR_EMPLEADO),
                unosSegundos(2)
        );
    }
}
