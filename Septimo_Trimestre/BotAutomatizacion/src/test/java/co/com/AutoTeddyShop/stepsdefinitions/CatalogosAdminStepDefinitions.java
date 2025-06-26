package co.com.AutoTeddyShop.stepsdefinitions;

import co.com.AutoTeddyShop.models.DatosCatalogos;
import co.com.AutoTeddyShop.questions.ValidacionCatalogosAdmin;
import co.com.AutoTeddyShop.tasks.CatalogosAdmin.AbrirPaginaCatalogoAdmin;
import co.com.AutoTeddyShop.tasks.CatalogosAdmin.NavegacionCatalogosAdmin;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class CatalogosAdminStepDefinitions {
    @Dado("^que el usuario se encuentra en la pagina de Catalogos con el rol de administrador de TeddyShop$")
    public void queElUsuarioSeEncuentraEnLaPaginaDeCatalogosConElRolDeAdministradorDeTeddyShop() {
        theActorInTheSpotlight().wasAbleTo(AbrirPaginaCatalogoAdmin.lapagina());
    }


    @Cuando("^el usuario registra un nuevo Catalogo con los siguientes datos:$")
    public void elUsuarioRegistraUnNuevoCatalogoConLosSiguientesDatos(List<DatosCatalogos> datosCatalogos) {
        theActorInTheSpotlight().attemptsTo(NavegacionCatalogosAdmin.aute(datosCatalogos));
    }

    @Entonces("^se debe verificar que el Catalogo se haya creado correctamente$")
    public void seDebeVerificarQueElCatalogoSeHayaCreadoCorrectamente() {
        theActorInTheSpotlight().should(seeThat(ValidacionCatalogosAdmin.validacionCatalogosAdmin()));
    }
}
