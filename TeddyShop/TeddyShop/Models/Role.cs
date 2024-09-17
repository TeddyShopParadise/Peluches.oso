using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShop.Models;

public partial class Role
{
    [Key]
    public int IdRol { get; set; }

    public bool Estado { get; set; }

    [StringLength(256)]
    public string Nombre { get; set; } = null!;

    [ForeignKey("Roles_IdRol")]
    [InverseProperty("Roles_IdRols")]
    public virtual ICollection<Usuario> Usuario_IdUsuarios { get; set; } = new List<Usuario>();
}
