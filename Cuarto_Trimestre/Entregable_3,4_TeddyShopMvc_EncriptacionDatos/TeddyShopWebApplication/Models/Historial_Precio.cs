using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShopWebApplication.Models;

[PrimaryKey("HistorialPrecioId", "Producto_IdProducto")]
[Table("Historial_Precio")]
public partial class Historial_Precio
{
    [Key]
    public int HistorialPrecioId { get; set; }

    [Column(TypeName = "decimal(10, 3)")]
    public decimal? Precio { get; set; }

    public DateOnly FechaInicio { get; set; }

    public DateOnly FechaFin { get; set; }

    public bool EstadoPrecio { get; set; }

    [Key]
    public int Producto_IdProducto { get; set; }

    [ForeignKey("Producto_IdProducto")]
    [InverseProperty("Historial_Precios")]
    public virtual Producto Producto_IdProductoNavigation { get; set; } = null!;
}
