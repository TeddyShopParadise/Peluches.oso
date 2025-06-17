package co.com.AutoTeddyShop.tasks.ProductosAdmin;

import co.com.AutoTeddyShop.models.DatosInventario;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.Scroll;

import java.util.List;

import static co.com.AutoTeddyShop.userinterface.Inventario.InteraccionInventarioProducto.*;
import static co.com.AutoTeddyShop.userinterface.ProductosAdmin.ProductoAdminPage.*;
import static jxl.biff.FormatRecord.logger;

public class FiltrarProducto implements Task {
    private List<DatosInventario> datosInventarios;

    public FiltrarProducto(List<DatosInventario> datosInventarios){ this.datosInventarios = datosInventarios; }

    public static FiltrarProducto filtrar(List<DatosInventario> datosInventarios){
        return Instrumented.instanceOf(FiltrarProducto.class).withProperties(datosInventarios);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        String ID = actor.recall("id");

        String idProducto = extraerIdProducto(ID);

        actor.attemptsTo(
                Click.on(BOTON_CERRAR),
                Click.on(ABRIR_LISTA),
                //Click.on(BOTON_ADMINISTRARPRODUCTOS),
                Click.on(BOTON_PRODUCTOS),
                Scroll.to(BUSCAR_PRODCUTO),
                Click.on(BUSCAR_PRODCUTO),
                Enter.theValue(idProducto).into(BUSCAR_PRODCUTO),
                Click.on(BOTON_BUSCAR)
        );
    }

    private String extraerIdProducto(String texto) {
        try {
            if (texto.contains("ID Producto:")) {
                String[] partes = texto.split("ID Producto:");
                if (partes.length > 1) {

                    String posibleId = partes[1].trim().split(" ")[0];
                    return posibleId;
                }
            }
        } catch (Exception e) {
            logger.error("No se pudo extraer el ID del texto: " + texto, e);
        }
        return texto;
    }

}
