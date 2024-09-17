using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShop.Models;

[Table("Factura")]
public partial class Factura
{
    [Key]
    public int IdFactura { get; set; }

    public DateOnly FechaCreacion_Factura { get; set; }

    public TimeOnly HoraCreacion_Factura { get; set; }

    public int Pedido_NumPedido { get; set; }

    public int Cliente_DniCliente { get; set; }

    [ForeignKey("Cliente_DniCliente")]
    [InverseProperty("Facturas")]
    public virtual Cliente Cliente_DniClienteNavigation { get; set; } = null!;

    [InverseProperty("Factura_IdFacturaNavigation")]
    public virtual ICollection<Detalle_Factura> Detalle_Facturas { get; set; } = new List<Detalle_Factura>();

    [InverseProperty("Factura_IdFacturaNavigation")]
    public virtual ICollection<Metodo_Pago> Metodo_Pagos { get; set; } = new List<Metodo_Pago>();

    [ForeignKey("Pedido_NumPedido")]
    [InverseProperty("Facturas")]
    public virtual Pedido Pedido_NumPedidoNavigation { get; set; } = null!;
}
