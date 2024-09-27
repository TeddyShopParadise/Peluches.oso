using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShopWebApplication.Models;

[Table("Usuario")]
[Index("Empleado_DniEmpleado", Name = "Usuario__IDX", IsUnique = true)]
public partial class Usuario
{
    [Key]
    public int IdUsuario { get; set; }

    [StringLength(256)]
    public string Email { get; set; } = null!;

    [StringLength(256)]
    public string Telefono { get; set; } = null!;

    [StringLength(256)]
    public string Contraseña { get; set; } = null!;

    [StringLength(256)]
    public string Username { get; set; } = null!;

    public int Empleado_DniEmpleado { get; set; }

    public bool Estado { get; set; }

    [ForeignKey("Empleado_DniEmpleado")]
    [InverseProperty("Usuario")]
    public virtual Empleado Empleado_DniEmpleadoNavigation { get; set; } = null!;

    [ForeignKey("Usuario_IdUsuario")]
    [InverseProperty("Usuario_IdUsuarios")]
    public virtual ICollection<Roles> Roles_IdRols { get; set; } = new List<Roles>();
}
