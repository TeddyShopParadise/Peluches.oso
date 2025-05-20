package co.com.AutoTeddyShop.stepsdefinitions;

import co.com.AutoTeddyShop.tasks.AbrirPaginaCatalogoUsuario;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;

import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class CatalogosUsuarioStepDefinitions {
    @Dado("^que el usuario se encuentra en la pagina de catalogos en la vista de usuarios de TeddyShop$")
    public void queElUsuarioSeEncuentraEnLaPaginaCatalogosEnLaVistaDeUsuariosDeTeddyShop() {
        theActorInTheSpotlight().wasAbleTo(AbrirPaginaCatalogoUsuario.lapagina());
    }

    @Cuando("^ingrese correctamente a la página catalogos usuario$")
    public void ingreseCorrectamenteALaPáginaCatalogosUsuario() {


    }

    @Entonces("^se debe verificar que el usuario haya visualizado correctamente los catalogos disponibles de TeddyShop$")
    public void seDebeVerificarQueElUsuarioHayaVisualizadoCorrectamenteLosCatalogosDisponiblesDeTeddyShop() {
    }

}