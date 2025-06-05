package co.com.AutoTeddyShop.stepsdefinitions;

import co.com.AutoTeddyShop.models.DatosEmpleado;
import co.com.AutoTeddyShop.questions.ValidacionEmpleado;
import co.com.AutoTeddyShop.tasks.Empleado.AbrirPaginaEmpleado;
import co.com.AutoTeddyShop.tasks.Empleado.RegistrarEmpleado;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class EmpleadoStepDefinitions {
    @Dado("^que el usuario se encuentra en la pagina de Empleados en la vista de administrador de TeddyShop$")
    public void queElUsuarioSeEncuentraEnLaPaginaEmpleadosEnLaVistaDeAdministradorDeTeddyShop() {
        theActorInTheSpotlight().wasAbleTo(AbrirPaginaEmpleado.lapagina());
    }

    @Cuando("^el usuario registra un nuevo Empleado con los siguientes datos:$")
    public void elUsuarioRegistraUnNuevoEmpleadoConLosSiguientesDatos(List<DatosEmpleado> datosEmpleado) {
        theActorInTheSpotlight().attemptsTo(RegistrarEmpleado.regis(datosEmpleado));
    }

    @Entonces("^se debe verificar que el Empleado se haya creado correctamente$")
    public void seDebeVerificarQueElEmpleadoSeHayaCreadoCorrectamente(List<DatosEmpleado> datosEmpleado) {
        theActorInTheSpotlight().should(seeThat(ValidacionEmpleado.validacionEmpleado(datosEmpleado)));
    }
}
