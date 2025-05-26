package co.com.AutoTeddyShop.tasks.ProductosUsuario;

import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import co.com.AutoTeddyShop.models.DatosCompraProducto;
import static co.com.AutoTeddyShop.tasks.Esperar.unosSegundos;
import static co.com.AutoTeddyShop.userinterface.ProductosUsuario.InteraccionProductosUsuario.*;

import java.util.List;

public class NavegacionProductosUsuario implements Task {

    private List<DatosCompraProducto> datosCompra;


    public NavegacionProductosUsuario(List<DatosCompraProducto> datosCompra){
        this.datosCompra = datosCompra;
    }

    public static NavegacionProductosUsuario aute(List<DatosCompraProducto> datosCompra){
        return Instrumented.instanceOf(NavegacionProductosUsuario.class).withProperties(datosCompra);

    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(BTN_CATEGORIA),
                Click.on(BTN_OSOS110),
                Click.on((BTN_DETALLES)),
                Click.on(BTN_CERRAR),
                Click.on(BTN_COMPRAR),
                Click.on(BTN_METODOPAGO),
                Click.on(BTN_NEQUI),
                Click.on(INPUT_NOMBREPAGA),
                Enter.theValue(datosCompra.get(0).getNombrePaga()).into(INPUT_NOMBREPAGA),
                Click.on(INPUT_TELEFONOPAGA),
                Enter.theValue(datosCompra.get(0).getTelefonoPaga()).into(INPUT_TELEFONOPAGA),
                Click.on(INPUT_NOMBRERECIBE),
                Enter.theValue(datosCompra.get(0).getNombreRecibe()).into(INPUT_NOMBRERECIBE),
                Click.on(INPUT_TELEFONORECIBE),
                Enter.theValue(datosCompra.get(0).getTelefonoRecibe()).into(INPUT_TELEFONORECIBE),
                Click.on(INPUT_DIRECCION),
                Enter.theValue(datosCompra.get(0).getDireccion()).into(INPUT_DIRECCION),
                Click.on(INPUT_BARRIO),
                Enter.theValue(datosCompra.get(0).getBarrio()).into(INPUT_BARRIO),
                Click.on(INPUT_LOCALIDAD),
                Enter.theValue(datosCompra.get(0).getLocalidad()).into(INPUT_LOCALIDAD),
                Click.on(BTN_ENVIARPEDIDO),
                unosSegundos(5)
        );
    }
}