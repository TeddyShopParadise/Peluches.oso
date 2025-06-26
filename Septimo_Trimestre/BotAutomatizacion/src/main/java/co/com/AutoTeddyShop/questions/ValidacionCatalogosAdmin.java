package co.com.AutoTeddyShop.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import static jxl.biff.FormatRecord.logger;

import static co.com.AutoTeddyShop.userinterface.CatalogosAdmin.CrearCatalogoAdmin.MENSAJE_CREACION;

public class ValidacionCatalogosAdmin implements Question<Boolean> {

    public static ValidacionCatalogosAdmin validacionCatalogosAdmin(){
        return new ValidacionCatalogosAdmin();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String texto = Text.of(MENSAJE_CREACION).viewedBy(actor).asString();
            return "El catálogo se ha creado correctamente".equals(texto);
        } catch (Exception e) {
            logger.info("No se encontro el texto");
            return false;
        }
    }
}
