package co.com.AutoTeddyShop.questions;

import co.com.AutoTeddyShop.models.DatosInventario;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import co.com.AutoTeddyShop.tasks.Inventario.RedireccionInventario;
import co.com.AutoTeddyShop.tasks.ProductosAdmin.FiltrarProducto;
import co.com.AutoTeddyShop.userinterface.Inventario.*;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import static co.com.AutoTeddyShop.userinterface.Inventario.InteraccionInventarioProducto.ESTILO_PRODUCTO;
import static co.com.AutoTeddyShop.userinterface.Inventario.InteraccionInventarioProducto.MENSAJE_EXITO_INVENTARIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class ValidacionInventario implements Question<Boolean> {

    private List<DatosInventario> datosInventario;

    public ValidacionInventario(List<DatosInventario> datosInventarios) { this.datosInventario = datosInventarios; }

    private static final Logger logger = LoggerFactory.getLogger(ValidacionInventario.class);

    public static ValidacionInventario validacionInventario(List<DatosInventario> datosInventarios) {
        return Instrumented.instanceOf(ValidacionInventario.class).withProperties(datosInventarios);
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String estilo = actor.recall(SessionVariables.EstiloProducto.toString());
            String texto = Text.of(MENSAJE_EXITO_INVENTARIO).viewedBy(actor).asString();

            actor.attemptsTo(
                    RedireccionInventario.val(datosInventario),
                    FiltrarProducto.filtrar(datosInventario)
            );

            String estiloProcucto = Text.of(ESTILO_PRODUCTO).viewedBy(actor).asString();
            return texto.equals("Éxito") && estilo.equals(estiloProcucto);
        } catch (Exception e) {
            logger.info("No se encontró el texto en ValidacionInventario");
            return false;
        }
    }
}
