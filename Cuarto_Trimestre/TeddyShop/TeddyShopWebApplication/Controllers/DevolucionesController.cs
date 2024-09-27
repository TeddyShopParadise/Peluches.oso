using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TeddyShopWebApplication.Datos;
using TeddyShopWebApplication.Models;

namespace TeddyShopWebApplication.Controllers
{
    public class DevolucionesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DevolucionesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Devoluciones
        public async Task<IActionResult> Index()
        {
            return View(await _context.Devoluciones.ToListAsync());
        }

        // GET: Devoluciones/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var devoluciones = await _context.Devoluciones
                .FirstOrDefaultAsync(m => m.IdDevolucion == id);
            if (devoluciones == null)
            {
                return NotFound();
            }

            return View(devoluciones);
        }

        // GET: Devoluciones/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Devoluciones/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("IdDevolucion,DetalleDevolucion")] Devoluciones devoluciones)
        {
            //if (ModelState.IsValid)
            {
                _context.Add(devoluciones);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(devoluciones);
        }

        // GET: Devoluciones/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var devoluciones = await _context.Devoluciones.FindAsync(id);
            if (devoluciones == null)
            {
                return NotFound();
            }
            return View(devoluciones);
        }

        // POST: Devoluciones/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("IdDevolucion,DetalleDevolucion")] Devoluciones devoluciones)
        {
            if (id != devoluciones.IdDevolucion)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(devoluciones);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DevolucionesExists(devoluciones.IdDevolucion))
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
            return View(devoluciones);
        }

        // GET: Devoluciones/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var devoluciones = await _context.Devoluciones
                .FirstOrDefaultAsync(m => m.IdDevolucion == id);
            if (devoluciones == null)
            {
                return NotFound();
            }

            return View(devoluciones);
        }

        // POST: Devoluciones/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var devoluciones = await _context.Devoluciones.FindAsync(id);
            if (devoluciones != null)
            {
                _context.Devoluciones.Remove(devoluciones);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DevolucionesExists(int id)
        {
            return _context.Devoluciones.Any(e => e.IdDevolucion == id);
        }
    }
}
