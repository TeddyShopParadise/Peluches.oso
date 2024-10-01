using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeddyShopWebApplication.Models
{
    [Table("Empleado")]
    public partial class Empleado
    {
        [Key]
        [Required(ErrorMessage = "El DNI del empleado es obligatorio.")]
        public int DniEmpleado { get; set; }

        [StringLength(256)]
        [Required(ErrorMessage = "El número de teléfono es obligatorio.")]
        public string TelefonoEmpleado { get; set; } = null!;

        [StringLength(256)]
        [Required(ErrorMessage = "El código del empleado es obligatorio.")]
        public string CodigoEmpleado { get; set; } = null!;

        [Required(ErrorMessage = "La fecha de nacimiento es obligatoria.")]
        public DateOnly FechaNaciminetoEmpleado { get; set; }

        [StringLength(256)]
        [Required(ErrorMessage = "El nombre es obligatorio.")]
        public string NombreEmpleado { get; set; } = null!;

        [Required(ErrorMessage = "El NIT de la compañía es obligatorio.")]
        public int Compañia_NIT { get; set; }

        [StringLength(450)]
        public string? UserId { get; set; }

        [ForeignKey("Compañia_NIT")]
        [InverseProperty("Empleados")]
        public virtual Compañia Compañia_NITNavigation { get; set; } = null!;

        [InverseProperty("DniEmpleadoNavigation")]
        public virtual Vendedor? Vendedor { get; set; }

        [ForeignKey("Empleado_DniEmpleado")]
        [InverseProperty("Empleado_DniEmpleados")]
        public virtual ICollection<Catalogo> Catalogo_IdCatalogos { get; set; } = new List<Catalogo>();

        [ForeignKey("Empleado_DniEmpleado")]
        [InverseProperty("Empleado_DniEmpleados")]
        public virtual ICollection<Pedido> Pedido_NumPedidos { get; set; } = new List<Pedido>();

        [ForeignKey("UserId")]
        public virtual IdentityUser User { get; set; } = null!;
    }
}
