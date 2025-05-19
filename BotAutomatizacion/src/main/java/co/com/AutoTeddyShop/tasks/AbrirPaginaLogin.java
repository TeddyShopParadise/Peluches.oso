package co.com.AutoTeddyShop.tasks;

import co.com.AutoTeddyShop.userinterface.InicioTeddyShop;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Open;

public class AbrirPaginaLogin implements Task {

    InicioTeddyShop inicioTeddyShop;

    public static AbrirPaginaLogin lapagina(){
        return Tasks.instrumented(AbrirPaginaLogin.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(Open.browserOn(inicioTeddyShop));
    }
}
