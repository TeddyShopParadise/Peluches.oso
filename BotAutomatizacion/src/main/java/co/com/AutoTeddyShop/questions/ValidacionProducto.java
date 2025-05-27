package co.com.AutoTeddyShop.questions;


import static co.com.AutoTeddyShop.userinterface.ProductosAdmin.ProductoAdminPage.MENSAJE_EXITO;
import static jxl.biff.FormatRecord.logger;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

public class ValidacionProducto implements Question<Boolean> {

        public static ValidacionProducto validacionProducto () {
        return new ValidacionProducto();
        }
        @Override
public Boolean answeredBy(Actor actor) {
    try {
        String texto = Text.of(MENSAJE_EXITO).viewedBy(actor).asString();
        return "Producto creado correctamente".equals(texto);
    } catch (Exception e) {
        logger.info(" No se encontró el texto");
        return false;
    }
}
}