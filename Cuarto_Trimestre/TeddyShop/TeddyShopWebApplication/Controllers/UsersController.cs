using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

public class UsuariosController : Controller
{
    private readonly UserManager<IdentityUser> _userManager;

    public UsuariosController(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<IActionResult> Index()
    {
        // Obtener todos los usuarios
        var usuarios = _userManager.Users.ToList();
        return View(usuarios);
    }

    // Método para editar un usuario
    public async Task<IActionResult> Edit(string id)
    {
        var usuario = await _userManager.FindByIdAsync(id);
        if (usuario == null)
        {
            return NotFound();
        }
        return View(usuario);
    }

    // Método para guardar los cambios de un usuario
    [HttpPost]
    public async Task<IActionResult> Edit(IdentityUser usuario)
    {
        if (ModelState.IsValid)
        {
            var existingUser = await _userManager.FindByIdAsync(usuario.Id);
            if (existingUser != null)
            {
                existingUser.Email = usuario.Email;
                existingUser.UserName = usuario.UserName;

                var result = await _userManager.UpdateAsync(existingUser);
                if (result.Succeeded)
                {
                    return RedirectToAction(nameof(Index));
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }
        }
        return View(usuario);
    }

    // Método para confirmar eliminación de un usuario
    public async Task<IActionResult> Delete(string id)
    {
        var usuario = await _userManager.FindByIdAsync(id);
        if (usuario == null)
        {
            return NotFound();
        }
        return View(usuario);
    }

    // Método para eliminar un usuario
    [HttpPost, ActionName("Delete")]
    public async Task<IActionResult> DeleteConfirmed(string id)
    {
        var usuario = await _userManager.FindByIdAsync(id);
        if (usuario != null)
        {
            var result = await _userManager.DeleteAsync(usuario);
            if (result.Succeeded)
            {
                return RedirectToAction(nameof(Index));
            }
        }
        return NotFound();
    }
}
