package co.com.AutoTeddyShop.runners.SuiteProductos;

import co.com.AutoTeddyShop.runners.CatalogosAdminRunner;
import co.com.AutoTeddyShop.runners.CategoriasAdminRunner;
import co.com.AutoTeddyShop.runners.HistorialPrecioRunner;
import co.com.AutoTeddyShop.runners.ProductoAdminRunner;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        ProductoAdminRunner.class,
        CatalogosAdminRunner.class,
        CategoriasAdminRunner.class,
        HistorialPrecioRunner.class
})


public class SuiteProductos {
}
