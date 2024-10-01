using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShopWebApplication.Models;

[Table("Movimiento")]
public partial class Movimiento
{
    [Key]
    public int IdMovimiento { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime Fecha { get; set; }

    public int CantidadIngreso { get; set; }

    public int CantidadVendida { get; set; }

    public int Inventario_IdInventario { get; set; }

    [ForeignKey("Inventario_IdInventario")]
    [InverseProperty("Movimientos")]
    public virtual Inventario Inventario_IdInventarioNavigation { get; set; } = null!;
}
