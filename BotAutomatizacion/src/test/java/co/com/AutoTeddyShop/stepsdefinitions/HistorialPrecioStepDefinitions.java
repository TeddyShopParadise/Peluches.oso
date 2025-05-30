package co.com.AutoTeddyShop.stepsdefinitions;
import co.com.AutoTeddyShop.models.DatosHistorialPrecio;
import co.com.AutoTeddyShop.questions.ValidacionHistorialPrecio;
import co.com.AutoTeddyShop.tasks.HistorialPrecio.AbrirPaginaHistorialPrecio;
import co.com.AutoTeddyShop.tasks.HistorialPrecio.NavegacionHistorialPrecio;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class HistorialPrecioStepDefinitions {

    @Dado("^que el usuario se encuentra en la página de Historial de Precios en la vista de administrador de TeddyShop$")
    public void queElUsuarioSeEncuentraEnLaPaginaHistorialPreciosAdministrador() {
        theActorInTheSpotlight().wasAbleTo(AbrirPaginaHistorialPrecio.lapagina());
    }

    @Cuando("^el usuario registra un nuevo Historial de Precio con los siguientes datos:$")
    public void elUsuarioRegistraUnNuevoHistorialPrecio(List<DatosHistorialPrecio> datosHistorialPrecio) {
        theActorInTheSpotlight().attemptsTo(NavegacionHistorialPrecio.conLosDatos(datosHistorialPrecio));
    }

    @Entonces("^se debe verificar que el Historial de Precio se haya creado correctamente$")
    public void seDebeVerificarQueElHistorialPrecioSeHayaCreadoCorrectamente() {
        theActorInTheSpotlight().should(seeThat(ValidacionHistorialPrecio.validacionHistorialPrecio()));
    }
}