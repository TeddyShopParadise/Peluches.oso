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
    public class Detalle_FacturaController : Controller
    {
        private readonly ApplicationDbContext _context;

        public Detalle_FacturaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Detalle_Factura
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Detalle_Facturas.Include(d => d.Factura_IdFacturaNavigation).Include(d => d.Inventario_IdInventarioNavigation).Include(d => d.Producto_IdProductoNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Detalle_Factura/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var detalle_Factura = await _context.Detalle_Facturas
                .Include(d => d.Factura_IdFacturaNavigation)
                .Include(d => d.Inventario_IdInventarioNavigation)
                .Include(d => d.Producto_IdProductoNavigation)
                .FirstOrDefaultAsync(m => m.NumDetalle == id);
            if (detalle_Factura == null)
            {
                return NotFound();
            }

            return View(detalle_Factura);
        }

        // GET: Detalle_Factura/Create
        public IActionResult Create()
        {
            ViewData["Factura_IdFactura"] = new SelectList(_context.Facturas, "IdFactura", "IdFactura");
            ViewData["Inventario_IdInventario"] = new SelectList(_context.Inventarios, "IdInventario", "IdInventario");
            ViewData["Producto_IdProducto"] = new SelectList(_context.Productos, "IdProducto", "IdProducto");
            return View();
        }

        // POST: Detalle_Factura/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("NumDetalle,PrecioDetalleFactura,CantidadDetalleFactura,Inventario_IdInventario,Producto_IdProducto,Factura_IdFactura")] Detalle_Factura detalle_Factura)
        {
            //if (ModelState.IsValid)
            {
                _context.Add(detalle_Factura);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["Factura_IdFactura"] = new SelectList(_context.Facturas, "IdFactura", "IdFactura", detalle_Factura.Factura_IdFactura);
            ViewData["Inventario_IdInventario"] = new SelectList(_context.Inventarios, "IdInventario", "IdInventario", detalle_Factura.Inventario_IdInventario);
            ViewData["Producto_IdProducto"] = new SelectList(_context.Productos, "IdProducto", "IdProducto", detalle_Factura.Producto_IdProducto);
            return View(detalle_Factura);
        }

        // GET: Detalle_Factura/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var detalle_Factura = await _context.Detalle_Facturas.FindAsync(id);
            if (detalle_Factura == null)
            {
                return NotFound();
            }
            ViewData["Factura_IdFactura"] = new SelectList(_context.Facturas, "IdFactura", "IdFactura", detalle_Factura.Factura_IdFactura);
            ViewData["Inventario_IdInventario"] = new SelectList(_context.Inventarios, "IdInventario", "IdInventario", detalle_Factura.Inventario_IdInventario);
            ViewData["Producto_IdProducto"] = new SelectList(_context.Productos, "IdProducto", "IdProducto", detalle_Factura.Producto_IdProducto);
            return View(detalle_Factura);
        }

        // POST: Detalle_Factura/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("NumDetalle,PrecioDetalleFactura,CantidadDetalleFactura,Inventario_IdInventario,Producto_IdProducto,Factura_IdFactura")] Detalle_Factura detalle_Factura)
        {
            if (id != detalle_Factura.NumDetalle)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(detalle_Factura);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Detalle_FacturaExists(detalle_Factura.NumDetalle))
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
            ViewData["Factura_IdFactura"] = new SelectList(_context.Facturas, "IdFactura", "IdFactura", detalle_Factura.Factura_IdFactura);
            ViewData["Inventario_IdInventario"] = new SelectList(_context.Inventarios, "IdInventario", "IdInventario", detalle_Factura.Inventario_IdInventario);
            ViewData["Producto_IdProducto"] = new SelectList(_context.Productos, "IdProducto", "IdProducto", detalle_Factura.Producto_IdProducto);
            return View(detalle_Factura);
        }

        // GET: Detalle_Factura/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var detalle_Factura = await _context.Detalle_Facturas
                .Include(d => d.Factura_IdFacturaNavigation)
                .Include(d => d.Inventario_IdInventarioNavigation)
                .Include(d => d.Producto_IdProductoNavigation)
                .FirstOrDefaultAsync(m => m.NumDetalle == id);
            if (detalle_Factura == null)
            {
                return NotFound();
            }

            return View(detalle_Factura);
        }

        // POST: Detalle_Factura/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var detalle_Factura = await _context.Detalle_Facturas.FindAsync(id);
            if (detalle_Factura != null)
            {
                _context.Detalle_Facturas.Remove(detalle_Factura);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Detalle_FacturaExists(int id)
        {
            return _context.Detalle_Facturas.Any(e => e.NumDetalle == id);
        }
    }
}
