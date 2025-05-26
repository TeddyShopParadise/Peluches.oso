package co.com.AutoTeddyShop.userinterface;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class LoginPageTeddyShop extends PageObject {

    public static final Target INPUT_USUARIO = Target.the("Campo para ingresar el correo electrónico")
            .located(By.id(":r1:"));

    public static final Target INPUT_CONTRASENA = Target.the("Campo para ingresar la contraseña")
            .located(By.id(":r3:"));

    public static final Target BOTON_INICIAR_SESION = Target.the("Botón INICIA SESIÓN")
            .located(By.cssSelector("button[type='submit']"));

    public static final Target BOTON_GESTION_PEDIDO = Target.the("Botón Gestión de Pedido")
            .located(By.xpath("//button[normalize-space()='Gestión de Pedido']"));


}
