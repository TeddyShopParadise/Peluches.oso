package co.com.AutoTeddyShop.userinterface.Empleado;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.screenplay.targets.Target;

public class RegistrarEmpleadoTeddyShop {
    public static Target INPUT_DNI = Target.the("Ingresar el Dni del Empleado").located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[1]/div/input"));
    public static Target INPUT_NOMBREEMPLEADO = Target.the("Ingresar el Nombre del Empleado").located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[2]/div/input"));
    public static Target INPUT_TELEFONOEMPLEADO = Target.the("Ingresar el Telefono del Empleado").located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[3]/div/input"));
    public static Target BTN_COMPANIA = Target.the("Desplegar la lista de Compañias disponibles").located(By.xpath("//*[@id=\"mui-component-select-compania\"]"));
    public static Target BTN_PELUCHESOSO = Target.the("Elegir la compañia 'Peluches.Oso'").located(By.xpath("//*[@id=\":r7:\"]/li[2]"));
    public static Target BTN_CREAREMPLEADO = Target.the("Boton para crear el Empleado en la pagina").located(By.xpath("/html/body/div[1]/div/div/div/div/div[2]/form/div[5]/button[1]"));
    public static Target BTN_CONFIRMACION = Target.the("Boton para confirmar el registro del Empleado").located(By.xpath("/html/body/div[3]/div/div[6]/button[3]"));
    public static Target NOMBRE_EMPLEADO = Target.the("Nombre especifico del empleado recien creado usado para la validacion").located(By.xpath("/html/body/div[1]/div/div/div/div/div[4]/table/tbody/tr[4]/td[2]"));
}
