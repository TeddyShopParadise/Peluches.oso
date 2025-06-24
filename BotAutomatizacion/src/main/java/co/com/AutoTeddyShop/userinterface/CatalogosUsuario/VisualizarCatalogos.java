package co.com.AutoTeddyShop.userinterface.CatalogosUsuario;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.screenplay.targets.Target;
import net.serenitybdd.core.pages.PageObject;

public class VisualizarCatalogos extends PageObject {
    public static Target SIDEBAR = Target.the("Boton para abrir el sidebar").located(By.xpath("/html/body/div[1]/header/div/button"));
    public static Target BTN_LISTADESPLEGABLE = Target.the(" Desplegar la lista de Menu Productos ").located(By.xpath("/html/body/div[2]/div[3]/div/ul/li[2]"));
    public static Target BTN_CATALOGOS = Target.the("Ingreso seccion Catalogos").located(By.xpath("/html/body/div[2]/div[3]/div/ul/div/div/div/div/li[1]/div/span"));
    public static Target BTN_VERPRODUCTOS = Target.the("Ingreso seccion Productos desde la vista de catalogos").located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/div[1]/div/div/div[2]/button"));
    public static Target MENSAJE_VALIDAR = Target.the("Texto usado para validar la correcta visualizacion de los catalogos").located(By.xpath("/html/body/div[1]/div/div/div/div/div[1]/h6"));

}
