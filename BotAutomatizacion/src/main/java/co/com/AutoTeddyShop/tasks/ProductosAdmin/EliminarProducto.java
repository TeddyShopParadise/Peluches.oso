package co.com.AutoTeddyShop.tasks.ProductosAdmin;

import co.com.AutoTeddyShop.models.DatosInventario;
import co.com.AutoTeddyShop.models.DatosProducto;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;

import java.util.List;

import static co.com.AutoTeddyShop.userinterface.ProductosAdmin.ProductoAdminPage.BOTON_CONFIRMARELIMINACION;
import static co.com.AutoTeddyShop.userinterface.ProductosAdmin.ProductoAdminPage.BOTON_ELIMINAR;

public class EliminarProducto implements Task {
    private List<DatosInventario> datosInventario;

    public EliminarProducto(List<DatosInventario> datosInventario){ this.datosInventario = datosInventario; }

    public static EliminarProducto eliminar(List<DatosInventario> datosInventario){
        return Instrumented.instanceOf(EliminarProducto.class).withProperties(datosInventario);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(BOTON_ELIMINAR),
                Click.on(BOTON_CONFIRMARELIMINACION)
        );
    }
}
