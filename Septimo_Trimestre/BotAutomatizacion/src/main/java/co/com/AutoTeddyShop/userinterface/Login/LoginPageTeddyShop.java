package co.com.AutoTeddyShop.userinterface.Login;

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

    public static final Target TEXT_PELUCHESOSO = Target.the("Texto de verificacion")
            .located(By.xpath("/html/body/div[1]/div/div/div[3]/div/p"));


}
