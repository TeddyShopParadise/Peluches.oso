package co.com.AutoTeddyShop.userinterface.UsuarioAdmin;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class InteraccionUsuariosAdmin {
    public static Target INPUT_EMAIL =
            Target.the("Campo de email")
                    .located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/div[1]/div/input"));

    public static Target INPUT_CONTRASENA =
            Target.the("Campo de contraseña")
                    .located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/div[2]/div/input"));

    public static Target INPUT_NOMBRE_USUARIO =
            Target.the("Campo de nombre de usuario")
                    .located(By.xpath("//*[@id=\":r5:\"]"));


    public static final Target SELECT_ROLES = Target.the("Rol del usuario")
            .locatedBy("//*[@id=\"root\"]/div/div/div/div/div[2]/div[4]/div/div");

    public static Target BTN_ADMIN =
            Target.the("Botón escoger empleado")
                    .located(By.xpath("//*[@id=\":r7:\"]/li[1]"));

    public static Target BTN_DEVOLVER =
            Target.the("Botón escoger empleado")
                    .located(By.xpath("//div[contains(@class, 'MuiBackdrop-root') and contains(@class, 'MuiBackdrop-invisible') and contains(@class, 'MuiModal-backdrop') and contains(@class, 'css-vl6bb4-MuiBackdrop-root-MuiModal-backdrop')]\n"));


    public static final Target SELECT_EMPLEADO = Target.the("Empleado asignado")
            .locatedBy("//*[@id=\"root\"]/div/div/div/div/div[2]/div[5]/div/div");

    public static final Target BTN_EMPLEA = Target.the("Empleado asignado")
            .locatedBy("//*[@id=\":r9:\"]/li[4]");




    public static Target BTN_CREAR_USUARIO =
            Target.the("Botón Crear Usuario primera parte")
                    .located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/div[7]/button[1]"));


    public static Target BTN_CREAR_FINAL =
            Target.the("Botón Crear Usuario")
                    .located(By.xpath("//button[contains(@class, 'swal2-confirm') and contains(@class, 'swal2-styled')]\n"));

    public static Target MENSAJE_CONFIRMACION =
            Target.the("Mensaje de usuario creado")
                    .located(By.xpath("//div[@id='swal2-html-container' and normalize-space()='El usuario se ha registrado correctamente']\n"));

    //Validaciones
    public static Target BUSCAR_USUARIO = Target.the("Barra de busqueda de usuarios").located(By.xpath("/html/body/div[1]/div/div/div/div/div[3]/div/div/div/input"));
    public static Target NOMBRE_USUARIO = Target.the("Nombre del usuario recien registrador").located(By.xpath("/html/body/div[1]/div/div/div/div/div[4]/table/tbody/tr/td[1]"));
    public static Target EMAIL_USUARIO = Target.the("Email del usuario recien creado").located(By.xpath("/html/body/div[1]/div/div/div/div/div[4]/table/tbody/tr/td[2]"));
}