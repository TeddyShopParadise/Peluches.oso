using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShopWebApplication.Models;

[Table("Detalle_Pedido")]
public partial class Detalle_Pedido
{
    [Key]
    public int NumDetalle { get; set; }

    [Column(TypeName = "decimal(10, 3)")]
    public decimal? PrecioDetallePedido { get; set; }

    [StringLength(256)]
    public string CantidadDetallePedido { get; set; } = null!;

    public int Pedido_NumPedido { get; set; }

    public int Producto_IdProducto { get; set; }

    [ForeignKey("Pedido_NumPedido")]
    [InverseProperty("Detalle_Pedidos")]
    public virtual Pedido Pedido_NumPedidoNavigation { get; set; } = null!;

    [ForeignKey("Producto_IdProducto")]
    [InverseProperty("Detalle_Pedidos")]
    public virtual Producto Producto_IdProductoNavigation { get; set; } = null!;
}
