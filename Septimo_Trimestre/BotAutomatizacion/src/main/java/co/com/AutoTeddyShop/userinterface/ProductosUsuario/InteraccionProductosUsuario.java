package co.com.AutoTeddyShop.userinterface.ProductosUsuario;
import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
public class InteraccionProductosUsuario {
    public static Target BTN_CATEGORIA = Target.the("Boton selector de las Categorias").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div/div"));
    public static Target BTN_OSOSCOLORES = Target.the("Boton para seleccionar 'Osos de Distintos Colores' para filtrar los productos").located(By.xpath("/html/body/div[3]/div[3]/ul/li[4]"));
    public static Target BTN_DETALLES = Target.the("Boton para ver los Detalles del producto").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[3]/div/div/div/div/button[1]"));
    public static Target BTN_CERRAR = Target.the("Boton para Cerrar la vista de Detalles del producto").located(By.xpath("/html/body/div[3]/div[3]/div/div/button"));
    public static Target BTN_COMPRAR = Target.the("Boton Comprar el producto").located(By.xpath("/html/body/div[1]/div/div/div/div/div[3]/div/div/div/div/button[2]"));
    public static Target BTN_METODOPAGO = Target.the("Boton selector de Metodo de Pago").located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/div[2]/div[1]/div/div"));
    public static Target BTN_NEQUI = Target.the("Boton para seleccionar 'Nequi' como metodo de pago").located(By.xpath("/html/body/div[4]/div[3]/ul/li[3]"));
    public static Target INPUT_NOMBREPAGA = Target.the("Ingreso del Nombre de quien Paga").located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/div[2]/div[2]/div/input"));
    public static Target INPUT_TELEFONOPAGA = Target.the("Ingreso del Telefono de quien Paga").located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/div[2]/div[3]/div/input"));
    public static Target INPUT_NOMBRERECIBE = Target.the("Ingreso del Nombre de quien Recibe").located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/div[3]/div[1]/div/input"));
    public static Target INPUT_TELEFONORECIBE = Target.the("Ingreso del Telefono de quien Recibe").located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/div[3]/div[2]/div/input"));
    public static Target INPUT_DIRECCION = Target.the("Ingreso de la Direccion").located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/div[4]/div[1]/div/input"));
    public static Target INPUT_BARRIO = Target.the("Ingreso del Barrio").located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/div[4]/div[2]/div/input"));
    public static Target INPUT_LOCALIDAD = Target.the("Ingreso de la Localidad").located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/div[4]/div[3]/div/input"));
    public static Target BTN_ENVIARPEDIDO = Target.the("Boton selector de Metodo de Pago").located(By.xpath("/html/body/div[3]/div[3]/div/div[3]/button[2]"));
    public static Target BTN_SELECCIONARVENDEDOR = Target.the("Boton para seleccionar el vendedor").located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/div[4]/div[4]/div/div[1]/div"));
    public static Target BTN_VALIDACION = Target.the("Boton para cerrar el mensaje que revela el exito al crear el pedido").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[4]/div/div[3]/button"));

    //Validaciones
    public static Target BTN_GESTIONPEDIDO = Target.the("Boton para la gestión de pedidos").located(By.xpath("/html/body/div[2]/div[3]/div/ul/li[5]"));
    public static Target BTN_PEDIDOS = Target.the("Boton para validar que el pedido se creo correctamente").located(By.xpath("/html/body/div[2]/div[3]/div/ul/div/div/div/div/li[1]"));
    public static Target BTN_BUSCAR = Target.the("Barra de busqueda para filtrar los pedidos").located(By.xpath("/html/body/div[1]/div/div/div/div/div[3]/div[1]/div/div/input"));
    public static Target NOMBRE_PEDIDO = Target.the("Nombre de la persona que realizo el pedido").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[3]/div[2]/table/tbody/tr/td[1]"));
    public static Target LISTA_ESTADO = Target.the("Estado actual del pedido").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[3]/div[2]/table/tbody/tr/td[3]/div/div/div"));
    public static Target ESTADO = Target.the("Estado seleccionado del pedido").located(By.xpath("/html/body/div[3]/div[3]/ul/li[2]/div/span"));
    public static Target MENSAJE_ESTADO = Target.the("Mensaje de exito del cambio del estado").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[4]/div/div[2]"));
    public static Target BOTON_ACEPTARCODESPACE = Target.the("Boton de aceptar").located(By.xpath("/html/body/div/div/main/div/div/div/div/div/div/button"));
}
