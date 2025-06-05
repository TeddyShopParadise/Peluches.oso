package co.com.AutoTeddyShop.questions;

import co.com.AutoTeddyShop.userinterface.Inventario.*;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import static co.com.AutoTeddyShop.userinterface.Inventario.InteraccionInventarioProducto.MENSAJE_EXITO_INVENTARIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ValidacionInventario implements Question<Boolean> {

    private static final Logger logger = LoggerFactory.getLogger(ValidacionInventario.class);

    public static ValidacionInventario validacionInventario() {
        return new ValidacionInventario();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String texto = Text.of(MENSAJE_EXITO_INVENTARIO).viewedBy(actor).asString();
            return "Éxito".equals(texto);
        } catch (Exception e) {
            logger.info("No se encontró el texto en ValidacionInventario");
            return false;
        }
    }
}
