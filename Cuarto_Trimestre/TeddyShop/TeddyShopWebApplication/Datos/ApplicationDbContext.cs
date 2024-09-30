using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TeddyShopWebApplication.Models;

namespace TeddyShopWebApplication.Datos
{
    public partial class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Catalogo> Catalogos { get; set; }
        public virtual DbSet<Categoria> Categoria { get; set; }
        public virtual DbSet<Cliente> Clientes { get; set; }
        public virtual DbSet<Compañia> Compañia { get; set; }
        public virtual DbSet<Detalle_Factura> Detalle_Facturas { get; set; }
        public virtual DbSet<Detalle_Pedido> Detalle_Pedidos { get; set; }
        public virtual DbSet<Devoluciones> Devoluciones { get; set; }
        public virtual DbSet<Empleado> Empleados { get; set; }
        public virtual DbSet<Factura> Facturas { get; set; }
        public virtual DbSet<Historial_Precio> Historial_Precios { get; set; }
        public virtual DbSet<Inventario> Inventarios { get; set; }
        public virtual DbSet<Metodo_Pago> Metodo_Pagos { get; set; }
        public virtual DbSet<Movimiento> Movimientos { get; set; }
        public virtual DbSet<Pedido> Pedidos { get; set; }
        public virtual DbSet<Producto> Productos { get; set; }
        //public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<Vendedor> Vendedors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Configuración de Identity
            modelBuilder.Entity<IdentityUserLogin<string>>()
               .HasKey(l => new { l.LoginProvider, l.ProviderKey });
            modelBuilder.Entity<IdentityUserRole<string>>()
                .HasKey(r => new { r.UserId, r.RoleId });
            modelBuilder.Entity<IdentityUserToken<string>>()
                .HasKey(t => new { t.UserId, t.LoginProvider, t.Name });

           

            modelBuilder.Entity<Catalogo>(entity =>
            {
                entity.HasKey(e => e.IdCatalogo).HasName("Catalogo_PK");

                entity.Property(e => e.IdCatalogo).ValueGeneratedNever();

                entity.HasOne(d => d.Compañia_NITNavigation).WithMany(p => p.Catalogos)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Catalogo_Compañia_FK");

                entity.HasMany(d => d.Producto_IdProductos).WithMany(p => p.Catalogo_IdCatalogos)
                    .UsingEntity<Dictionary<string, object>>(
                        "Catalogo_Producto",
                        r => r.HasOne<Producto>().WithMany()
                            .HasForeignKey("Producto_IdProducto")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("Catalogo_Producto_Producto_FK"),
                        l => l.HasOne<Catalogo>().WithMany()
                            .HasForeignKey("Catalogo_IdCatalogo")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("Catalogo_Producto_Catalogo_FK"),
                        j =>
                        {
                            j.HasKey("Catalogo_IdCatalogo", "Producto_IdProducto").HasName("Catalogo_Producto_PK");
                            j.ToTable("Catalogo_Producto");
                        });
            });

            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.HasKey(e => e.IdCategoria).HasName("Categoria_PK");

                entity.Property(e => e.IdCategoria).ValueGeneratedNever();

                entity.HasMany(d => d.Producto_IdProductos).WithMany(p => p.Categoria_IdCategoria)
                    .UsingEntity<Dictionary<string, object>>(
                        "Categoria_Producto",
                        r => r.HasOne<Producto>().WithMany()
                            .HasForeignKey("Producto_IdProducto")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("Categoria_Producto_Producto_FK"),
                        l => l.HasOne<Categoria>().WithMany()
                            .HasForeignKey("Categoria_IdCategoria")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("Categoria_Producto_Categoria_FK"),
                        j =>
                        {
                            j.HasKey("Categoria_IdCategoria", "Producto_IdProducto").HasName("Categoria_Producto_PK");
                            j.ToTable("Categoria_Producto");
                        });
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(e => e.DniCliente).HasName("Cliente_PK");

                entity.Property(e => e.DniCliente).ValueGeneratedNever();

                // Relación con Pedidos
                entity.HasMany(e => e.Pedidos)
                    .WithOne(p => p.Cliente_DniClienteNavigation)
                    .HasForeignKey(p => p.Cliente_DniCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Pedido_Cliente_FK");
            });

            modelBuilder.Entity<Compañia>(entity =>
            {
                entity.HasKey(e => e.NIT).HasName("Compañia_PK");

                entity.Property(e => e.NIT).ValueGeneratedNever();
            });

            modelBuilder.Entity<Detalle_Factura>(entity =>
            {
                entity.HasKey(e => new { e.NumDetalle, e.Producto_IdProducto }).HasName("Detalle_Factura_PK");

                entity.HasOne(d => d.Factura_IdFacturaNavigation).WithMany(p => p.Detalle_Facturas)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Detalle_Factura_Factura_FK");

                entity.HasOne(d => d.Inventario_IdInventarioNavigation).WithMany(p => p.Detalle_Facturas)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Detalle_Factura_Inventario_FK");

                entity.HasOne(d => d.Producto_IdProductoNavigation).WithMany(p => p.Detalle_Facturas)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Detalle_Factura_Producto_FK");
            });

            modelBuilder.Entity<Detalle_Pedido>(entity =>
            {
                entity.HasKey(e => e.NumDetalle).HasName("Detalle_Pedido_PK");

                entity.Property(e => e.NumDetalle).ValueGeneratedNever();

                entity.HasOne(d => d.Pedido_NumPedidoNavigation).WithMany(p => p.Detalle_Pedidos)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Detalle_Pedido_Pedido_FK");

                entity.HasOne(d => d.Producto_IdProductoNavigation).WithMany(p => p.Detalle_Pedidos)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Detalle_Pedido_Producto_FK");
            });

            modelBuilder.Entity<Devoluciones>(entity =>
            {
                entity.HasKey(e => e.IdDevolucion).HasName("Devoluciones_PK");

                entity.Property(e => e.IdDevolucion).ValueGeneratedNever();
            });

            modelBuilder.Entity<Empleado>(entity =>
        {
            entity.HasKey(e => e.DniEmpleado).HasName("Empleado_PK");

            entity.Property(e => e.DniEmpleado).ValueGeneratedNever();

            entity.HasOne(d => d.Compañia_NITNavigation)
                .WithMany(p => p.Empleados)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Empleado_Compañia_FK");

            entity.HasMany(d => d.Catalogo_IdCatalogos)
                .WithMany(p => p.Empleado_DniEmpleados)
                .UsingEntity<Dictionary<string, object>>(
                    "Vendedor_Catalogo",
                    r => r.HasOne<Catalogo>().WithMany()
                        .HasForeignKey("Catalogo_IdCatalogo")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Vendedor_Catalogo_Catalogo_FK"),
                    l => l.HasOne<Empleado>().WithMany()
                        .HasForeignKey("Empleado_DniEmpleado")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Vendedor_Catalogo_Empleado_FK"),
                    j =>
                    {
                        j.HasKey("Empleado_DniEmpleado", "Catalogo_IdCatalogo").HasName("Vendedor_Catalogo_PK");
                        j.ToTable("Vendedor_Catalogo");
                    });

            entity.HasMany(d => d.Pedido_NumPedidos)
                .WithMany(p => p.Empleado_DniEmpleados)
                .UsingEntity<Dictionary<string, object>>(
                    "Vendedor_Pedido",
                    r => r.HasOne<Pedido>().WithMany()
                        .HasForeignKey("Pedido_NumPedido")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Vendedor_Pedido_Pedido_FK"),
                    l => l.HasOne<Empleado>().WithMany()
                        .HasForeignKey("Empleado_DniEmpleado")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Vendedor_Pedido_Empleado_FK"),
                    j =>
                    {
                        j.HasKey("Empleado_DniEmpleado", "Pedido_NumPedido").HasName("Vendedor_Pedido_PK");
                        j.ToTable("Vendedor_Pedido");
                    });

            // Configuración de la relación con Identity
            entity.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId);
        });

            modelBuilder.Entity<Factura>(entity =>
            {
                entity.HasKey(e => e.IdFactura).HasName("Factura_PK");

                entity.Property(e => e.IdFactura).ValueGeneratedNever();

                // Relación con Pedido
                entity.HasOne(d => d.Pedido_NumPedidoNavigation).WithMany(p => p.Facturas)
                    .HasForeignKey(d => d.Pedido_NumPedido)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Factura_Pedido_FK");
            });

            modelBuilder.Entity<Historial_Precio>(entity =>
            {
                entity.HasKey(e => new { e.HistorialPrecioId, e.Producto_IdProducto }).HasName("Historial_Precio_PK");

                entity.HasOne(d => d.Producto_IdProductoNavigation).WithMany(p => p.Historial_Precios)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Historial_Precio_Producto_FK");
            });


            modelBuilder.Entity<Inventario>(entity =>
            {
                entity.HasKey(e => e.IdInventario).HasName("Inventario_PK");

                entity.Property(e => e.IdInventario).ValueGeneratedNever();

                entity.HasOne(d => d.IdDevolucionNavigation).WithMany(p => p.Inventarios)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Inventario_Producto_FK");
            });

            modelBuilder.Entity<Metodo_Pago>(entity =>
            {
                entity.HasKey(e => e.IdMetodoPago).HasName("PK__Metodo_P__6F49A9BE6CC59531");

                entity.HasOne(d => d.Factura_IdFacturaNavigation).WithMany(p => p.Metodo_Pagos)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Metodo_Pago_Factura_FK");
            });

            modelBuilder.Entity<Movimiento>(entity =>
            {
                entity.HasKey(e => e.IdMovimiento).HasName("Movimiento_PK");

                entity.Property(e => e.IdMovimiento).ValueGeneratedNever();
            });

            modelBuilder.Entity<Pedido>(entity =>
            {
                entity.HasKey(e => e.NumPedido).HasName("Pedido_PK");

                entity.Property(e => e.NumPedido).ValueGeneratedNever();

                // Relación con Cliente
                entity.HasOne(d => d.Cliente_DniClienteNavigation)
                    .WithMany(p => p.Pedidos)
                    .HasForeignKey(d => d.Cliente_DniCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Pedido_Cliente_FK");

                // Relación con Facturas
                entity.HasMany(e => e.Facturas)
                    .WithOne(f => f.Pedido_NumPedidoNavigation)
                    .HasForeignKey(f => f.Pedido_NumPedido)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Factura_Pedido_FK");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(e => e.IdProducto).HasName("Producto_PK");

                entity.Property(e => e.IdProducto).ValueGeneratedNever();
            });

          

            //modelBuilder.Entity<Usuario>(entity =>
            //{
            //    entity.HasKey(e => e.IdUsuario).HasName("Usuario_PK");

            //    entity.Property(e => e.IdUsuario).ValueGeneratedNever();
            //});

            modelBuilder.Entity<Vendedor>(entity =>
            {
                entity.HasKey(e => e.DniEmpleado).HasName("Vendedor_PK");

                entity.Property(e => e.DniEmpleado).ValueGeneratedNever();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
