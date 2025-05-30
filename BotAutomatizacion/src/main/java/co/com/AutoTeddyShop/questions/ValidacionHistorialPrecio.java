package co.com.AutoTeddyShop.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import static co.com.AutoTeddyShop.userinterface.CategoriasAdmin.InteraccionCategoriasAdmin.MENSAJE_CONFIRMACION;
import static co.com.AutoTeddyShop.userinterface.HIstorialPrecio.InteraccionHistorialPrecio.TEXTO_HISTORIAL_CREADO;
import static jxl.biff.FormatRecord.logger;

public class ValidacionHistorialPrecio implements Question<Boolean> {

    public static ValidacionHistorialPrecio validacionHistorialPrecio () {return new ValidacionHistorialPrecio();}

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String texto = Text.of(TEXTO_HISTORIAL_CREADO).viewedBy(actor).asString();
            return "¡Historial creado!".equals(texto);
        } catch (Exception e) {
            logger.info(" No se encontró el texto");
            return false;
        }
    }

}
