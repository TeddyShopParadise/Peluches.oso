using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TeddyShop.Datos;
using TeddyShop.Models;

namespace TeddyShop.Controllers
{
    public class CompaniaController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CompaniaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Compañia
        public async Task<IActionResult> Index()
        {
            return View(await _context.Compañia.ToListAsync());
        }

        // GET: Compañia/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var compañia = await _context.Compañia
                .FirstOrDefaultAsync(m => m.NIT == id);
            if (compañia == null)
            {
                return NotFound();
            }

            return View(compañia);
        }

        // GET: Compañia/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Compañia/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("NIT,TelefonoEmpresa,NombreEmpresa,DIreccionEmpresa")] Compania compañia)
        {
            if (ModelState.IsValid)
            {
                _context.Add(compañia);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(compañia);
        }

        // GET: Compañia/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var compañia = await _context.Compañia.FindAsync(id);
            if (compañia == null)
            {
                return NotFound();
            }
            return View(compañia);
        }

        // POST: Compañia/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("NIT,TelefonoEmpresa,NombreEmpresa,DIreccionEmpresa")] Compania compañia)
        {
            if (id != compañia.NIT)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(compañia);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CompañiaExists(compañia.NIT))
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
            return View(compañia);
        }

        // GET: Compañia/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var compañia = await _context.Compañia
                .FirstOrDefaultAsync(m => m.NIT == id);
            if (compañia == null)
            {
                return NotFound();
            }

            return View(compañia);
        }

        // POST: Compañia/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var compañia = await _context.Compañia.FindAsync(id);
            if (compañia != null)
            {
                _context.Compañia.Remove(compañia);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CompañiaExists(int id)
        {
            return _context.Compañia.Any(e => e.NIT == id);
        }
    }
}
