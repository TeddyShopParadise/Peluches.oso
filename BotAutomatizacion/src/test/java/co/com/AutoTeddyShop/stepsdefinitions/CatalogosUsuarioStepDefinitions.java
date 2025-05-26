package co.com.AutoTeddyShop.stepsdefinitions;

import co.com.AutoTeddyShop.tasks.CatalogosUsuario.AbrirPaginaCatalogoUsuario;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;
import co.com.AutoTeddyShop.tasks.CatalogosUsuario.*;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class CatalogosUsuarioStepDefinitions {
    @Dado("^que el usuario se encuentra en la pagina principal de TeddyShop$")
    public void queElUsuarioSeEncuentraEnLaPaginaPrincipalDeTeddyShop() {
        theActorInTheSpotlight().wasAbleTo(AbrirPaginaCatalogoUsuario.lapagina());
    }

    @Cuando("^ingrese correctamente a la seccion catalogos usuario desde el menú de productos$")
    public void ingreseCorrectamenteALaPáginaCatalogosUsuarioDesdeElMenuDeProductos() {
        theActorInTheSpotlight().attemptsTo(new NavegacionCatalogos());
    }

    @Entonces("^debería visualizar las categorías disponibles y los productos correspondientes$")
    public void DeberíaVisualizarLasCategoríasDisponiblesYLosProductosCorrespondientes() {
    }

}