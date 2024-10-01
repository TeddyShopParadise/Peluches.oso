using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShopWebApplication.Models;

[Table("Pedido")]
public partial class Pedido
{
    [Key]
    public int NumPedido { get; set; }

    [StringLength(256)]
    public string TamañoOso { get; set; } = null!;

    [StringLength(256)]
    public string NombreComprador { get; set; } = null!;

    [StringLength(256)]
    public string NumeroComprador { get; set; } = null!;

    [StringLength(256)]
    public string NombreAgendador { get; set; } = null!;

    [StringLength(256)]
    public string NumeroAgendador { get; set; } = null!;

    [StringLength(256)]
    public string Localidad { get; set; } = null!;

    [StringLength(256)]
    public string Direccion { get; set; } = null!;

    [StringLength(256)]
    public string Barrio { get; set; } = null!;

    public int Cliente_DniCliente { get; set; }

    [StringLength(256)]
    public string? ApellidoAgendador { get; set; }

    [StringLength(256)]
    public string? ApellidoComprador { get; set; }

    [ForeignKey("Cliente_DniCliente")]
    [InverseProperty("Pedidos")]
    public virtual Cliente Cliente_DniClienteNavigation { get; set; } = null!;

    [InverseProperty("Pedido_NumPedidoNavigation")]
    public virtual ICollection<Detalle_Pedido> Detalle_Pedidos { get; set; } = new List<Detalle_Pedido>();

    [InverseProperty("Pedido_NumPedidoNavigation")]
    public virtual ICollection<Factura> Facturas { get; set; } = new List<Factura>();

    [ForeignKey("Pedido_NumPedido")]
    [InverseProperty("Pedido_NumPedidos")]
    public virtual ICollection<Empleado> Empleado_DniEmpleados { get; set; } = new List<Empleado>();
}
