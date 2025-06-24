package co.com.AutoTeddyShop.tasks.ProductosUsuario;

import co.com.AutoTeddyShop.models.Utilidades.NumeroRandom;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import co.com.AutoTeddyShop.models.DatosCompraProducto;
import org.openxmlformats.schemas.drawingml.x2006.chart.CTHeaderFooter;

import static co.com.AutoTeddyShop.tasks.Esperar.unosSegundos;
import static co.com.AutoTeddyShop.userinterface.CatalogosUsuario.VisualizarCatalogos.*;
import static co.com.AutoTeddyShop.userinterface.ProductosUsuario.InteraccionProductosUsuario.*;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

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
        DatosCompraProducto comprador = datosCompra.get(0);
        String Comprador = comprador.getNombrePaga() + NumeroRandom.generarNumeroAleatorio();

        actor.attemptsTo(
               //Click.on(BTN_LISTADESPLEGABLE),
               //Click.on(BTN_PRODUCTOUSUARIO),
                Click.on(BTN_CATEGORIA),
                Click.on(BTN_OSOSCOLORES),
                Click.on((BTN_DETALLES)),
                Click.on(BTN_CERRAR),
                Click.on(BTN_COMPRAR),
                Click.on(BTN_METODOPAGO),
                Click.on(BTN_NEQUI),
                Click.on(INPUT_NOMBREPAGA),
                Enter.theValue(Comprador).into(INPUT_NOMBREPAGA),
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
                Click.on(BTN_SELECCIONARVENDEDOR),
                Click.on(BTN_ENVIARPEDIDO),
                unosSegundos(7)
                );
        actor.remember(SessionVariables.NombrePedido.toString(), Comprador);
    }
}