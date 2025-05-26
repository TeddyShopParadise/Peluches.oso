package co.com.AutoTeddyShop.utils.hooks;

import cucumber.api.java.Before;
import net.serenitybdd.screenplay.actors.OnlineCast;
import static net.serenitybdd.screenplay.actors.OnStage.*;

public class PreparacionEscenarioProductoAdmin {
    @Before
    public void sepUp(){
        setTheStage(new OnlineCast());
        theActorCalled("usuario");
    }
}
