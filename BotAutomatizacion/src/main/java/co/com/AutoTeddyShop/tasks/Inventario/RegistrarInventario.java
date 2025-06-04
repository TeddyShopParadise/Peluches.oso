package co.com.AutoTeddyShop.tasks.Inventario;

import co.com.AutoTeddyShop.models.DatosInventario;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import java.util.List;

import static co.com.AutoTeddyShop.tasks.Esperar.unosSegundos;
import static co.com.AutoTeddyShop.userinterface.Inventario.InteraccionInventarioProducto.*;

public class RegistrarInventario implements Task {

    private final List<DatosInventario> datosInventario;

    public RegistrarInventario(List<DatosInventario> datosInventario) {
        this.datosInventario = datosInventario;
    }

    public static RegistrarInventario conLosDatos(List<DatosInventario> datosInventario) {
        return Instrumented.instanceOf(RegistrarInventario.class).withProperties(datosInventario);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        DatosInventario datos = datosInventario.get(0);

        actor.attemptsTo(

                unosSegundos(1),
                Enter.theValue(String.valueOf(datos.getStockInicial())).into(INPUT_STOCK_INCIAL),

                unosSegundos(1),
                Enter.theValue(String.valueOf(datos.getStockMinimo())).into(INPUT_STOCK_MINIMO),

                unosSegundos(1),
                Enter.theValue(String.valueOf(datos.getStockMaximo())).into(INPUT_STOCK_MAXIMO),

                unosSegundos(1),
                Enter.theValue(String.valueOf(datos.getPrecioVenta())).into(INPUT_PRECIO_VENTA),

                unosSegundos(1),
                Enter.theValue(String.valueOf(datos.getPrecioCompra())).into(INPUT_PRECIO_COMPRA),

                unosSegundos(1),
                Click.on(BTN_CONFIRMAR_CREACION_INVENTARIO),
                unosSegundos(1)

        );
    }
}
