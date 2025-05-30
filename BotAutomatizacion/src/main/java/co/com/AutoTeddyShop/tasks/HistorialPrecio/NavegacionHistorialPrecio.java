package co.com.AutoTeddyShop.tasks.HistorialPrecio;

import co.com.AutoTeddyShop.models.DatosHistorialPrecio;
import co.com.AutoTeddyShop.tasks.Esperar;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import co.com.AutoTeddyShop.models.DatosCategoria;
import co.com.AutoTeddyShop.models.DatosCompraProducto;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import java.util.List;
import static co.com.AutoTeddyShop.tasks.Esperar.unosSegundos;
import static co.com.AutoTeddyShop.userinterface.CategoriasAdmin.InteraccionCategoriasAdmin.*;
import static co.com.AutoTeddyShop.userinterface.HIstorialPrecio.InteraccionHistorialPrecio.*;

import java.util.List;

public class NavegacionHistorialPrecio implements Task {

    private final List<DatosHistorialPrecio> datosHistorialPrecio;

    public NavegacionHistorialPrecio(List<DatosHistorialPrecio> datosHistorialPrecio){
        this.datosHistorialPrecio = datosHistorialPrecio;
    }

    public static NavegacionHistorialPrecio conLosDatos(List<DatosHistorialPrecio> datosHistorialPrecio) {
        return Instrumented.instanceOf(NavegacionHistorialPrecio.class).withProperties(datosHistorialPrecio);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        DatosHistorialPrecio datos = datosHistorialPrecio.get(0);
        actor.attemptsTo(
                Click.on(INPUT_PRECIO),
                Esperar.unosSegundos(1),
                Enter.theValue(datos.getPrecioHistorialPrecio()).into(INPUT_PRECIO),
                Esperar.unosSegundos(1),
                Click.on(INPUT_FECHA_INICIO),
                Esperar.unosSegundos(1),
                Enter.theValue(datos.getFechaInicio()).into(INPUT_FECHA_INICIO),
                Esperar.unosSegundos(1),
                Click.on(INPUT_FECHA_FINAL),
                Esperar.unosSegundos(1),
                Enter.theValue(datos.getFechaFinal()).into(INPUT_FECHA_FINAL),
                Esperar.unosSegundos(1),
                Click.on(CHECKBOX_ESTADO_PRECIO),
                Esperar.unosSegundos(1),
                Click.on(BOTON_CREAR),
                Esperar.unosSegundos(1),
                Click.on(BOTON_CONFIRMAR_CREACION)
        );
    }
}

