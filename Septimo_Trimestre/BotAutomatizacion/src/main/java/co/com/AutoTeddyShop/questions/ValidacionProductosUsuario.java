package co.com.AutoTeddyShop.questions;

import co.com.AutoTeddyShop.models.DatosCompraProducto;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import co.com.AutoTeddyShop.tasks.ProductosUsuario.NavegacionPedido;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;
import net.serenitybdd.screenplay.questions.Visibility;
import net.serenitybdd.screenplay.waits.WaitUntil;

import java.util.List;

import static co.com.AutoTeddyShop.userinterface.ProductosUsuario.InteraccionProductosUsuario.*;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class ValidacionProductosUsuario implements Question<Boolean> {

    private List<DatosCompraProducto> datosCompra;

    public ValidacionProductosUsuario(List<DatosCompraProducto> datosCompra) {
        this.datosCompra = datosCompra;
    }

    public static ValidacionProductosUsuario esExitoso(List<DatosCompraProducto> datosCompra) {
        return Instrumented.instanceOf(ValidacionProductosUsuario.class).withProperties(datosCompra);
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            actor.attemptsTo(
                    NavegacionPedido.pedido(datosCompra),
                    WaitUntil.the(NOMBRE_PEDIDO, isVisible()).forNoMoreThan(10).seconds(),
                    WaitUntil.the(MENSAJE_ESTADO, isVisible()).forNoMoreThan(10).seconds()
            );

            String filtroComprador = actor.recall(SessionVariables.NombrePedido.toString());
            if (filtroComprador == null || filtroComprador.isEmpty()) {
                return false;
            }

            String nombreComprador = Text.of(NOMBRE_PEDIDO).viewedBy(actor).asString();
            String mensajeExito = Text.of(MENSAJE_ESTADO).viewedBy(actor).asString().trim();

            return filtroComprador.equals(nombreComprador)
                    && mensajeExito.contains("Estado actualizado con éxito");

        } catch (Exception e) {
            return false;
        }
    }
}