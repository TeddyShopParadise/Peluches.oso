using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShopWebApplication.Models;

[Table("Cliente")]
public partial class Cliente
{
    [Key]
    public int DniCliente { get; set; }

    [StringLength(256)]
    public string NombreCliente { get; set; } = null!;

    [StringLength(256)]
    public string TelefonoCliente { get; set; } = null!;

    public DateOnly FechaNaciminetoCliente { get; set; }

    [StringLength(256)]
    public string? ApellidoCliente { get; set; }

    [InverseProperty("Cliente_DniClienteNavigation")]
    public virtual ICollection<Factura> Facturas { get; set; } = new List<Factura>();

    [InverseProperty("Cliente_DniClienteNavigation")]
    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
