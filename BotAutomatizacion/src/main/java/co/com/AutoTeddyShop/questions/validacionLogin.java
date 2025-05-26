package co.com.AutoTeddyShop.questions;
import static co.com.AutoTeddyShop.userinterface.LoginPageTeddyShop.BOTON_GESTION_PEDIDO;
import static jxl.biff.FormatRecord.logger;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Visibility;

public class validacionLogin implements Question<Boolean> {

    public static validacionLogin esExitoso() {
        return new validacionLogin();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            return Visibility.of(BOTON_GESTION_PEDIDO).viewedBy(actor).asBoolean();
        } catch (Exception e) {
            logger.info("No se encontró el botón Gestión de Pedido");
            return false;
        }
    }
}