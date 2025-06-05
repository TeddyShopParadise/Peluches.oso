package co.com.AutoTeddyShop.stepsdefinitions;

import co.com.AutoTeddyShop.models.DatosCompraProducto;
import co.com.AutoTeddyShop.questions.ValidacionProductosUsuario;
import co.com.AutoTeddyShop.tasks.ProductosUsuario.AbrirPaginaProductosUsuario;
import co.com.AutoTeddyShop.tasks.ProductosUsuario.NavegacionProductosUsuario;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class ProductosUsuarioStepDefinitions {
    @Dado("^que el usuario se encuentra en la pagina de productos en la vista de usuarios de TeddyShop$")
    public void queElUsuarioSeEncuentraEnLaPaginaProductosEnLaVistaDeUsuariosDeTeddyShop() {
        theActorInTheSpotlight().wasAbleTo(AbrirPaginaProductosUsuario.lapagina());
    }

    @Cuando("^ingrese correctamente a la página productos usuario$")
    public void ingreseCorrectamenteALaPáginaProductosUsuario(List<DatosCompraProducto> datosCompra) {
        theActorInTheSpotlight().attemptsTo(NavegacionProductosUsuario.aute(datosCompra));
    }

    @Entonces("^se debe verificar que el usuario haya visualizado correctamente los productos disponibles de TeddyShop$")
    public void seDebeVerificarQueElUsuarioHayaVisualizadoCorrectamenteLosProductosDisponiblesDeTeddyShop(List<DatosCompraProducto> datosCompra) {
        theActorInTheSpotlight().should(seeThat(ValidacionProductosUsuario.esExitoso(datosCompra)));
    }

}
