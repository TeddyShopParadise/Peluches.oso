using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShop.Models;

public partial class Categoria
{
    [Key]
    public int IdCategoria { get; set; }

    [StringLength(256)]
    public string DescripcionCategoria { get; set; } = null!;

    [StringLength(256)]
    public string NombreCategoria { get; set; } = null!;

    [ForeignKey("Categoria_IdCategoria")]
    [InverseProperty("Categoria_IdCategoria")]
    public virtual ICollection<Producto> Producto_IdProductos { get; set; } = new List<Producto>();
}
