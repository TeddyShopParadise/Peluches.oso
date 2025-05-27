package co.com.AutoTeddyShop.tasks.CategoriasAdmin;

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

public class NavegacionCategorias implements Task{

    private List<DatosCategoria> datosCategoria;


    public NavegacionCategorias(List<DatosCategoria> datosCategoria){
        this.datosCategoria = datosCategoria;
    }

    public static NavegacionCategorias aute(List<DatosCategoria> datosCategoria){
        return Instrumented.instanceOf(NavegacionCategorias.class).withProperties(datosCategoria);

    }
    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(INPUT_NOMBRECATEGORIA),
                Enter.theValue(datosCategoria.get(0).getNombreCategoria()).into(INPUT_NOMBRECATEGORIA),
                Click.on(INPUT_DESCRIPCIONCATEGORIA),
                Enter.theValue(datosCategoria.get(0).getDescripcionCategoria()).into(INPUT_DESCRIPCIONCATEGORIA),
                Click.on(BTN_CATEGORIA),
                Click.on(BTN_CONFIRMACION)
        );
    }
}