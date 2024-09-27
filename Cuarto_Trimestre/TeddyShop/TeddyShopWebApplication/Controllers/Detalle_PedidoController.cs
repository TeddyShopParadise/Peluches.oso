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
    public class Detalle_PedidoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public Detalle_PedidoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Detalle_Pedido
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Detalle_Pedidos.Include(d => d.Pedido_NumPedidoNavigation).Include(d => d.Producto_IdProductoNavigation);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Detalle_Pedido/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var detalle_Pedido = await _context.Detalle_Pedidos
                .Include(d => d.Pedido_NumPedidoNavigation)
                .Include(d => d.Producto_IdProductoNavigation)
                .FirstOrDefaultAsync(m => m.NumDetalle == id);
            if (detalle_Pedido == null)
            {
                return NotFound();
            }

            return View(detalle_Pedido);
        }

        // GET: Detalle_Pedido/Create
        public IActionResult Create()
        {
            ViewData["Pedido_NumPedido"] = new SelectList(_context.Pedidos, "NumPedido", "NumPedido");
            ViewData["Producto_IdProducto"] = new SelectList(_context.Productos, "IdProducto", "IdProducto");
            return View();
        }

        // POST: Detalle_Pedido/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("NumDetalle,PrecioDetallePedido,CantidadDetallePedido,Pedido_NumPedido,Producto_IdProducto")] Detalle_Pedido detalle_Pedido)
        {
            //if (ModelState.IsValid)
            {
                _context.Add(detalle_Pedido);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["Pedido_NumPedido"] = new SelectList(_context.Pedidos, "NumPedido", "NumPedido", detalle_Pedido.Pedido_NumPedido);
            ViewData["Producto_IdProducto"] = new SelectList(_context.Productos, "IdProducto", "IdProducto", detalle_Pedido.Producto_IdProducto);
            return View(detalle_Pedido);
        }

        // GET: Detalle_Pedido/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var detalle_Pedido = await _context.Detalle_Pedidos.FindAsync(id);
            if (detalle_Pedido == null)
            {
                return NotFound();
            }
            ViewData["Pedido_NumPedido"] = new SelectList(_context.Pedidos, "NumPedido", "NumPedido", detalle_Pedido.Pedido_NumPedido);
            ViewData["Producto_IdProducto"] = new SelectList(_context.Productos, "IdProducto", "IdProducto", detalle_Pedido.Producto_IdProducto);
            return View(detalle_Pedido);
        }

        // POST: Detalle_Pedido/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("NumDetalle,PrecioDetallePedido,CantidadDetallePedido,Pedido_NumPedido,Producto_IdProducto")] Detalle_Pedido detalle_Pedido)
        {
            if (id != detalle_Pedido.NumDetalle)
            {
                return NotFound();
            }

            //if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(detalle_Pedido);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Detalle_PedidoExists(detalle_Pedido.NumDetalle))
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
            ViewData["Pedido_NumPedido"] = new SelectList(_context.Pedidos, "NumPedido", "NumPedido", detalle_Pedido.Pedido_NumPedido);
            ViewData["Producto_IdProducto"] = new SelectList(_context.Productos, "IdProducto", "IdProducto", detalle_Pedido.Producto_IdProducto);
            return View(detalle_Pedido);
        }

        // GET: Detalle_Pedido/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var detalle_Pedido = await _context.Detalle_Pedidos
                .Include(d => d.Pedido_NumPedidoNavigation)
                .Include(d => d.Producto_IdProductoNavigation)
                .FirstOrDefaultAsync(m => m.NumDetalle == id);
            if (detalle_Pedido == null)
            {
                return NotFound();
            }

            return View(detalle_Pedido);
        }

        // POST: Detalle_Pedido/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var detalle_Pedido = await _context.Detalle_Pedidos.FindAsync(id);
            if (detalle_Pedido != null)
            {
                _context.Detalle_Pedidos.Remove(detalle_Pedido);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Detalle_PedidoExists(int id)
        {
            return _context.Detalle_Pedidos.Any(e => e.NumDetalle == id);
        }
    }
}
