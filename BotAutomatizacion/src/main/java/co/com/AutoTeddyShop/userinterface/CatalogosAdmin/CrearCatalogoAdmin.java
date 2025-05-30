package co.com.AutoTeddyShop.userinterface.CatalogosAdmin;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class CrearCatalogoAdmin {

    public static Target INPUT_NOMBRECATALOGO = Target.the("Nombre del catalogo").located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[1]/div/input"));
    public static Target INPUT_DESCRIPCIONCATALOGO = Target.the("Descripcion del catalogo").located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[2]/div/input"));
    public static Target BTN_COMPANIA = Target.the("Compañia").located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[3]/div/div"));
    public static Target BTN_SELECCIONARCOMPANIA = Target.the("Seleccionar compañia").located(By.xpath("/html/body/div[3]/div[3]/ul/li[1]"));
    public static Target BTN_SELECCCIONARIMAGEN = Target.the("Seleccionar imagen").located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[4]/div/input"));
    public static Target BTN_CREARCATALOGO = Target.the("Crear").located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[5]/button[1]"));
    public static Target BTN_CONFIRMACIONCREAR = Target.the("Confirmar creacion").located(By.xpath("/html/body/div[3]/div/div[6]/button[3]"));
    public static Target MENSAJE_CREACION = Target.the("Creado correctamente").located(By.xpath("//*[@id=\"swal2-html-container\"]"));
}
