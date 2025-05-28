package co.com.AutoTeddyShop.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import static jxl.biff.FormatRecord.logger;

import static co.com.AutoTeddyShop.userinterface.UsuarioAdmin.InteraccionUsuariosAdmin.MENSAJE_CONFIRMACION;
import static net.serenitybdd.screenplay.questions.WebElementQuestion.the;

public class ValidacionUsuario implements Question<Boolean> {
    public static ValidacionUsuario mensajeExitoso() {
        return new ValidacionUsuario();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String texto = Text.of(MENSAJE_CONFIRMACION).viewedBy(actor).asString();
            return "El usuario se ha registrado correctamente".equals(texto);
        } catch (Exception e) {
            logger.info("No se encontró el mensaje de confirmación del usuario", e);
            return false;
        }
    }
}