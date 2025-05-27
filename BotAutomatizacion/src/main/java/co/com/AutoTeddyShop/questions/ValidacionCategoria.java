package co.com.AutoTeddyShop.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import static co.com.AutoTeddyShop.userinterface.CategoriasAdmin.InteraccionCategoriasAdmin.MENSAJE_CONFIRMACION;
import static jxl.biff.FormatRecord.logger;

public class ValidacionCategoria implements Question<Boolean> {

    public static ValidacionCategoria validacionCategoria () {return new ValidacionCategoria();}

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String texto = Text.of(MENSAJE_CONFIRMACION).viewedBy(actor).asString();
            return "La categoría se ha guardado correctamente.".equals(texto);
        } catch (Exception e) {
            logger.info(" No se encontró el texto");
            return false;
        }
    }
}
