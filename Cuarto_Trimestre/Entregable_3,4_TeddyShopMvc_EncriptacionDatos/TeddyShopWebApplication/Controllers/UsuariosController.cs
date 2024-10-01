//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Rendering;
//using Microsoft.EntityFrameworkCore;
//using TeddyShopWebApplication.Datos;
//using TeddyShopWebApplication.Models;

//namespace TeddyShopWebApplication.Controllers
//{
//    public class UsuariosController : Controller
//    {
//        private readonly ApplicationDbContext _context;

//        public UsuariosController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        // GET: Usuarios
//        public async Task<IActionResult> Index()
//        {
//            var applicationDbContext = _context.Usuarios.Include(u => u.Empleado_DniEmpleadoNavigation);
//            return View(await applicationDbContext.ToListAsync());
//        }

//        // GET: Usuarios/Details/5
//        public async Task<IActionResult> Details(int? id)
//        {
//            if (id == null)
//            {
//                return NotFound();
//            }

//            var usuario = await _context.Usuarios
//                .Include(u => u.Empleado_DniEmpleadoNavigation)
//                .FirstOrDefaultAsync(m => m.IdUsuario == id);
//            if (usuario == null)
//            {
//                return NotFound();
//            }

//            return View(usuario);
//        }

//        // GET: Usuarios/Create
//        public IActionResult Create()
//        {
//            ViewData["Empleado_DniEmpleado"] = new SelectList(_context.Empleados, "DniEmpleado", "DniEmpleado");
//            return View();
//        }

//        // POST: Usuarios/Create
//        // To protect from overposting attacks, enable the specific properties you want to bind to.
//        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        public async Task<IActionResult> Create([Bind("IdUsuario,Email,Telefono,Contraseña,Username,Empleado_DniEmpleado,Estado")] Usuario usuario)
//        {
//            //if (ModelState.IsValid)
//            {
//                _context.Add(usuario);
//                await _context.SaveChangesAsync();
//                return RedirectToAction(nameof(Index));
//            }
//            ViewData["Empleado_DniEmpleado"] = new SelectList(_context.Empleados, "DniEmpleado", "DniEmpleado", usuario.Empleado_DniEmpleado);
//            return View(usuario);
//        }

//        // GET: Usuarios/Edit/5
//        public async Task<IActionResult> Edit(int? id)
//        {
//            if (id == null)
//            {
//                return NotFound();
//            }

//            var usuario = await _context.Usuarios.FindAsync(id);
//            if (usuario == null)
//            {
//                return NotFound();
//            }
//            ViewData["Empleado_DniEmpleado"] = new SelectList(_context.Empleados, "DniEmpleado", "DniEmpleado", usuario.Empleado_DniEmpleado);
//            return View(usuario);
//        }

//        // POST: Usuarios/Edit/5
//        // To protect from overposting attacks, enable the specific properties you want to bind to.
//        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        public async Task<IActionResult> Edit(int id, [Bind("IdUsuario,Email,Telefono,Contraseña,Username,Empleado_DniEmpleado,Estado")] Usuario usuario)
//        {
//            if (id != usuario.IdUsuario)
//            {
//                return NotFound();
//            }

//            //if (ModelState.IsValid)
//            {
//                try
//                {
//                    _context.Update(usuario);
//                    await _context.SaveChangesAsync();
//                }
//                catch (DbUpdateConcurrencyException)
//                {
//                    if (!UsuarioExists(usuario.IdUsuario))
//                    {
//                        return NotFound();
//                    }
//                    else
//                    {
//                        throw;
//                    }
//                }
//                return RedirectToAction(nameof(Index));
//            }
//            ViewData["Empleado_DniEmpleado"] = new SelectList(_context.Empleados, "DniEmpleado", "DniEmpleado", usuario.Empleado_DniEmpleado);
//            return View(usuario);
//        }

//        // GET: Usuarios/Delete/5
//        public async Task<IActionResult> Delete(int? id)
//        {
//            if (id == null)
//            {
//                return NotFound();
//            }

//            var usuario = await _context.Usuarios
//                .Include(u => u.Empleado_DniEmpleadoNavigation)
//                .FirstOrDefaultAsync(m => m.IdUsuario == id);
//            if (usuario == null)
//            {
//                return NotFound();
//            }

//            return View(usuario);
//        }

//        // POST: Usuarios/Delete/5
//        [HttpPost, ActionName("Delete")]
//        [ValidateAntiForgeryToken]
//        public async Task<IActionResult> DeleteConfirmed(int id)
//        {
//            var usuario = await _context.Usuarios.FindAsync(id);
//            if (usuario != null)
//            {
//                _context.Usuarios.Remove(usuario);
//            }

//            await _context.SaveChangesAsync();
//            return RedirectToAction(nameof(Index));
//        }

//        private bool UsuarioExists(int id)
//        {
//            return _context.Usuarios.Any(e => e.IdUsuario == id);
//        }
//    }
//}
