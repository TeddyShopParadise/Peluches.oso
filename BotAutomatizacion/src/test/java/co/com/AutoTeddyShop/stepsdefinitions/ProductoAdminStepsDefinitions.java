package co.com.AutoTeddyShop.stepsdefinitions;

import co.com.AutoTeddyShop.tasks.ProductosAdmin.AbrirPaginaProductoAdmin;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class ProductoAdminStepsDefinitions {

    @Dado("^que el usuario se encuentra en la pagina de productos en la vista de administrador de TeddyShop$")
    public void queElUsuarioSeEncuentraEnLaPaginaDeProductosEnLaVistaDeAdministradorDeTeddyShop() {
        theActorInTheSpotlight().wasAbleTo(AbrirPaginaProductoAdmin.lapagina());
    }
    @Cuando("^ingrese correctamente a la página de productos$")
    public void ingreseCorrectamenteALaPáginaDeProductos() {
    }

    @Entonces("^se debe verificar que el usuario haya visualizado correctamente los productos por parte del admin disponibles de TeddyShop$")
    public void seDebeVerificarQueElUsuarioHayaVisualizadoCorrectamenteLosProductosPorParteDelAdminDisponiblesDeTeddyShop() {

    }
}
