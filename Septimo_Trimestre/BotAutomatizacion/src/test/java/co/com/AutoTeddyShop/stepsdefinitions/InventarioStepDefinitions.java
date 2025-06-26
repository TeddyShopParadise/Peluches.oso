package co.com.AutoTeddyShop.stepsdefinitions;

import co.com.AutoTeddyShop.tasks.Inventario.AbrirPaginaInventario;

import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class InventarioStepDefinitions {
    @Dado("^que el usuario se encuentra en la pagina de inventarios en la vista de administrador de TeddyShop$")
    public void queElUsuarioSeEncuentraEnLaPaginaDeInventariosEnLaVistaDeAdministradorDeTeddyShop() {
        theActorInTheSpotlight().wasAbleTo(AbrirPaginaInventario.lapagina());
    }

    @Cuando("^ingrese correctamente a la página de inventario$")
    public void ingreseCorrectamenteALaPáginaDeInventario() {

    }

    @Entonces("^se debe verificar que el usuario haya visualizado correctamente los inventarios disponibles de TeddyShop$")
    public void seDebeVerificarQueElUsuarioHayaVisualizadoCorrectamenteLosInventariosDisponiblesDeTeddyShop() {

    }
}
