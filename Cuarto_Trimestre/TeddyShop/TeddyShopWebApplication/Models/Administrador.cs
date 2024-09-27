using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShopWebApplication.Models;

[Table("Administrador")]
public partial class Administrador
{
    [Key]
    public int DniEmpleado { get; set; }

    [ForeignKey("DniEmpleado")]
    [InverseProperty("Administrador")]
    public virtual Empleado DniEmpleadoNavigation { get; set; } = null!;
}
