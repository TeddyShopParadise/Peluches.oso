using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShop.Models;

[Table("Inventario")]
[Index("Devoluciones_Devoluciones_ID", Name = "Inventario__IDX", IsUnique = true)]
public partial class Inventario
{
    [Key]
    public int IdInventario { get; set; }

    [StringLength(256)]
    public string StockMinimo { get; set; } = null!;

    [StringLength(256)]
    public string PrecioVenta { get; set; } = null!;

    [StringLength(1)]
    public string PrecioCompra { get; set; } = null!;

    [StringLength(256)]
    public string Stock { get; set; } = null!;

    [StringLength(256)]
    public string StockMaximo { get; set; } = null!;

    [Column(TypeName = "numeric(28, 0)")]
    public decimal Devoluciones_Devoluciones_ID { get; set; }

    [InverseProperty("Inventario_IdInventarioNavigation")]
    public virtual ICollection<Detalle_Factura> Detalle_Facturas { get; set; } = new List<Detalle_Factura>();

    [ForeignKey("Devoluciones_Devoluciones_ID")]
    [InverseProperty("Inventario")]
    public virtual Devoluciones Devoluciones_Devoluciones { get; set; } = null!;

    [InverseProperty("Inventario_IdInventarioNavigation")]
    public virtual Movimiento? Movimiento { get; set; }
}
