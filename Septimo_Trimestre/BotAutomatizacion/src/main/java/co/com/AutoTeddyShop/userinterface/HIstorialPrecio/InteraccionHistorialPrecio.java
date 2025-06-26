package co.com.AutoTeddyShop.userinterface.HIstorialPrecio;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.screenplay.targets.Target;

public class InteraccionHistorialPrecio {

    public static final Target INPUT_PRECIO = Target.the("Campo para ingresar el precio")
            .located(By.name("precio"));

    public static final Target INPUT_FECHA_INICIO = Target.the("Campo para seleccionar la fecha de inicio")
            .located(By.name("fechaInicio"));

    public static final Target INPUT_FECHA_FINAL = Target.the("Campo para seleccionar la fecha final")
            .located(By.xpath("(//input[@type='date'])[2]"));

    public static final Target CHECKBOX_ESTADO_PRECIO = Target.the("Checkbox para establecer si el precio está activo o inactivo")
            .located(By.name("estadoPrecio"));

    public static final Target BOTON_CONFIRMAR_CREACION = Target.the("Botón de confirmación 'Sí, crear'")
            .located(By.xpath("//button[normalize-space()='Sí, crear']"));

    public static final Target BOTON_CREAR = Target.the("Botón para crear el precio")
            .located(By.cssSelector("button[type='submit']"));

    public static final Target TEXTO_HISTORIAL_CREADO = Target.the("Título del modal con el mensaje '¡Historial creado!'")
            .located(By.xpath("//h2[@id='swal2-title' and text()='¡Historial creado!']"));

    public static final Target TABLA_HISTORIAL = Target.the("Tabla de historial de precios")
            .located(By.cssSelector("div.MuiTableContainer-root"));

    public static final Target FILAS_TABLA = Target.the("Filas de la tabla")
            .locatedBy("//div[contains(@class, 'MuiTableContainer-root')]//tbody/tr");

    public static final Target BOTON_SIGUIENTE = Target.the("Botón siguiente página")
            .located(By.xpath("//button[@aria-label='Go to next page']"));


}
