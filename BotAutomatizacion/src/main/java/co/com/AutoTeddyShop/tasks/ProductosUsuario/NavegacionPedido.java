package co.com.AutoTeddyShop.tasks.ProductosUsuario;

import co.com.AutoTeddyShop.models.DatosCompraProducto;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import java.util.List;

import static co.com.AutoTeddyShop.userinterface.CatalogosUsuario.VisualizarCatalogos.SIDEBAR;
import static co.com.AutoTeddyShop.userinterface.ProductosUsuario.InteraccionProductosUsuario.*;

public class NavegacionPedido implements Task {

    private List<DatosCompraProducto> datosCompra;

    public NavegacionPedido(List<DatosCompraProducto> datosCompra) { this.datosCompra = datosCompra; }

    public static NavegacionPedido pedido(List<DatosCompraProducto> datosCompra){
        return Instrumented.instanceOf(NavegacionPedido.class).withProperties(datosCompra);
    }
    @Override
    public <T extends Actor> void performAs(T actor) {
        String filtroComprador = actor.recall(SessionVariables.NombrePedido.toString());
        actor.attemptsTo(
                Click.on(SIDEBAR),
                Click.on(BTN_GESTIONPEDIDO),
                Click.on(BTN_PEDIDOS),
                Click.on(BTN_BUSCAR),
                Enter.theValue(filtroComprador).into(BTN_BUSCAR),
                Click.on(LISTA_ESTADO),
                Click.on(ESTADO)
        );
    }
}
