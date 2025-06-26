package co.com.AutoTeddyShop.tasks.Inventario;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.questions.Text;
import net.serenitybdd.screenplay.targets.Target;
import static jxl.biff.FormatRecord.logger;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class GuardarID implements Task {

    private final Target idProducto;

    private final String key;

    public GuardarID(String key,Target idProducto ){
        this.key = key;
        this.idProducto = idProducto;

    }

    public static GuardarID guardar(String key, Target idProducto){
        logger.info("--------------------entra a la clase----------------");
        return instrumented(GuardarID.class,key, idProducto);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {

        String id = Text.of(idProducto).viewedBy(actor).asString().trim();
        logger.info("----------------------Override--------------" + id);
        actor.remember(key, id);
    }
}
