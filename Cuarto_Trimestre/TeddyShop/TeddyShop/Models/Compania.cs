using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShop.Models;

public partial class Compania
{
    [Key]
    public int NIT { get; set; }

    [StringLength(256)]
    public string TelefonoEmpresa { get; set; } = null!;

    [StringLength(256)]
    public string NombreEmpresa { get; set; } = null!;

    [StringLength(256)]
    public string DIreccionEmpresa { get; set; } = null!;

    [InverseProperty("Compañia_NITNavigation")]
    public virtual ICollection<Catalogo> Catalogos { get; set; } = new List<Catalogo>();

    [InverseProperty("Compañia_NITNavigation")]
    public virtual ICollection<Empleado> Empleados { get; set; } = new List<Empleado>();
}
