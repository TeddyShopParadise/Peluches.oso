package co.com.AutoTeddyShop.tasks.ProductosAdmin;

import co.com.AutoTeddyShop.models.DatosProducto;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import co.com.AutoTeddyShop.userinterface.ProductosAdmin.ProductoAdminPage;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import java.util.List;

import static co.com.AutoTeddyShop.models.Utilidades.NumeroRandom.generarNumeroAleatorio;
import static co.com.AutoTeddyShop.tasks.Esperar.unosSegundos;
import static co.com.AutoTeddyShop.userinterface.ProductosAdmin.ProductoAdminPage.*;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class RegistrarProducto implements Task {

    private List<DatosProducto> datos;

    public RegistrarProducto(List<DatosProducto> datos) {
        this.datos = datos;
    }

    public static RegistrarProducto conLosDatos(List<DatosProducto> datos) {
        return Instrumented.instanceOf(RegistrarProducto.class).withProperties(datos);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        DatosProducto producto = datos.get(0);
        String estilo = producto.getEstiloProducto() + generarNumeroAleatorio();

        actor.attemptsTo(
                Click.on(INPUT_ESTILO_PRODUCTO),
                Enter.theValue(estilo).into(INPUT_ESTILO_PRODUCTO),

                Click.on(INPUT_DISPONIBILIDAD),
                Enter.theValue(String.valueOf(producto.getDisponibilidadProducto())).into(INPUT_DISPONIBILIDAD),

                Click.on(INPUT_TAMANO),
                Enter.theValue(producto.getTamañoProducto()).into(INPUT_TAMANO),

                //Click.on(INPUT_IMAGEN),
                //Enter.theValue(datos.getImagen()).into(INPUT_IMAGEN),

                Click.on(BTN_CATEGORIA),
                Click.on(BTN_ELEGIRCATEGORIA),
                unosSegundos(1),
                Click.on(BTN_CATALOGO),
                Click.on(BTN_ELEGIRCATALOGO),

                unosSegundos(1),

                Click.on(SELECT_HISTORIAL_PRECIO),
                Click.on(BTN_ELEGIRHISTORIAL),

                Click.on(BTN_GUARDAR_PRODUCTO),
                unosSegundos(1)

        );
        theActorInTheSpotlight().remember(SessionVariables.EstiloProducto.toString(), estilo);
    }
}
