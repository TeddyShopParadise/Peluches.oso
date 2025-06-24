package co.com.AutoTeddyShop.runners.SuiteProductoUsuario;

import co.com.AutoTeddyShop.runners.CatalogosUsuarioRunner;
import co.com.AutoTeddyShop.runners.ProductosUsuarioRunner;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        CatalogosUsuarioRunner.class,
        ProductosUsuarioRunner.class,
})

public class SuiteProductoUsuario {
}
