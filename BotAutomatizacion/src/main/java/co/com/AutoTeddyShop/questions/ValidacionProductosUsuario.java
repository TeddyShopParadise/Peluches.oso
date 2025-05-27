package co.com.AutoTeddyShop.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import net.serenitybdd.screenplay.questions.Visibility;

import static co.com.AutoTeddyShop.userinterface.ProductosUsuario.InteraccionProductosUsuario.BTN_VALIDACION;
import static jxl.biff.FormatRecord.logger;

public class ValidacionProductosUsuario implements Question<Boolean> {

    public static ValidacionProductosUsuario esExitoso() {return new ValidacionProductosUsuario();}

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            return Visibility.of(BTN_VALIDACION).viewedBy(actor).asBoolean();
        } catch (Exception e) {
            logger.info("No se encontró el botón");
            return false;
        }
    }
}
///html/body/div[1]/div/div/div/div/div[4]/div/div[2]