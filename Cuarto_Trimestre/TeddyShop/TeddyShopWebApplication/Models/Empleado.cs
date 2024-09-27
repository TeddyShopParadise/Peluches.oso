using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShopWebApplication.Models;

[Table("Empleado")]
public partial class Empleado
{
    [Key]
    public int DniEmpleado { get; set; }

    [StringLength(256)]
    public string TelefonoEmpleado { get; set; } = null!;

    [StringLength(256)]
    public string CodigoEmpleado { get; set; } = null!;

    public DateOnly FechaNaciminetoEmpleado { get; set; }

    [StringLength(256)]
    public string NombreEmpleado { get; set; } = null!;

    public int Compañia_NIT { get; set; }

    [InverseProperty("DniEmpleadoNavigation")]
    public virtual Administrador? Administrador { get; set; }

    [ForeignKey("Compañia_NIT")]
    [InverseProperty("Empleados")]
    public virtual Compañia Compañia_NITNavigation { get; set; } = null!;

    [InverseProperty("Empleado_DniEmpleadoNavigation")]
    public virtual Usuario? Usuario { get; set; }

    [InverseProperty("DniEmpleadoNavigation")]
    public virtual Vendedor? Vendedor { get; set; }

    [ForeignKey("Empleado_DniEmpleado")]
    [InverseProperty("Empleado_DniEmpleados")]
    public virtual ICollection<Catalogo> Catalogo_IdCatalogos { get; set; } = new List<Catalogo>();

    [ForeignKey("Empleado_DniEmpleado")]
    [InverseProperty("Empleado_DniEmpleados")]
    public virtual ICollection<Pedido> Pedido_NumPedidos { get; set; } = new List<Pedido>();
}
