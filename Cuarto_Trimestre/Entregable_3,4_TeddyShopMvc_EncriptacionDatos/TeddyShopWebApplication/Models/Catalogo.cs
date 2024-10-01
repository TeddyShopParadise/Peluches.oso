using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShopWebApplication.Models;

[Table("Catalogo")]
public partial class Catalogo
{
    [Key]
    public int IdCatalogo { get; set; }

    [StringLength(256)]
    public string DisponibilidadCatalogo { get; set; } = null!;

    [StringLength(256)]
    public string EstiloCatalogo { get; set; } = null!;

    public int Compañia_NIT { get; set; }

    [ForeignKey("Compañia_NIT")]
    [InverseProperty("Catalogos")]
    public virtual Compañia Compañia_NITNavigation { get; set; } = null!;

    [ForeignKey("Catalogo_IdCatalogo")]
    [InverseProperty("Catalogo_IdCatalogos")]
    public virtual ICollection<Empleado> Empleado_DniEmpleados { get; set; } = new List<Empleado>();

    [ForeignKey("Catalogo_IdCatalogo")]
    [InverseProperty("Catalogo_IdCatalogos")]
    public virtual ICollection<Producto> Producto_IdProductos { get; set; } = new List<Producto>();
}
