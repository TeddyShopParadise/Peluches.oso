package co.com.AutoTeddyShop.questions;

import co.com.AutoTeddyShop.models.DatosEmpleado;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import co.com.AutoTeddyShop.tasks.Empleado.FiltrarEmpleado;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import java.util.List;

import static co.com.AutoTeddyShop.userinterface.Empleado.RegistrarEmpleadoTeddyShop.*;
import static jxl.biff.FormatRecord.logger;

public class ValidacionEmpleado implements Question<Boolean> {

    private List<DatosEmpleado> datosEmpleado;

    public ValidacionEmpleado(List<DatosEmpleado> datosEmpleado) { this.datosEmpleado = datosEmpleado; }

    public static ValidacionEmpleado validacionEmpleado (List<DatosEmpleado> datosEmpleado) {
        return Instrumented.instanceOf(ValidacionEmpleado.class).withProperties(datosEmpleado);
    }
    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String filtro = actor.recall(SessionVariables.NombreEmpleado.toString());
            String filtroNum = actor.recall(SessionVariables.NumeroEmpleado.toString());
            actor.attemptsTo(
                    FiltrarEmpleado.filtrar(datosEmpleado)
            );
            String nombre = Text.of(NOMBRE_EMPLEADO).viewedBy(actor).asString();
            String numero = Text.of(NUMERO_EMPLEADO).viewedBy(actor).asString();
            return filtro.equals(nombre) && filtroNum.equals(numero);
        } catch (Exception e) {
            logger.info(" No se encontró el texto");
            return false;
        }
    }

}
