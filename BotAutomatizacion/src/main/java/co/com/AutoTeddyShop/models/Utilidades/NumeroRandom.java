package co.com.AutoTeddyShop.models.Utilidades;

import java.util.Random;

public class NumeroRandom {
    public static String generarNumeroAleatorio() {
        int numero = new Random().nextInt(1000);
        return String.valueOf(numero);
    }

    public static String generarNumeroAleatorioBll() {
        int numero = new Random().nextInt(1000);
        return String.valueOf(numero);

    }

}
