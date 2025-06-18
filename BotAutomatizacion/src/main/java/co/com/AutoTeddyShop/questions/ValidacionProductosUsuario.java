package co.com.AutoTeddyShop.questions;

import co.com.AutoTeddyShop.models.DatosCompraProducto;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import co.com.AutoTeddyShop.tasks.ProductosUsuario.NavegacionPedido;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import net.serenitybdd.screenplay.questions.Visibility;

import java.util.List;

import static co.com.AutoTeddyShop.userinterface.ProductosUsuario.InteraccionProductosUsuario.*;
import static jxl.biff.FormatRecord.logger;

public class ValidacionProductosUsuario implements Question<Boolean> {

    private List<DatosCompraProducto> datosCompra;

    public ValidacionProductosUsuario(List<DatosCompraProducto> datosCompra) { this.datosCompra = datosCompra; }


    public static ValidacionProductosUsuario esExitoso(List<DatosCompraProducto> datosCompra) {
        return Instrumented.instanceOf(ValidacionProductosUsuario.class).withProperties(datosCompra);
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String filtroComprador = actor.recall(SessionVariables.NombrePedido.toString());

            actor.attemptsTo(
                    NavegacionPedido.pedido(datosCompra)
            );

            String nombreComprador = Text.of(NOMBRE_PEDIDO).viewedBy(actor).asString();
            String mensajeExito = Text.of(MENSAJE_ESTADO).viewedBy(actor).asString();

            return filtroComprador.equals(nombreComprador) && mensajeExito.equals("Estado actualizado con éxito\n");
        } catch (Exception e) {
            logger.info("No se encontró el texto");
            return false;
        }
    }
}
