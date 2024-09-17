using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShop.Models;

[Table("Producto")]
public partial class Producto
{
    [Key]
    public int IdProducto { get; set; }

    [StringLength(256)]
    public string EstiloProducto { get; set; } = null!;

    [StringLength(256)]
    public string CmCabezaColaProducto { get; set; } = null!;

    [StringLength(256)]
    public string MaterialProducto { get; set; } = null!;

    [StringLength(256)]
    public string DisponibilidadProducto { get; set; } = null!;

    [StringLength(256)]
    public string CmColaPataProducto { get; set; } = null!;

    [StringLength(256)]
    public string TamañoProducto { get; set; } = null!;

    [InverseProperty("Producto_IdProductoNavigation")]
    public virtual ICollection<Detalle_Factura> Detalle_Facturas { get; set; } = new List<Detalle_Factura>();

    [InverseProperty("Producto_IdProductoNavigation")]
    public virtual ICollection<Detalle_Pedido> Detalle_Pedidos { get; set; } = new List<Detalle_Pedido>();

    [InverseProperty("Producto_IdProductoNavigation")]
    public virtual ICollection<Historial_Precio> Historial_Precios { get; set; } = new List<Historial_Precio>();

    [ForeignKey("Producto_IdProducto")]
    [InverseProperty("Producto_IdProductos")]
    public virtual ICollection<Catalogo> Catalogo_IdCatalogos { get; set; } = new List<Catalogo>();

    [ForeignKey("Producto_IdProducto")]
    [InverseProperty("Producto_IdProductos")]
    public virtual ICollection<Categoria> Categoria_IdCategoria { get; set; } = new List<Categoria>();
}
