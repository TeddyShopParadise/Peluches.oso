using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using TeddyShopWebApplication.Datos;
using TeddyShopWebApplication.Models;
using Microsoft.AspNetCore.Authorization;

namespace TeddyShopWebApplication.Controllers
{
    [Authorize(Roles = "Administrador")]
    public class EmpleadosController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public EmpleadosController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: Empleadoes
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Empleados.Include(e => e.Compañia_NITNavigation).Include(e => e.User);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Empleadoes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var empleado = await _context.Empleados
                .Include(e => e.Compañia_NITNavigation)
                .Include(e => e.User)
                .FirstOrDefaultAsync(m => m.DniEmpleado == id);
            if (empleado == null)
            {
                return NotFound();
            }

            return View(empleado);
        }

        // GET: Empleadoes/Create
        // GET: Empleadoes/Create
        public IActionResult Create()
        {
            ViewData["Compañia_NIT"] = new SelectList(_context.Compañia, "NIT", "NIT");
            ViewData["UserId"] = new SelectList(_userManager.Users, "Id", "UserName");
            return View();
        }

        // POST: Empleadoes/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("DniEmpleado,TelefonoEmpleado,CodigoEmpleado,FechaNaciminetoEmpleado,NombreEmpleado,Compañia_NIT,UserId")] Empleado empleado)
        {
            //if (ModelState.IsValid)
            {
                var user = await _userManager.FindByIdAsync(empleado.UserId);
                if (user == null)
                {
                    ModelState.AddModelError("UserId", "El usuario especificado no existe.");
                }
                else
                {
                    _context.Add(empleado);
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }
            }

            foreach (var state in ModelState)
            {
                foreach (var error in state.Value.Errors)
                {
                    // Aquí puedes usar Console.WriteLine o tu logger
                    Console.WriteLine($"Error en {state.Key}: {error.ErrorMessage}");
                  
                }
            }

            ViewData["Compañia_NIT"] = new SelectList(_context.Compañia, "NIT", "NIT", empleado.Compañia_NIT);
            ViewData["UserId"] = new SelectList(_userManager.Users, "Id", "UserName", empleado.UserId);
            return View(empleado);
        }




        // GET: Empleadoes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var empleado = await _context.Empleados.FindAsync(id);
            if (empleado == null)
            {
                return NotFound();
            }
            ViewData["Compañia_NIT"] = new SelectList(_context.Compañia, "NIT", "NIT", empleado.Compañia_NIT);
            ViewData["UserId"] = new SelectList(_userManager.Users, "Id", "UserName", empleado.UserId);
            return View(empleado);
        }

        // POST: Empleadoes/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("DniEmpleado,TelefonoEmpleado,CodigoEmpleado,FechaNaciminetoEmpleado,NombreEmpleado,Compañia_NIT,UserId")] Empleado empleado)
        {
            if (id != empleado.DniEmpleado)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(empleado);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EmpleadoExists(empleado.DniEmpleado))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["Compañia_NIT"] = new SelectList(_context.Compañia, "NIT", "NIT", empleado.Compañia_NIT);
            ViewData["UserId"] = new SelectList(_userManager.Users, "Id", "UserName", empleado.UserId);
            return View(empleado);
        }

        // GET: Empleadoes/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var empleado = await _context.Empleados
                .Include(e => e.Compañia_NITNavigation)
                .Include(e => e.User)
                .FirstOrDefaultAsync(m => m.DniEmpleado == id);
            if (empleado == null)
            {
                return NotFound();
            }

            return View(empleado);
        }

        // POST: Empleadoes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var empleado = await _context.Empleados.FindAsync(id);
            if (empleado != null)
            {
                _context.Empleados.Remove(empleado);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool EmpleadoExists(int id)
        {
            return _context.Empleados.Any(e => e.DniEmpleado == id);
        }
    }
}
