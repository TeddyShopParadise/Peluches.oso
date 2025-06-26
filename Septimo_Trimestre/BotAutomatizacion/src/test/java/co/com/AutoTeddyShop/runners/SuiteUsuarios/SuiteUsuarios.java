package co.com.AutoTeddyShop.runners.SuiteUsuarios;
import co.com.AutoTeddyShop.runners.AutenticacionRunner;
import co.com.AutoTeddyShop.runners.EmpleadoRunner;
import co.com.AutoTeddyShop.runners.UsuariosAdminRunner;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        AutenticacionRunner.class,
        EmpleadoRunner.class,
        UsuariosAdminRunner.class,
})

public class SuiteUsuarios {
}
