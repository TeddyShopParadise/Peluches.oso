using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeddyShop.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CatalogoEmpleado",
                columns: table => new
                {
                    Catalogo_IdCatalogo = table.Column<int>(type: "int", nullable: false),
                    Empleado_DniEmpleado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogoEmpleado", x => new { x.Catalogo_IdCatalogo, x.Empleado_DniEmpleado });
                });

            migrationBuilder.CreateTable(
                name: "CatalogoProducto",
                columns: table => new
                {
                    Catalogo_IdCatalogo = table.Column<int>(type: "int", nullable: false),
                    Producto_IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogoProducto", x => new { x.Catalogo_IdCatalogo, x.Producto_IdProducto });
                });

            migrationBuilder.CreateTable(
                name: "Categoria",
                columns: table => new
                {
                    IdCategoria = table.Column<int>(type: "int", nullable: false),
                    DescripcionCategoria = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    NombreCategoria = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Categoria_PK", x => x.IdCategoria);
                });

            migrationBuilder.CreateTable(
                name: "CategoriaProducto",
                columns: table => new
                {
                    Categoria_IdCategoria = table.Column<int>(type: "int", nullable: false),
                    Producto_IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoriaProducto", x => new { x.Categoria_IdCategoria, x.Producto_IdProducto });
                });

            migrationBuilder.CreateTable(
                name: "Cliente",
                columns: table => new
                {
                    DniCliente = table.Column<int>(type: "int", nullable: false),
                    NombreCliente = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    TelefonoCliente = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    FechaNaciminetoCliente = table.Column<DateOnly>(type: "date", nullable: false),
                    ApelldioCliente = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Cliente_PK", x => x.DniCliente);
                });

            migrationBuilder.CreateTable(
                name: "Compañia",
                columns: table => new
                {
                    NIT = table.Column<int>(type: "int", nullable: false),
                    TelefonoEmpresa = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    NombreEmpresa = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    DIreccionEmpresa = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Compañia_PK", x => x.NIT);
                });

            migrationBuilder.CreateTable(
                name: "Devoluciones",
                columns: table => new
                {
                    Devoluciones_ID = table.Column<decimal>(type: "numeric(28,0)", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdDevolucion = table.Column<int>(type: "int", nullable: false),
                    DetalleDevolucion = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Devoluciones_PK", x => x.Devoluciones_ID);
                });

            migrationBuilder.CreateTable(
                name: "EmpleadoPedido",
                columns: table => new
                {
                    Empleado_DniEmpleado = table.Column<int>(type: "int", nullable: false),
                    Pedido_NumPedido = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmpleadoPedido", x => new { x.Empleado_DniEmpleado, x.Pedido_NumPedido });
                });

            migrationBuilder.CreateTable(
                name: "Producto",
                columns: table => new
                {
                    IdProducto = table.Column<int>(type: "int", nullable: false),
                    EstiloProducto = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    CmCabezaColaProducto = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    MaterialProducto = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    DisponibilidadProducto = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    CmColaPataProducto = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    TamañoProducto = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Producto_PK", x => x.IdProducto);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    IdRol = table.Column<int>(type: "int", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Roles_PK", x => x.IdRol);
                });

            migrationBuilder.CreateTable(
                name: "RoleUsuario",
                columns: table => new
                {
                    Roles_IdRol = table.Column<int>(type: "int", nullable: false),
                    Usuario_IdUsuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleUsuario", x => new { x.Roles_IdRol, x.Usuario_IdUsuario });
                });

            migrationBuilder.CreateTable(
                name: "Pedido",
                columns: table => new
                {
                    NumPedido = table.Column<int>(type: "int", nullable: false),
                    TamañoOso = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    NombreComprador = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    NumeroComprador = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    NombreAgendador = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    NumeroAgendador = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Localidad = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Direccion = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Barrio = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Cliente_DniCliente = table.Column<int>(type: "int", nullable: false),
                    ApellidoAgendador = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ApellidoComprador = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Pedido_PK", x => x.NumPedido);
                    table.ForeignKey(
                        name: "Pedido_Cliente_FK",
                        column: x => x.Cliente_DniCliente,
                        principalTable: "Cliente",
                        principalColumn: "DniCliente");
                });

            migrationBuilder.CreateTable(
                name: "Catalogo",
                columns: table => new
                {
                    IdCatalogo = table.Column<int>(type: "int", nullable: false),
                    DisponibilidadCatalogo = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    EstiloCatalogo = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Compañia_NIT = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Catalogo_PK", x => x.IdCatalogo);
                    table.ForeignKey(
                        name: "Catalogo_Compañia_FK",
                        column: x => x.Compañia_NIT,
                        principalTable: "Compañia",
                        principalColumn: "NIT");
                });

            migrationBuilder.CreateTable(
                name: "Empleado",
                columns: table => new
                {
                    DniEmpleado = table.Column<int>(type: "int", nullable: false),
                    TelefonoEmpleado = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    CodigoEmpleado = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    FechaNaciminetoEmpleado = table.Column<DateOnly>(type: "date", nullable: false),
                    NombreEmpleado = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Compañia_NIT = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Empleado_PK", x => x.DniEmpleado);
                    table.ForeignKey(
                        name: "Empleado_Compañia_FK",
                        column: x => x.Compañia_NIT,
                        principalTable: "Compañia",
                        principalColumn: "NIT");
                });

            migrationBuilder.CreateTable(
                name: "Inventario",
                columns: table => new
                {
                    IdInventario = table.Column<int>(type: "int", nullable: false),
                    StockMinimo = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    PrecioVenta = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    PrecioCompra = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    Stock = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    StockMaximo = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Devoluciones_Devoluciones_ID = table.Column<decimal>(type: "numeric(28,0)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Inventario_PK", x => x.IdInventario);
                    table.ForeignKey(
                        name: "Inventario_Devoluciones_FK",
                        column: x => x.Devoluciones_Devoluciones_ID,
                        principalTable: "Devoluciones",
                        principalColumn: "Devoluciones_ID");
                });

            migrationBuilder.CreateTable(
                name: "Categoria_Producto",
                columns: table => new
                {
                    Categoria_IdCategoria = table.Column<int>(type: "int", nullable: false),
                    Producto_IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Categoria_Producto_PK", x => new { x.Categoria_IdCategoria, x.Producto_IdProducto });
                    table.ForeignKey(
                        name: "Categoria_Producto_Categoria_FK",
                        column: x => x.Categoria_IdCategoria,
                        principalTable: "Categoria",
                        principalColumn: "IdCategoria");
                    table.ForeignKey(
                        name: "Categoria_Producto_Producto_FK",
                        column: x => x.Producto_IdProducto,
                        principalTable: "Producto",
                        principalColumn: "IdProducto");
                });

            migrationBuilder.CreateTable(
                name: "Historial_Precio",
                columns: table => new
                {
                    HistorialPrecioId = table.Column<int>(type: "int", nullable: false),
                    Producto_IdProducto = table.Column<int>(type: "int", nullable: false),
                    Precio = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    FechaInicio = table.Column<DateOnly>(type: "date", nullable: false),
                    FechaFin = table.Column<DateOnly>(type: "date", nullable: false),
                    EstadoPrecio = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Historial_Precio_PK", x => new { x.HistorialPrecioId, x.Producto_IdProducto });
                    table.ForeignKey(
                        name: "Historial_Precio_Producto_FK",
                        column: x => x.Producto_IdProducto,
                        principalTable: "Producto",
                        principalColumn: "IdProducto");
                });

            migrationBuilder.CreateTable(
                name: "Detalle_Pedido",
                columns: table => new
                {
                    NumDetalle = table.Column<int>(type: "int", nullable: false),
                    PrecioDetallePedido = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    CantidadDetallePedido = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Pedido_NumPedido = table.Column<int>(type: "int", nullable: false),
                    Producto_IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Detalle_Pedido_PK", x => x.NumDetalle);
                    table.ForeignKey(
                        name: "Detalle_Pedido_Pedido_FK",
                        column: x => x.Pedido_NumPedido,
                        principalTable: "Pedido",
                        principalColumn: "NumPedido");
                    table.ForeignKey(
                        name: "Detalle_Pedido_Producto_FK",
                        column: x => x.Producto_IdProducto,
                        principalTable: "Producto",
                        principalColumn: "IdProducto");
                });

            migrationBuilder.CreateTable(
                name: "Factura",
                columns: table => new
                {
                    IdFactura = table.Column<int>(type: "int", nullable: false),
                    FechaCreacion_Factura = table.Column<DateOnly>(type: "date", nullable: false),
                    HoraCreacion_Factura = table.Column<TimeOnly>(type: "time", nullable: false),
                    Pedido_NumPedido = table.Column<int>(type: "int", nullable: false),
                    Cliente_DniCliente = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Factura_PK", x => x.IdFactura);
                    table.ForeignKey(
                        name: "Factura_Cliente_FK",
                        column: x => x.Cliente_DniCliente,
                        principalTable: "Cliente",
                        principalColumn: "DniCliente");
                    table.ForeignKey(
                        name: "Factura_Pedido_FK",
                        column: x => x.Pedido_NumPedido,
                        principalTable: "Pedido",
                        principalColumn: "NumPedido");
                });

            migrationBuilder.CreateTable(
                name: "Catalogo_Producto",
                columns: table => new
                {
                    Catalogo_IdCatalogo = table.Column<int>(type: "int", nullable: false),
                    Producto_IdProducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Catalogo_Producto_PK", x => new { x.Catalogo_IdCatalogo, x.Producto_IdProducto });
                    table.ForeignKey(
                        name: "Catalogo_Producto_Catalogo_FK",
                        column: x => x.Catalogo_IdCatalogo,
                        principalTable: "Catalogo",
                        principalColumn: "IdCatalogo");
                    table.ForeignKey(
                        name: "Catalogo_Producto_Producto_FK",
                        column: x => x.Producto_IdProducto,
                        principalTable: "Producto",
                        principalColumn: "IdProducto");
                });

            migrationBuilder.CreateTable(
                name: "Administrador",
                columns: table => new
                {
                    DniEmpleado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Administrador_PK", x => x.DniEmpleado);
                    table.ForeignKey(
                        name: "Administrador_Empleado_FK",
                        column: x => x.DniEmpleado,
                        principalTable: "Empleado",
                        principalColumn: "DniEmpleado");
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    IdUsuario = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Telefono = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Contraseña = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Username = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Empleado_DniEmpleado = table.Column<int>(type: "int", nullable: false),
                    Estado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Usuario_PK", x => x.IdUsuario);
                    table.ForeignKey(
                        name: "Usuario_Empleado_FK",
                        column: x => x.Empleado_DniEmpleado,
                        principalTable: "Empleado",
                        principalColumn: "DniEmpleado");
                });

            migrationBuilder.CreateTable(
                name: "Vendedor",
                columns: table => new
                {
                    DniEmpleado = table.Column<int>(type: "int", nullable: false),
                    CodigoVendedor = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Vendedor_PK", x => x.DniEmpleado);
                    table.ForeignKey(
                        name: "Vendedor_Empleado_FK",
                        column: x => x.DniEmpleado,
                        principalTable: "Empleado",
                        principalColumn: "DniEmpleado");
                });

            migrationBuilder.CreateTable(
                name: "Vendedor_Catalogo",
                columns: table => new
                {
                    Empleado_DniEmpleado = table.Column<int>(type: "int", nullable: false),
                    Catalogo_IdCatalogo = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Vendedor_Catalogo_PK", x => new { x.Empleado_DniEmpleado, x.Catalogo_IdCatalogo });
                    table.ForeignKey(
                        name: "Vendedor_Catalogo_Catalogo_FK",
                        column: x => x.Catalogo_IdCatalogo,
                        principalTable: "Catalogo",
                        principalColumn: "IdCatalogo");
                    table.ForeignKey(
                        name: "Vendedor_Catalogo_Empleado_FK",
                        column: x => x.Empleado_DniEmpleado,
                        principalTable: "Empleado",
                        principalColumn: "DniEmpleado");
                });

            migrationBuilder.CreateTable(
                name: "Vendedor_Pedido",
                columns: table => new
                {
                    Empleado_DniEmpleado = table.Column<int>(type: "int", nullable: false),
                    Pedido_NumPedido = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Vendedor_Pedido_PK", x => new { x.Empleado_DniEmpleado, x.Pedido_NumPedido });
                    table.ForeignKey(
                        name: "Vendedor_Pedido_Empleado_FK",
                        column: x => x.Empleado_DniEmpleado,
                        principalTable: "Empleado",
                        principalColumn: "DniEmpleado");
                    table.ForeignKey(
                        name: "Vendedor_Pedido_Pedido_FK",
                        column: x => x.Pedido_NumPedido,
                        principalTable: "Pedido",
                        principalColumn: "NumPedido");
                });

            migrationBuilder.CreateTable(
                name: "Movimiento",
                columns: table => new
                {
                    Inventario_IdInventario = table.Column<int>(type: "int", nullable: false),
                    IdMovimiento = table.Column<int>(type: "int", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime", nullable: false),
                    CantidadIngreso = table.Column<int>(type: "int", nullable: false),
                    CantiidadVendida = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Movimiento_PK", x => x.Inventario_IdInventario);
                    table.ForeignKey(
                        name: "Movimiento_Inventario_FK",
                        column: x => x.Inventario_IdInventario,
                        principalTable: "Inventario",
                        principalColumn: "IdInventario");
                });

            migrationBuilder.CreateTable(
                name: "Detalle_Factura",
                columns: table => new
                {
                    NumDetalle = table.Column<int>(type: "int", nullable: false),
                    Producto_IdProducto = table.Column<int>(type: "int", nullable: false),
                    PrecioDetalleFactura = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    CantidadDetalleFactura = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    Inventario_IdInventario = table.Column<int>(type: "int", nullable: false),
                    Factura_IdFactura = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Detalle_Factura_PK", x => new { x.NumDetalle, x.Producto_IdProducto });
                    table.ForeignKey(
                        name: "Detalle_Factura_Factura_FK",
                        column: x => x.Factura_IdFactura,
                        principalTable: "Factura",
                        principalColumn: "IdFactura");
                    table.ForeignKey(
                        name: "Detalle_Factura_Inventario_FK",
                        column: x => x.Inventario_IdInventario,
                        principalTable: "Inventario",
                        principalColumn: "IdInventario");
                    table.ForeignKey(
                        name: "Detalle_Factura_Producto_FK",
                        column: x => x.Producto_IdProducto,
                        principalTable: "Producto",
                        principalColumn: "IdProducto");
                });

            migrationBuilder.CreateTable(
                name: "Metodo_Pago",
                columns: table => new
                {
                    NumPago = table.Column<int>(type: "int", nullable: false),
                    NombreMetodoPago = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Factura_IdFactura = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Metodo_Pago_PK", x => x.NumPago);
                    table.ForeignKey(
                        name: "Metodo_Pago_Factura_FK",
                        column: x => x.Factura_IdFactura,
                        principalTable: "Factura",
                        principalColumn: "IdFactura");
                });

            migrationBuilder.CreateTable(
                name: "RolesUsuario",
                columns: table => new
                {
                    Usuario_IdUsuario = table.Column<int>(type: "int", nullable: false),
                    Roles_IdRol = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("RolesUsuario_PK", x => new { x.Usuario_IdUsuario, x.Roles_IdRol });
                    table.ForeignKey(
                        name: "RolesUsuario_Roles_FK",
                        column: x => x.Roles_IdRol,
                        principalTable: "Roles",
                        principalColumn: "IdRol");
                    table.ForeignKey(
                        name: "RolesUsuario_Usuario_FK",
                        column: x => x.Usuario_IdUsuario,
                        principalTable: "Usuario",
                        principalColumn: "IdUsuario");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Catalogo_Compañia_NIT",
                table: "Catalogo",
                column: "Compañia_NIT");

            migrationBuilder.CreateIndex(
                name: "IX_Catalogo_Producto_Producto_IdProducto",
                table: "Catalogo_Producto",
                column: "Producto_IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Categoria_Producto_Producto_IdProducto",
                table: "Categoria_Producto",
                column: "Producto_IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Detalle_Factura_Factura_IdFactura",
                table: "Detalle_Factura",
                column: "Factura_IdFactura");

            migrationBuilder.CreateIndex(
                name: "IX_Detalle_Factura_Inventario_IdInventario",
                table: "Detalle_Factura",
                column: "Inventario_IdInventario");

            migrationBuilder.CreateIndex(
                name: "IX_Detalle_Factura_Producto_IdProducto",
                table: "Detalle_Factura",
                column: "Producto_IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Detalle_Pedido_Pedido_NumPedido",
                table: "Detalle_Pedido",
                column: "Pedido_NumPedido");

            migrationBuilder.CreateIndex(
                name: "IX_Detalle_Pedido_Producto_IdProducto",
                table: "Detalle_Pedido",
                column: "Producto_IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Empleado_Compañia_NIT",
                table: "Empleado",
                column: "Compañia_NIT");

            migrationBuilder.CreateIndex(
                name: "IX_Factura_Cliente_DniCliente",
                table: "Factura",
                column: "Cliente_DniCliente");

            migrationBuilder.CreateIndex(
                name: "IX_Factura_Pedido_NumPedido",
                table: "Factura",
                column: "Pedido_NumPedido");

            migrationBuilder.CreateIndex(
                name: "IX_Historial_Precio_Producto_IdProducto",
                table: "Historial_Precio",
                column: "Producto_IdProducto");

            migrationBuilder.CreateIndex(
                name: "Inventario__IDX",
                table: "Inventario",
                column: "Devoluciones_Devoluciones_ID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Metodo_Pago_Factura_IdFactura",
                table: "Metodo_Pago",
                column: "Factura_IdFactura");

            migrationBuilder.CreateIndex(
                name: "IX_Pedido_Cliente_DniCliente",
                table: "Pedido",
                column: "Cliente_DniCliente");

            migrationBuilder.CreateIndex(
                name: "IX_RolesUsuario_Roles_IdRol",
                table: "RolesUsuario",
                column: "Roles_IdRol");

            migrationBuilder.CreateIndex(
                name: "Usuario__IDX",
                table: "Usuario",
                column: "Empleado_DniEmpleado",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "Vendedor_PKv1",
                table: "Vendedor",
                column: "CodigoVendedor",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vendedor_Catalogo_Catalogo_IdCatalogo",
                table: "Vendedor_Catalogo",
                column: "Catalogo_IdCatalogo");

            migrationBuilder.CreateIndex(
                name: "IX_Vendedor_Pedido_Pedido_NumPedido",
                table: "Vendedor_Pedido",
                column: "Pedido_NumPedido");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Administrador");

            migrationBuilder.DropTable(
                name: "Catalogo_Producto");

            migrationBuilder.DropTable(
                name: "CatalogoEmpleado");

            migrationBuilder.DropTable(
                name: "CatalogoProducto");

            migrationBuilder.DropTable(
                name: "Categoria_Producto");

            migrationBuilder.DropTable(
                name: "CategoriaProducto");

            migrationBuilder.DropTable(
                name: "Detalle_Factura");

            migrationBuilder.DropTable(
                name: "Detalle_Pedido");

            migrationBuilder.DropTable(
                name: "EmpleadoPedido");

            migrationBuilder.DropTable(
                name: "Historial_Precio");

            migrationBuilder.DropTable(
                name: "Metodo_Pago");

            migrationBuilder.DropTable(
                name: "Movimiento");

            migrationBuilder.DropTable(
                name: "RolesUsuario");

            migrationBuilder.DropTable(
                name: "RoleUsuario");

            migrationBuilder.DropTable(
                name: "Vendedor");

            migrationBuilder.DropTable(
                name: "Vendedor_Catalogo");

            migrationBuilder.DropTable(
                name: "Vendedor_Pedido");

            migrationBuilder.DropTable(
                name: "Categoria");

            migrationBuilder.DropTable(
                name: "Producto");

            migrationBuilder.DropTable(
                name: "Factura");

            migrationBuilder.DropTable(
                name: "Inventario");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "Catalogo");

            migrationBuilder.DropTable(
                name: "Pedido");

            migrationBuilder.DropTable(
                name: "Devoluciones");

            migrationBuilder.DropTable(
                name: "Empleado");

            migrationBuilder.DropTable(
                name: "Cliente");

            migrationBuilder.DropTable(
                name: "Compañia");
        }
    }
}
