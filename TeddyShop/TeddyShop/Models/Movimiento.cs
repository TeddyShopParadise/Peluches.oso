using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShop.Models;

[Table("Movimiento")]
public partial class Movimiento
{
    public int IdMovimiento { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime Fecha { get; set; }

    public int CantidadIngreso { get; set; }

    public int CantiidadVendida { get; set; }

    [Key]
    public int Inventario_IdInventario { get; set; }

    [ForeignKey("Inventario_IdInventario")]
    [InverseProperty("Movimiento")]
    public virtual Inventario Inventario_IdInventarioNavigation { get; set; } = null!;
}
