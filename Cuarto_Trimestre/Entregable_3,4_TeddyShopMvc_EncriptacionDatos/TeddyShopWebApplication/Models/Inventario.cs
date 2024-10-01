using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShopWebApplication.Models;

[Table("Inventario")]
public partial class Inventario
{
    [Key]
    public int IdInventario { get; set; }

    [StringLength(256)]
    public string StockMinimo { get; set; } = null!;

    [Column(TypeName = "decimal(10, 3)")]
    public decimal? PrecioVenta { get; set; }

    [Column(TypeName = "decimal(10, 3)")]
    public decimal? PrecioCompra { get; set; }

    [StringLength(256)]
    public string Stock { get; set; } = null!;

    [StringLength(256)]
    public string StockMaximo { get; set; } = null!;

    public int IdDevolucion { get; set; }

    public int Producto_IdProducto { get; set; }

    [InverseProperty("Inventario_IdInventarioNavigation")]
    public virtual ICollection<Detalle_Factura> Detalle_Facturas { get; set; } = new List<Detalle_Factura>();

    [ForeignKey("IdDevolucion")]
    [InverseProperty("Inventarios")]
    public virtual Devoluciones IdDevolucionNavigation { get; set; } = null!;

    [InverseProperty("Inventario_IdInventarioNavigation")]
    public virtual ICollection<Movimiento> Movimientos { get; set; } = new List<Movimiento>();
}
