package co.com.AutoTeddyShop.userinterface.ProductosAdmin;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class ProductoAdminPage {

    public static final Target INPUT_ESTILO_PRODUCTO = Target.the("Campo estilo del producto")
            .located(By.xpath("/html/body/div[1]/div/div/div/div[2]/form/div[1]/div/input"));

    public static final Target INPUT_DISPONIBILIDAD = Target.the("Campo disponibilidad del producto")
            .located(By.xpath("/html/body/div[1]/div/div/div/div[2]/form/div[2]/div/input"));

    public static final Target INPUT_TAMANO = Target.the("Campo tamaño del producto")
            .located(By.xpath("/html/body/div[1]/div/div/div/div[2]/form/div[3]/div/input"));

   //public static final Target INPUT_IMAGEN = Target.the("Campo imagen del producto")
   //        .located(By.xpath("/html/body/div[1]/div/div/div/div[2]/form/div[7]/div/input"));


    public static final Target SELECT_CATEGORIA = Target.the("Selector de la categoria ")
            .located(By.xpath("/html/body/div[1]/div/div/div/div[2]/form/div[4]/div/div"));

    public static Target OPCION_CATEGORIAS(String opcion) {
        return Target.the("Opción Categoria " + opcion)
                .located(net.serenitybdd.core.annotations.findby.By.xpath("//ul//li[normalize-space(text())='" + opcion + "']"));
    }

    public static final Target SELECT_CATALOGO = Target.the("Selector de historial de la categoria")
            .located(By.xpath("/html/body/div[1]/div/div/div/div[2]/form/div[5]/div/div"));

    public static Target OPCION_CATALOGO(String opcion) {
        return Target.the("Opción  Catalogo " + opcion)
                .located(net.serenitybdd.core.annotations.findby.By.xpath("//ul//li[normalize-space(text())='" + opcion + "']"));
    }

    public static final Target BTN_CATEGORIA = Target.the("Boton Seleccionar Categoria").located(By.xpath("/html/body/div[1]/div/div/div/div[2]/form/div[4]/div/div"));
    public static final Target BTN_ELEGIRCATEGORIA = Target.the("Boton Seleccionar Categoria ´Electronica´").located(By.xpath("/html/body/div[3]/div[3]/ul/li"));
    public static final Target BTN_CATALOGO = Target.the("Boton Seleccionar Catalogo").located(By.xpath("/html/body/div[1]/div/div/div/div[2]/form/div[5]/div/div"));
    public static final Target BTN_ELEGIRCATALOGO = Target.the("Boton Seleccionar el Catalogo ´General´").located(By.xpath("/html/body/div[3]/div[3]/ul/li[2]"));
   // public static final Target BTN_LL = Target.the("Boton Seleccionar el Catalogo ´General´").located(By.xpath("/html/body/div[3]/div[1]"));

    public static final Target SELECT_HISTORIAL_PRECIO = Target.the("Selector de historial de precio")
            .located(By.xpath("/html/body/div[1]/div/div/div/div[2]/form/div[6]/div/div"));
    public static final Target BTN_ELEGIRHISTORIAL = Target.the("Boton Seleccionar el Catalogo ´General´").located(By.xpath("/html/body/div[3]/div[3]/ul/li"));


    public static final Target BTN_GUARDAR_PRODUCTO = Target.the("Botón para crear producto")
            .located(By.xpath("/html/body/div[1]/div/div/div/div[2]/form/div[8]/button[1]"));

    public static final Target MENSAJE_EXITO = Target.the("mensaje de producto creado")
            .located(By.xpath("//h2[@class='swal2-title' and @id='swal2-title' and text()='Éxito']\n"));



    //Validaciones
    public static Target BOTON_PRODUCTOS = Target.the("Boton para ir a la pagina de productos").located(By.xpath("/html/body/div[2]/div[3]/div/ul/div/div/div/div/li[3]"));
    public static Target BUSCAR_PRODCUTO = Target.the("Buscar el producto recien creado por ID").located(By.xpath("/html/body/div[1]/div/div/div/div[3]/div/div[1]/div/input"));
    public static Target BOTON_BUSCAR = Target.the("Boton para buscar el producto").located(By.xpath("//*[@id=\"root\"]/div/div/div/div[3]/div/div[2]/button[1]"));
    public static Target DESCRIPCION_PRODUCTO = Target.the("Descripcion del producto recien creado").located(By.xpath("//*[@id=\"root\"]/div/div/div/div[3]/div[2]/div/div[1]/p[2]"));

    //Eliminar Producto
    public static Target BOTON_ELIMINAR = Target.the("Boton para eliminar el producto").located(By.xpath("/html/body/div[1]/div/div/div/div[3]/div[2]/div/div[2]/button[2]"));
    public static Target BOTON_CONFIRMARELIMINACION = Target.the("Boton para confirmar la eliminacion").located(By.xpath("/html/body/div[3]/div/div[6]/button[3]"));

}

