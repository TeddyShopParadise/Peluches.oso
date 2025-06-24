package co.com.AutoTeddyShop.userinterface.Inventario;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class InteraccionInventarioProducto {
    public static final Target INPUT_STOCK_INCIAL = Target.the("Campo del stock inicial")
            .located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div/div[1]/div/input"));
    public static final Target INPUT_STOCK_MINIMO = Target.the("Campo del stock inicial")
            .located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div/div[2]/div/input"));
    public static final Target INPUT_STOCK_MAXIMO = Target.the("Campo del stock inicial")
            .located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div/div[3]/div/input"));
    public static final Target INPUT_PRECIO_VENTA = Target.the("Campo del stock inicial")
            .located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div/div[4]/div/input"));
    public static final Target INPUT_PRECIO_COMPRA = Target.the("Campo del stock inicial")
            .located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div/div[5]/div/input"));
    public static final Target BTN_CONFIRMAR_CREACION_INVENTARIO = Target.the("Campo del stock inicial")
            .located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/button[2]"));
    public static final Target MENSAJE_EXITO_INVENTARIO = Target.the("mensaje de producto creado")
            .located(By.xpath("//h2[@id='swal2-title' and text()='Éxito']\n"));


    //Validaciones
    public static Target BOTON_OK = Target.the("Boton de ok").located(By.xpath("/html/body/div[3]/div/div[6]/button[1]"));
    public static Target ABRIR_LISTA = Target.the("Abrir la lista de opciones").located(By.xpath("/html/body/div[1]/header/div/button"));
    public static Target BOTON_ADMINISTRARPRODUCTOS = Target.the("Lista desplegable de administrar productos").located(By.xpath("/html/body/div[2]/div[3]/div/ul/li[4]"));
    public static Target BOTON_INVENTARIO = Target.the("Boton para ir a la pagina de inventarios").located(By.xpath("/html/body/div[2]/div[3]/div/ul/div/div/div/div/li[1]"));
    public static Target CANTIDAD_INVENTARIO = Target.the("Boton para cambiar la cantidad de datos de la tabla de inventarios").located(By.xpath("/html/body/div[1]/div/div/div/div/div[3]/div[2]/div/div/div[2]/div"));
    public static Target SELECCIONAR_CANTIDAD = Target.the("Seleccionar la cantidad de datos por pagina").located(By.xpath("/html/body/div[3]/div[3]/ul/li[3]"));
    public static Target ESTILO_PRODUCTO = Target.the("Estilo del producto recien creado").located(By.xpath("//*[@id=\"root\"]/div/div/div/div[3]/div[2]/div/div[1]/p[2]"));
    public static Target BOTON_DETALLES = Target.the("Boton para ver los detalles del inventario").located(By.xpath("/html/body/div[1]/div/div/div/div/div[3]/div[1]/table/tbody/tr[7]/td[5]/button[3]"));
    public static Target ID_PRODUCTO = Target.the("ID del producto recien creado").located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div/p[2]"));
    public static Target BOTON_CERRAR = Target.the("Boton para cerrar el cuadro de dialogo").located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/button"));
}
