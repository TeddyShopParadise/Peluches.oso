package co.com.AutoTeddyShop.models.NumeroRandom;

import java.util.Random;

public class NumeroRandom {
    public static String generarNumeroAleatorio(){
        int numero = new Random().nextInt(100);
        return String.valueOf(numero);
    }
}
