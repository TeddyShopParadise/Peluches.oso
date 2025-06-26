package co.com.AutoTeddyShop.tasks.HistorialPrecio;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.waits.WaitUntil;

import static co.com.AutoTeddyShop.userinterface.HIstorialPrecio.InteraccionHistorialPrecio.*;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class NavegarHastaUltimaPagina implements Task {

    public static NavegarHastaUltimaPagina delHistorial() {
        return new NavegarHastaUltimaPagina();
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
                        WaitUntil.the(TABLA_HISTORIAL, isVisible()).forNoMoreThan(5).seconds()
                );
            } catch (Exception e) {
                break;
            }
        }
    }
}