using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShopWebApplication.Models;

public partial class Devoluciones
{
    [Key]
    public int IdDevolucion { get; set; }

    [StringLength(256)]
    public string DetalleDevolucion { get; set; } = null!;

    [InverseProperty("IdDevolucionNavigation")]
    public virtual ICollection<Inventario> Inventarios { get; set; } = new List<Inventario>();
}
