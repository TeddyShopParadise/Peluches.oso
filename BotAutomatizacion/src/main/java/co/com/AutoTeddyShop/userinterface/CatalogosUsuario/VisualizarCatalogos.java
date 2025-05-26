package co.com.AutoTeddyShop.userinterface.CatalogosUsuario;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.screenplay.targets.Target;
import net.serenitybdd.core.pages.PageObject;

public class VisualizarCatalogos extends PageObject {
    public static Target BTN_LISTADESPLEGABLE = Target.the(" Desplegar la lista de Menu Productos ").located(By.xpath("//*[@id=\"root\"]/header/div/div/button"));
    public static Target BTN_CATALOGOS = Target.the("Ingreso seccion Catalogos").located(By.xpath("/html/body/div[3]/div[3]/ul/a[1]"));

}
