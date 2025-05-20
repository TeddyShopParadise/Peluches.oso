package co.com.AutoTeddyShop.stepsdefinitions;

import co.com.AutoTeddyShop.tasks.AbrirPaginaProductosUsuario;
import cucumber.api.DataTable;
import cucumber.api.PendingException;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class ProductosUsuarioStepDefinitions {
    @Dado("^que el usuario se encuentra en la pagina de productos en la vista de usuarios de TeddyShop$")
    public void queElUsuarioSeEncuentraEnLaPaginaProductosEnLaVistaDeUsuariosDeTeddyShop() {
        theActorInTheSpotlight().wasAbleTo(AbrirPaginaProductosUsuario.lapagina());
    }

    @Cuando("^ingrese correctamente a la página productos usuario$")
    public void ingreseCorrectamenteALaPáginaProductosUsuario() {


    }

    @Entonces("^se debe verificar que el usuario haya visualizado correctamente los productos disponibles de TeddyShop$")
    public void seDebeVerificarQueElUsuarioHayaVisualizadoCorrectamenteLosProductosDisponiblesDeTeddyShop() {
    }

}
