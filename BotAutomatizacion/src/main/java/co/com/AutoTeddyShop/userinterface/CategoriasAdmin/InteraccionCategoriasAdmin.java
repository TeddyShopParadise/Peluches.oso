package co.com.AutoTeddyShop.userinterface.CategoriasAdmin;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.screenplay.targets.Target;

public class InteraccionCategoriasAdmin {
    public static Target INPUT_NOMBRECATEGORIA = Target.the("Ingreso del Nombre de la Categoriae").located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[1]/div/input"));
    public static Target INPUT_DESCRIPCIONCATEGORIA = Target.the("Ingreso de la Descripcion de la Categoria").located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[2]/div/input"));
    public static Target BTN_CATEGORIA = Target.the("Boton Crear Categorias").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/form/div[3]/button[1]"));
    public static Target BTN_CONFIRMACION = Target.the("Boton Crear Categorias").located(By.xpath("/html/body/div[3]/div/div[6]/button[3]"));
    public static Target MENSAJE_CONFIRMACION = Target.the("Mensaje de categoria creada con exito").located(By.xpath("//div[contains(@class, 'swal2-html-container') and text()='La categoría se ha guardado correctamente.']\n"));

    public static Target TABLA_CATEGORIA = Target.the("Boton Crear Categorias").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[3]/div[1]"));
    public static Target FILAS_TABLA_CATEGORIA = Target.the("Boton Crear Categorias").located(By.xpath("//div[contains(@class, 'MuiTableContainer-root')]//tbody/tr"));

    public static Target BOTON_SIGUIENTE = Target.the("Boton Crear Categorias").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[3]/div[2]/div/div[3]/button[2]"));

}