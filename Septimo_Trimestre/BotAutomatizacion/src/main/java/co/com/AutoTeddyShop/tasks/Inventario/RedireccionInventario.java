package co.com.AutoTeddyShop.tasks.Inventario;

import co.com.AutoTeddyShop.models.DatosInventario;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Scroll;

import java.util.List;

import static co.com.AutoTeddyShop.userinterface.Inventario.InteraccionInventarioProducto.*;

public class RedireccionInventario implements Task {
    private List<DatosInventario> datosInventarios;

    public RedireccionInventario(List<DatosInventario> datosInventarios){ this.datosInventarios = datosInventarios; }

    public static RedireccionInventario val(List<DatosInventario> datosInventarios) {
        return Instrumented.instanceOf(RedireccionInventario.class).withProperties(datosInventarios);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {

        actor.attemptsTo(
                Click.on(BOTON_OK),
                Click.on(ABRIR_LISTA),
                Click.on(BOTON_ADMINISTRARPRODUCTOS),
                Click.on(BOTON_INVENTARIO),
                Scroll.to(CANTIDAD_INVENTARIO),
                Click.on(CANTIDAD_INVENTARIO),
                Click.on(SELECCIONAR_CANTIDAD),
                Click.on(BOTON_DETALLES)
                );
                actor.attemptsTo(
                GuardarID.guardar("id", ID_PRODUCTO)
        );
    }
}
