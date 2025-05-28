package co.com.AutoTeddyShop.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import static co.com.AutoTeddyShop.userinterface.Empleado.RegistrarEmpleadoTeddyShop.NOMBRE_EMPLEADO;
import static jxl.biff.FormatRecord.logger;

public class ValidacionEmpleado implements Question<Boolean> {

    public static ValidacionEmpleado validacionEmpleado () {
        return new ValidacionEmpleado();
    }
    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String texto = Text.of(NOMBRE_EMPLEADO).viewedBy(actor).asString();
            return "Andres Espinosa".equals(texto);
        } catch (Exception e) {
            logger.info(" No se encontró el texto");
            return false;
        }
    }

}
