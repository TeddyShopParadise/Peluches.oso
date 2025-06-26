package co.com.AutoTeddyShop.runners;


import cucumber.api.CucumberOptions;
import cucumber.api.SnippetType;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/historialPrecio_TeddyShop.feature",
        glue = {"co.com.AutoTeddyShop.stepsdefinitions", "co.com.AutoTeddyShop.utils.hooks"},
        tags = "@historialPrecio"
)

public class HistorialPrecioRunner {

}
