package co.com.AutoTeddyShop.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import static co.com.AutoTeddyShop.userinterface.CatalogosUsuario.VisualizarCatalogos.MENSAJE_VALIDAR;
import static jxl.biff.FormatRecord.logger;

public class ValidacionCatalogosUsuario implements Question<Boolean> {

    public static ValidacionCatalogosUsuario validacionCatalogosUsuario () {
        return new ValidacionCatalogosUsuario();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String texto = Text.of(MENSAJE_VALIDAR).viewedBy(actor).asString();
            return "Regresa al catálogo cuando quieras ✨".equals(texto);
        } catch (Exception e) {
            logger.info(" No se encontró el texto");
            return false;
        }
    }
}