package co.com.AutoTeddyShop.userinterface.ProductosUsuario;
import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
public class InteraccionProductosUsuario {
    public static Target BTN_MENUPEDIDO= Target.the("Ingreso seccion Pedidos").located(By.xpath("//li[contains(@class, 'MuiListItem-root') and .//span[text()='Gestión de Pedidos']]\n"));
    public static Target BTN_PEDIDO= Target.the("Ingreso seccion Pedidos").located(By.xpath("//span[text()='Pedidos' and contains(@class, 'MuiTypography-root')]\n"));
    public static Target BTN_PRODUCTO_USUARIO = Target.the("Ingreso seccion Productos").located(By.xpath("//li[contains(@class, 'MuiListItem-root')]//span[text()='Productos']\n"));
    public static Target BTN_CATEGORIA = Target.the("Boton selector de las Categorias").located(By.xpath("//div[@tabindex='0' and @role='combobox' and @aria-controls=':r1:' and @aria-expanded='false' and @aria-haspopup='listbox' and contains(@class, 'MuiSelect-select') and contains(@class, 'MuiSelect-outlined') and contains(@class, 'MuiInputBase-input') and contains(@class, 'MuiOutlinedInput-input') and contains(text(), 'Todas las categorías')]\n"));
    public static Target BTN_OSOSCOLORES = Target.the("Boton para seleccionar 'Osos 80cm' para filtrar los productos").located(By.xpath("//li[contains(@class, 'MuiMenuItem-root') and contains(text(), 'Osos 80cm')]\n"));
    public static Target BTN_DETALLES = Target.the("Boton para ver los Detalles del producto").located(By.xpath("//button[@type='button' and contains(@class, 'MuiButton-root') and contains(text(), 'Ver Detalles')]\n"));
    public static Target BTN_CERRAR = Target.the("Boton para Cerrar la vista de Detalles del producto").located(By.xpath("//button[@type='button' and contains(@class, 'MuiButton-contained') and contains(text(), 'Cerrar')]\n"));
    public static Target BTN_COMPRAR = Target.the("Boton Comprar el producto").located(By.xpath("//button[@type='button' and contains(@class, 'MuiButton-contained') and contains(text(), 'Comprar')]\n"));
    public static Target BTN_METODOPAGO = Target.the("Boton selector de Metodo de Pago").located(By.xpath("/html/body/div[3]/div[3]/div/div[2]/div[2]/div[1]/div/div"));
    public static Target BTN_NEQUI = Target.the("Boton para seleccionar 'Nequi' como metodo de pago").located(By.xpath("/html/body/div[4]/div[3]/ul/li[2]"));
    public static Target INPUT_NOMBREPAGA = Target.the("Ingreso del Nombre de quien Paga").located(By.xpath("//input[@name='nombreComprador']\n"));
    public static Target INPUT_TELEFONOPAGA = Target.the("Ingreso del Telefono de quien Paga").located(By.xpath("//input[@name='numeroComprador']\n"));
    public static Target INPUT_NOMBRERECIBE = Target.the("Ingreso del Nombre de quien Recibe").located(By.xpath("//input[@name='nombreAgendador']\n"));
    public static Target INPUT_TELEFONORECIBE = Target.the("Ingreso del Telefono de quien Recibe").located(By.xpath("//input[@name='numeroAgendador']\n"));
    public static Target INPUT_DIRECCION = Target.the("Ingreso de la Direccion").located(By.xpath("//input[@name='direccion']\n"));
    public static Target INPUT_BARRIO = Target.the("Ingreso del Barrio").located(By.xpath("//input[@name='barrio']\n"));
    public static Target INPUT_LOCALIDAD = Target.the("Ingreso de la Localidad").located(By.xpath("//input[@name='localidad']\n"));
    public static Target BTN_ENVIARPEDIDO = Target.the("Boton selector de enviar Pedido").located(By.xpath("//button[@type='button' and contains(text(), 'Enviar Pedido')]\n"));
    public static Target BTN_VALIDACION = Target.the("Boton para cerrar el mensaje que revela el exito al crear el pedido").located(By.xpath("/div/div/div[2]"));
    //Validaciones
    public static Target BTN_BUSCAR = Target.the("Barra de busqueda para filtrar los pedidos").located(By.xpath("/html/body/div[1]/div/div/div/div/div[3]/div[1]/div/div/input"));
    public static Target NOMBRE_PEDIDO = Target.the("Nombre de la persona que realizo el pedido").located(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[3]/div[2]/table/tbody/tr[1]/td[1]"));
    public static Target LISTA_ESTADO = Target.the("Estado actual del pedido").located(By.xpath("//span[@class='MuiChip-label MuiChip-labelSmall css-eccknh-MuiChip-label' and text()='En proceso']\n"));
    public static Target ESTADO = Target.the("Estado seleccionado del pedido").located(By.xpath("/html/body/div[3]/div[3]/ul/li[2]"));
    public static Target MENSAJE_ESTADO = Target.the("Mensaje de exito del cambio del estado").located(By.xpath("//div[contains(@class, 'MuiAlert-message') and contains(text(), 'Estado actualizado con éxito')]\n"));
}