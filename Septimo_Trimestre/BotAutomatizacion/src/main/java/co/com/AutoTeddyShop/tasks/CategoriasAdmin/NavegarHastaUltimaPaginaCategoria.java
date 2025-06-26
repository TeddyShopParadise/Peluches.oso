package co.com.AutoTeddyShop.tasks.CategoriasAdmin;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.waits.WaitUntil;

import static co.com.AutoTeddyShop.userinterface.CategoriasAdmin.InteraccionCategoriasAdmin.*;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class NavegarHastaUltimaPaginaCategoria  implements Task {

    public static NavegarHastaUltimaPaginaCategoria delListadoCategorias() {
        return new NavegarHastaUltimaPaginaCategoria();
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        while (BOTON_SIGUIENTE.resolveFor(actor).isVisible()) {
            if (!BOTON_SIGUIENTE.resolveFor(actor).isEnabled()) {
                break;
            }
            try {
                BOTON_SIGUIENTE.resolveFor(actor).click();
                actor.attemptsTo(
                        WaitUntil.the(TABLA_CATEGORIA, isVisible()).forNoMoreThan(5).seconds()
                );
            } catch (Exception e) {
                break;
            }
        }
    }
}
