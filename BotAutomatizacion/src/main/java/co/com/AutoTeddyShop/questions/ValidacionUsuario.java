package co.com.AutoTeddyShop.questions;

import co.com.AutoTeddyShop.models.DatosUsuario;
import co.com.AutoTeddyShop.models.Utilidades.SessionVariables;
import co.com.AutoTeddyShop.tasks.UsuariosAdmin.FiltrarUsuario;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import java.util.List;

import static co.com.AutoTeddyShop.userinterface.UsuarioAdmin.InteraccionUsuariosAdmin.*;
import static jxl.biff.FormatRecord.logger;

import static net.serenitybdd.screenplay.questions.WebElementQuestion.the;

public class ValidacionUsuario implements Question<Boolean> {

    private List<DatosUsuario> datosUsuarios;

    public ValidacionUsuario(List<DatosUsuario> datosUsuarios) { this.datosUsuarios = datosUsuarios; }

    public static ValidacionUsuario mensajeExitoso(List<DatosUsuario> datosUsuarios) {

        return Instrumented.instanceOf(ValidacionUsuario.class).withProperties(datosUsuarios);
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            String nombre = actor.recall(SessionVariables.NombreUsuario.toString());
            String email = actor.recall(SessionVariables.EmailUsuario.toString());
            String texto = Text.of(MENSAJE_CONFIRMACION).viewedBy(actor).asString();

            actor.attemptsTo(
                    FiltrarUsuario.filtrar(datosUsuarios)
            );

            String nombreUsuario = Text.of(NOMBRE_USUARIO).viewedBy(actor).asString();
            String emailUsuario = Text.of(EMAIL_USUARIO).viewedBy(actor).asString();
            return texto.equals("El usuario se ha registrado correctamente") && nombre.equals(nombreUsuario) && email.equals(emailUsuario);
        } catch (Exception e) {
            logger.info("No se encontró el mensaje de confirmación del usuario", e);
            return false;
        }
    }
}