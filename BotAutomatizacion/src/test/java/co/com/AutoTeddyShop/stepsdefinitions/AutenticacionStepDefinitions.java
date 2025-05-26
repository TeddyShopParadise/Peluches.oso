package co.com.AutoTeddyShop.stepsdefinitions;

import co.com.AutoTeddyShop.models.DatosLogin;
import co.com.AutoTeddyShop.questions.validacionLogin;
import co.com.AutoTeddyShop.tasks.Login.AbrirPaginaLogin;
import co.com.AutoTeddyShop.tasks.Login.IniciarSesionTeddyShop;
import cucumber.api.DataTable;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;

public class AutenticacionStepDefinitions {
    @Dado("^que el usuario se encuentra en la pagina de inicio de sesion de TeddyShop$")
    public void queElUsuarioSeEncuentraEnLaPaginaDeInicioDeSesionDeTeddyShop() {
        theActorInTheSpotlight().wasAbleTo(AbrirPaginaLogin.lapagina());
    }

    @Cuando("^ingrese las credenciales correctas \\(usuario y contrasena\\)$")
    public void ingreseLasCredencialesCorrectasUsuarioYContrasena(DataTable dataTable) {
        List<DatosLogin> datos = dataTable.asList(DatosLogin.class);
        theActorInTheSpotlight()
                .attemptsTo(IniciarSesionTeddyShop.con(datos));
    }

    @Entonces("^se debe verificar que el usuario haya sido autenticado correctamente y redirigido a su pagina de inicio de TeddyShop$")
    public void seDebeVerificarQueElUsuarioHayaSidoAutenticadoCorrectamenteYRedirigidoASuPaginaDeInicioDeFacebook() {
        theActorInTheSpotlight().should(seeThat(validacionLogin.esExitoso()));
    }
}
