using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShopWebApplication.Models;

[Table("Vendedor")]
[Index("CodigoVendedor", Name = "Vendedor_PKv1", IsUnique = true)]
public partial class Vendedor
{
    [Key]
    public int DniEmpleado { get; set; }

    [StringLength(100)]
    public string CodigoVendedor { get; set; } = null!;

    [ForeignKey("DniEmpleado")]
    [InverseProperty("Vendedor")]
    public virtual Empleado DniEmpleadoNavigation { get; set; } = null!;
}
