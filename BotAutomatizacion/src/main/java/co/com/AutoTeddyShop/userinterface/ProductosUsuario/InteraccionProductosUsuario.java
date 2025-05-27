package co.com.AutoTeddyShop.userinterface.ProductosUsuario;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;

public class InteraccionProductosUsuario {
    public static Target BTN_CATEGORIA = Target.the("Boton selector de las Categorias").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div"));
    public static Target BTN_OSOSCOLORES = Target.the("Boton para seleccionar 'Osos de Distintos Colores' para filtrar los productos").located(By.xpath("//*[@id=\":r1:\"]/li[4]"));
    public static Target BTN_DETALLES = Target.the("Boton para ver los Detalles del producto").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div[1]/div/div/div/button[1]"));
    public static Target BTN_CERRAR = Target.the("Boton para Cerrar la vista de Detalles del producto").located(By.xpath("/html/body/div[3]/div[3]/div/div/button"));
    public static Target BTN_COMPRAR = Target.the("Boton Comprar el producto").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div[1]/div/div/div/button[2]"));
    public static Target BTN_METODOPAGO = Target.the("Boton selector de Metodo de Pago").located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div[1]/div/div"));
    public static Target BTN_NEQUI = Target.the("Boton para seleccionar 'Nequi' como metodo de pago").located(By.xpath("/html/body/div[4]/div[3]/ul/li[2]"));
    public static Target INPUT_NOMBREPAGA = Target.the("Ingreso del Nombre de quien Paga").located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div[2]/div/input"));
    public static Target INPUT_TELEFONOPAGA = Target.the("Ingreso del Telefono de quien Paga").located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div[3]/div/input"));
    public static Target INPUT_NOMBRERECIBE = Target.the("Ingreso del Nombre de quien Recibe").located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div[4]/div/input"));
    public static Target INPUT_TELEFONORECIBE = Target.the("Ingreso del Telefono de quien Recibe").located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div[5]/div/input"));
    public static Target INPUT_DIRECCION = Target.the("Ingreso de la Direccion").located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div[6]/div/input"));
    public static Target INPUT_BARRIO = Target.the("Ingreso del Barrio").located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div[7]/div/input"));
    public static Target INPUT_LOCALIDAD = Target.the("Ingreso de la Localidad").located(By.xpath("/html/body/div[3]/div[3]/div/div[1]/div[8]/div/input"));
    public static Target BTN_ENVIARPEDIDO = Target.the("Boton selector de Metodo de Pago").located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/button[1]"));
    public static Target BTN_VALIDACION = Target.the("Boton para cerrar el mensaje que revela el exito al crear el pedido").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[4]/div/div[3]/button"));
}
