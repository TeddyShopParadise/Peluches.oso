package co.com.AutoTeddyShop.stepsdefinitions;

import co.com.AutoTeddyShop.models.DatosUsuario;
import co.com.AutoTeddyShop.questions.ValidacionUsuario;
import co.com.AutoTeddyShop.tasks.UsuariosAdmin.AbrirPaginaUsuarioAdmin;
import co.com.AutoTeddyShop.tasks.UsuariosAdmin.RegistrarUsuarioAdmin;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;
import java.util.List;
import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class UsuariosStepDefinitions {

    @Dado("^que el administrador está en la página de gestión de usuarios$")
    public void irAPaginaUsuarios() {
        theActorInTheSpotlight().wasAbleTo(AbrirPaginaUsuarioAdmin.lapagina());
    }

    @Cuando("^registra un nuevo usuario con los datos:$")
    public void registrarUsuario(List<DatosUsuario> datosUsuario) {
        theActorInTheSpotlight().attemptsTo(RegistrarUsuarioAdmin.con(datosUsuario));
    }

    @Entonces("^verifica que el usuario se creó correctamente$")
    public void verificarCreacion(List<DatosUsuario> datosUsuarios) {
        theActorInTheSpotlight().should(seeThat(ValidacionUsuario.mensajeExitoso(datosUsuarios)));
    }
}