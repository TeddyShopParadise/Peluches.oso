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
    public class Metodo_PagoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public Metodo_PagoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Metodo_Pago
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Metodo_Pagos.Include(m => m.Factura_IdFacturaNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Metodo_Pago/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var metodo_Pago = await _context.Metodo_Pagos
                .Include(m => m.Factura_IdFacturaNavigation)
                .FirstOrDefaultAsync(m => m.IdMetodoPago == id);
            if (metodo_Pago == null)
            {
                return NotFound();
            }

            return View(metodo_Pago);
        }

        // GET: Metodo_Pago/Create
        public IActionResult Create()
        {
            ViewData["Factura_IdFactura"] = new SelectList(_context.Facturas, "IdFactura", "IdFactura");
            return View();
        }

        // POST: Metodo_Pago/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("IdMetodoPago,NumPago,NombreMetodoPago,Factura_IdFactura")] Metodo_Pago metodo_Pago)
        {
            //if (ModelState.IsValid)
            {
                _context.Add(metodo_Pago);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["Factura_IdFactura"] = new SelectList(_context.Facturas, "IdFactura", "IdFactura", metodo_Pago.Factura_IdFactura);
            return View(metodo_Pago);
        }

        // GET: Metodo_Pago/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var metodo_Pago = await _context.Metodo_Pagos.FindAsync(id);
            if (metodo_Pago == null)
            {
                return NotFound();
            }
            ViewData["Factura_IdFactura"] = new SelectList(_context.Facturas, "IdFactura", "IdFactura", metodo_Pago.Factura_IdFactura);
            return View(metodo_Pago);
        }

        // POST: Metodo_Pago/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("IdMetodoPago,NumPago,NombreMetodoPago,Factura_IdFactura")] Metodo_Pago metodo_Pago)
        {
            if (id != metodo_Pago.IdMetodoPago)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(metodo_Pago);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Metodo_PagoExists(metodo_Pago.IdMetodoPago))
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
            ViewData["Factura_IdFactura"] = new SelectList(_context.Facturas, "IdFactura", "IdFactura", metodo_Pago.Factura_IdFactura);
            return View(metodo_Pago);
        }

        // GET: Metodo_Pago/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var metodo_Pago = await _context.Metodo_Pagos
                .Include(m => m.Factura_IdFacturaNavigation)
                .FirstOrDefaultAsync(m => m.IdMetodoPago == id);
            if (metodo_Pago == null)
            {
                return NotFound();
            }

            return View(metodo_Pago);
        }

        // POST: Metodo_Pago/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var metodo_Pago = await _context.Metodo_Pagos.FindAsync(id);
            if (metodo_Pago != null)
            {
                _context.Metodo_Pagos.Remove(metodo_Pago);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Metodo_PagoExists(int id)
        {
            return _context.Metodo_Pagos.Any(e => e.IdMetodoPago == id);
        }
    }
}
