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
    [Authorize(Roles = "Administrador, Vendedor, Empleado")]
    public class Historial_PrecioController : Controller
    {
        private readonly ApplicationDbContext _context;

        public Historial_PrecioController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Historial_Precio
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Historial_Precios.Include(h => h.Producto_IdProductoNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Historial_Precio/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var historial_Precio = await _context.Historial_Precios
                .Include(h => h.Producto_IdProductoNavigation)
                .FirstOrDefaultAsync(m => m.HistorialPrecioId == id);
            if (historial_Precio == null)
            {
                return NotFound();
            }

            return View(historial_Precio);
        }

        // GET: Historial_Precio/Create
        public IActionResult Create()
        {
            ViewData["Producto_IdProducto"] = new SelectList(_context.Productos, "IdProducto", "IdProducto");
            return View();
        }

        // POST: Historial_Precio/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("HistorialPrecioId,Precio,FechaInicio,FechaFin,EstadoPrecio,Producto_IdProducto")] Historial_Precio historial_Precio)
        {
            //if (ModelState.IsValid)
            {
                _context.Add(historial_Precio);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["Producto_IdProducto"] = new SelectList(_context.Productos, "IdProducto", "IdProducto", historial_Precio.Producto_IdProducto);
            return View(historial_Precio);
        }

        // GET: Historial_Precio/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var historial_Precio = await _context.Historial_Precios.FindAsync(id);
            if (historial_Precio == null)
            {
                return NotFound();
            }
            ViewData["Producto_IdProducto"] = new SelectList(_context.Productos, "IdProducto", "IdProducto", historial_Precio.Producto_IdProducto);
            return View(historial_Precio);
        }

        // POST: Historial_Precio/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("HistorialPrecioId,Precio,FechaInicio,FechaFin,EstadoPrecio,Producto_IdProducto")] Historial_Precio historial_Precio)
        {
            if (id != historial_Precio.HistorialPrecioId)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(historial_Precio);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Historial_PrecioExists(historial_Precio.HistorialPrecioId))
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
            ViewData["Producto_IdProducto"] = new SelectList(_context.Productos, "IdProducto", "IdProducto", historial_Precio.Producto_IdProducto);
            return View(historial_Precio);
        }

        // GET: Historial_Precio/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var historial_Precio = await _context.Historial_Precios
                .Include(h => h.Producto_IdProductoNavigation)
                .FirstOrDefaultAsync(m => m.HistorialPrecioId == id);
            if (historial_Precio == null)
            {
                return NotFound();
            }

            return View(historial_Precio);
        }

        // POST: Historial_Precio/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var historial_Precio = await _context.Historial_Precios.FindAsync(id);
            if (historial_Precio != null)
            {
                _context.Historial_Precios.Remove(historial_Precio);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Historial_PrecioExists(int id)
        {
            return _context.Historial_Precios.Any(e => e.HistorialPrecioId == id);
        }
    }
}
