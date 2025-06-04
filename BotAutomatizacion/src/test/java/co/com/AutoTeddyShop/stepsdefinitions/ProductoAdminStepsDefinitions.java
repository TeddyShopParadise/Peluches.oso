package co.com.AutoTeddyShop.stepsdefinitions;

import co.com.AutoTeddyShop.models.DatosInventario;
import co.com.AutoTeddyShop.models.DatosProducto;
import co.com.AutoTeddyShop.questions.ValidacionInventario;
import co.com.AutoTeddyShop.questions.ValidacionProducto;
import co.com.AutoTeddyShop.tasks.Inventario.RegistrarInventario;
import co.com.AutoTeddyShop.tasks.ProductosAdmin.AbrirPaginaProductoAdmin;
import co.com.AutoTeddyShop.tasks.ProductosAdmin.RegistrarProducto;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class ProductoAdminStepsDefinitions {

    @Dado("^que el usuario se encuentra en la pagina de productos en la vista de administrador de TeddyShop$")
    public void queElUsuarioSeEncuentraEnLaPaginaDeProductosEnLaVistaDeAdministradorDeTeddyShop() {
        theActorInTheSpotlight().wasAbleTo(
                AbrirPaginaProductoAdmin.lapagina()
        );
    }

    @Cuando("^el usuario registra un nuevo producto con los siguientes datos:$")
    public void elUsuarioRegistraUnNuevoProductoConLosSiguientesDatos(List<DatosProducto> datosProductoList) {
        DatosProducto datosProducto = datosProductoList.get(0);
        theActorInTheSpotlight().attemptsTo(
                RegistrarProducto.conLosDatos(datosProducto)
        );
    }

    @Entonces("^se debe verificar que el producto se haya creado correctamente$")
    public void seDebeVerificarQueElProductoSeHayaCreadoCorrectamente() {
        theActorInTheSpotlight().should(seeThat(ValidacionProducto.validacionProducto()));

    }
    @Cuando("^el usuario registra el inventario del producto con los siguientes datos:$")
    public void elUsuarioRegistraElInventarioDelProductoConLosSiguientesDatos(List<DatosInventario> datosInventarioList) {
        DatosInventario datos = datosInventarioList.get(0);
        theActorInTheSpotlight().attemptsTo(
                RegistrarInventario.conLosDatos(datosInventarioList)
        );

    }
    @Entonces("^se debe verificar que el inventario se haya creado correctamente$")
    public void seDebeVerificarQueElInventarioSeHayaCreadoCorrectamente() {
        theActorInTheSpotlight().should(seeThat(ValidacionInventario.validacionInventario()));
    }
}
