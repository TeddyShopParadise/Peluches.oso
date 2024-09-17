using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShop.Models;

[PrimaryKey("NumDetalle", "Producto_IdProducto")]
[Table("Detalle_Factura")]
public partial class Detalle_Factura
{
    [Key]
    public int NumDetalle { get; set; }

    [StringLength(1)]
    public string PrecioDetalleFactura { get; set; } = null!;

    [StringLength(1)]
    public string CantidadDetalleFactura { get; set; } = null!;

    public int Inventario_IdInventario { get; set; }

    [Key]
    public int Producto_IdProducto { get; set; }

    public int Factura_IdFactura { get; set; }

    [ForeignKey("Factura_IdFactura")]
    [InverseProperty("Detalle_Facturas")]
    public virtual Factura Factura_IdFacturaNavigation { get; set; } = null!;

    [ForeignKey("Inventario_IdInventario")]
    [InverseProperty("Detalle_Facturas")]
    public virtual Inventario Inventario_IdInventarioNavigation { get; set; } = null!;

    [ForeignKey("Producto_IdProducto")]
    [InverseProperty("Detalle_Facturas")]
    public virtual Producto Producto_IdProductoNavigation { get; set; } = null!;
}
