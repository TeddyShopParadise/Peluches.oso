package co.com.AutoTeddyShop.tasks.ProductosAdmin;

import co.com.AutoTeddyShop.models.DatosProducto;
import co.com.AutoTeddyShop.userinterface.ProductosAdmin.ProductoAdminPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import static co.com.AutoTeddyShop.tasks.Esperar.unosSegundos;
import static co.com.AutoTeddyShop.userinterface.ProductosAdmin.ProductoAdminPage.*;

public class RegistrarProducto implements Task {

    private final DatosProducto datos;

    public RegistrarProducto(DatosProducto datos) {
        this.datos = datos;
    }

    public static RegistrarProducto conLosDatos(DatosProducto datos) {
        return Tasks.instrumented(RegistrarProducto.class, datos);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {

        actor.attemptsTo(
                Click.on(INPUT_ESTILO_PRODUCTO),
                Enter.theValue(datos.getEstiloProducto()).into(INPUT_ESTILO_PRODUCTO),

                Click.on(INPUT_DISPONIBILIDAD),
                Enter.theValue(String.valueOf(datos.getDisponibilidadProducto())).into(INPUT_DISPONIBILIDAD),

                Click.on(INPUT_TAMANO),
                Enter.theValue(datos.getTamañoProducto()).into(INPUT_TAMANO),

                //Click.on(INPUT_IMAGEN),
                //Enter.theValue(datos.getImagen()).into(INPUT_IMAGEN),

                Click.on(BTN_CATEGORIA),
                Click.on(BTN_ELEGIRCATEGORIA),
                Click.on(BTN_LL),
                unosSegundos(1),
                Click.on(BTN_CATALOGO),
                Click.on(BTN_ELEGIRCATALOGO),
                Click.on(BTN_LL),
                unosSegundos(1),

                Click.on(SELECT_HISTORIAL_PRECIO),
                Click.on(BTN_ELEGIRHISTORIAL),
                Click.on(BTN_LL),

                Click.on(BTN_GUARDAR_PRODUCTO),
                unosSegundos(1)

                );
    }
}
