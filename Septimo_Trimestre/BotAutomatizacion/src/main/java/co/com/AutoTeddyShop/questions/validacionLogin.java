package co.com.AutoTeddyShop.questions;
import static co.com.AutoTeddyShop.userinterface.Login.LoginPageTeddyShop.TEXT_PELUCHESOSO;
import static jxl.biff.FormatRecord.logger;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

public class validacionLogin implements Question<Boolean> {

    public static validacionLogin esExitoso() {
        return new validacionLogin();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String texto = Text.of(TEXT_PELUCHESOSO).viewedBy(actor).asString();
            return "¡Bienvenidos a Peluches.oso! Encuentra el compañero de peluche perfecto para todas las edades.".equals(texto);
        } catch (Exception e) {
            logger.info("No se encontró el texto");
            return false;
        }
    }
}