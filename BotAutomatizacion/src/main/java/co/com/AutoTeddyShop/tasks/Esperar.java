package co.com.AutoTeddyShop.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;

public class Esperar implements Task {

    private int segundos;

    public Esperar(int segundos) {
        this.segundos = segundos;
    }

    public static Esperar unosSegundos(int segundos) {
        return new Esperar(segundos);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        try {
            Thread.sleep(segundos * 2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}