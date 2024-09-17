using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShop.Models;

public partial class Devoluciones
{
    public int IdDevolucion { get; set; }

    [StringLength(256)]
    public string DetalleDevolucion { get; set; } = null!;

    [Key]
    [Column(TypeName = "numeric(28, 0)")]
    public decimal Devoluciones_ID { get; set; }

    [InverseProperty("Devoluciones_Devoluciones")]
    public virtual Inventario? Inventario { get; set; }
}
