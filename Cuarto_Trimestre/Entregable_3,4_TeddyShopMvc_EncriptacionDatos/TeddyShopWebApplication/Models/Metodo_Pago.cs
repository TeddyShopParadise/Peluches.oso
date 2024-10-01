using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TeddyShopWebApplication.Models;

[Table("Metodo_Pago")]
public partial class Metodo_Pago
{
    [Key]
    public int IdMetodoPago { get; set; }

    public int NumPago { get; set; }

    [StringLength(256)]
    public string NombreMetodoPago { get; set; } = null!;

    public int Factura_IdFactura { get; set; }

    [ForeignKey("Factura_IdFactura")]
    [InverseProperty("Metodo_Pagos")]
    public virtual Factura Factura_IdFacturaNavigation { get; set; } = null!;
}
