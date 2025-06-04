package co.com.AutoTeddyShop.userinterface.Inventario;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class InteraccionInventarioProducto {
    public static final Target INPUT_STOCK_INCIAL = Target.the("Campo del stock inicial")
            .located(By.xpath("//*[@id=\":rt:\"]"));
    public static final Target INPUT_STOCK_MINIMO = Target.the("Campo del stock inicial")
            .located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div/div[2]/div/input"));
    public static final Target INPUT_STOCK_MAXIMO = Target.the("Campo del stock inicial")
            .located(By.xpath("//*[@id=\":r11:\"]"));
    public static final Target INPUT_PRECIO_VENTA = Target.the("Campo del stock inicial")
            .located(By.xpath("//*[@id=\":r13:\"]"));
    public static final Target INPUT_PRECIO_COMPRA = Target.the("Campo del stock inicial")
            .located(By.xpath("//*[@id=\":r15:\"]"));
    public static final Target BTN_CONFIRMAR_CREACION_INVENTARIO = Target.the("Campo del stock inicial")
            .located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/button[2]"));
    public static final Target MENSAJE_EXITO_INVENTARIO = Target.the("mensaje de producto creado")
            .located(By.xpath("//h2[@id='swal2-title' and text()='Éxito']\n"));


}
