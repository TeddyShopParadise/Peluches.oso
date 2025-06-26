package co.com.AutoTeddyShop.stepsdefinitions;

import co.com.AutoTeddyShop.models.DatosCategoria;
import co.com.AutoTeddyShop.models.Utilidades.ValidacionesCategoria;
import co.com.AutoTeddyShop.questions.ValidacionDetalleCategoria;
import co.com.AutoTeddyShop.tasks.CategoriasAdmin.AbrirPaginaCategoriaAdmin;
import co.com.AutoTeddyShop.tasks.CategoriasAdmin.NavegacionCategorias;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class CategoriasStepDefinitions {
    @Dado("^que el usuario se encuentra en la pagina de Categorias en la vista de administrador de TeddyShop$")
    public void queElUsuarioSeEncuentraEnLaPaginaCategoriasEnLaVistaDeAdministradorDeTeddyShop() {
        theActorInTheSpotlight().wasAbleTo(AbrirPaginaCategoriaAdmin.lapagina());
    }

    @Cuando("^el usuario registra una nueva Categoria con los siguientes datos:$")
    public void elUsuarioRegistraUnaNuevaCategoriaConLosSiguientesDatos(List<DatosCategoria> datosCategoria) {
        theActorInTheSpotlight().attemptsTo(NavegacionCategorias.conLosDatos(datosCategoria));
    }

    @Entonces("^se debe verificar que la Categoria se haya creado correctamente$")
    public void seDebeVerificarQueLaCategoriaSeHayaCreadoCorrectamente() {
        theActorInTheSpotlight().should(seeThat(ValidacionDetalleCategoria.validacionDetalleCategoria()));
    }
}
