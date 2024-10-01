using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TeddyShopWebApplication.Datos;
using TeddyShopWebApplication.Models;

namespace TeddyShopWebApplication.Controllers
{
    public class CatalogosController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CatalogosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Catalogos
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Catalogos.Include(c => c.Compañia_NITNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Catalogos/Details/
        [Authorize(Roles = "Administrador, Vendedor, Empleado")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var catalogo = await _context.Catalogos
                .Include(c => c.Compañia_NITNavigation)
                .FirstOrDefaultAsync(m => m.IdCatalogo == id);
            if (catalogo == null)
            {
                return NotFound();
            }

            return View(catalogo);
        }

        // GET: Catalogos/Create
        [Authorize(Roles = "Administrador, Vendedor, Empleado")]
        public IActionResult Create()
        {
            ViewData["Compañia_NIT"] = new SelectList(_context.Compañia, "NIT", "NIT");
            return View();
        }

        // POST: Catalogos/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Authorize(Roles = "Administrador, Vendedor, Empleado")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("IdCatalogo,DisponibilidadCatalogo,EstiloCatalogo,Compañia_NIT")] Catalogo catalogo)
        {
            //if (ModelState.IsValid)
            {
                _context.Add(catalogo);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["Compañia_NIT"] = new SelectList(_context.Compañia, "NIT", "NIT", catalogo.Compañia_NIT);
            return View(catalogo);
        }

        // GET: Catalogos/Edit/5
        [Authorize(Roles = "Administrador, Vendedor, Empleado")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var catalogo = await _context.Catalogos.FindAsync(id);
            if (catalogo == null)
            {
                return NotFound();
            }
            ViewData["Compañia_NIT"] = new SelectList(_context.Compañia, "NIT", "NIT", catalogo.Compañia_NIT);
            return View(catalogo);
        }

        // POST: Catalogos/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Authorize(Roles = "Administrador, Vendedor, Empleado")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("IdCatalogo,DisponibilidadCatalogo,EstiloCatalogo,Compañia_NIT")] Catalogo catalogo)
        {
            if (id != catalogo.IdCatalogo)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(catalogo);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CatalogoExists(catalogo.IdCatalogo))
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
            ViewData["Compañia_NIT"] = new SelectList(_context.Compañia, "NIT", "NIT", catalogo.Compañia_NIT);
            return View(catalogo);
        }

        // GET: Catalogos/Delete/5
        [Authorize(Roles = "Administrador, Vendedor, Empleado")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var catalogo = await _context.Catalogos
                .Include(c => c.Compañia_NITNavigation)
                .FirstOrDefaultAsync(m => m.IdCatalogo == id);
            if (catalogo == null)
            {
                return NotFound();
            }

            return View(catalogo);
        }

        // POST: Catalogos/Delete/5
        [HttpPost, ActionName("Delete")]
        [Authorize(Roles = "Administrador, Vendedor, Empleado")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var catalogo = await _context.Catalogos.FindAsync(id);
            if (catalogo != null)
            {
                _context.Catalogos.Remove(catalogo);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CatalogoExists(int id)
        {
            return _context.Catalogos.Any(e => e.IdCatalogo == id);
        }
    }
}
