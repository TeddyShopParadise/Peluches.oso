import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from '../hooks/ProtectedRoute';

import Home from "../pages/Home/Home";
import Catalogo from "../pages/Catalogo/Catalogo";
import Categoria from "../pages/Categoria/Categoria";
import Cliente from "../pages/Cliente/Cliente";
import Compania from "../pages/Compañia/Compañia";
import DetalleFactura from "../pages/DetalleFactura/DetalleFactura";
import DetallePedido from "../pages/DetallePedido/DetallePedido";
import Devoluciones from "../pages/Devoluciones/Devoluciones";
import Empleado from "../pages/Empleado/Empleado";
import Factura from "../pages/Factura/Factura";
import HistorialPrecio from "../pages/HistorialPrecio/HistorialPrecio";
import Inventario from "../pages/Inventario/Inventario";
import MetodoPago from "../pages/MetodoPago/MetodoPago";
import Movimiento from "../pages/Movimiento/Movimiento";
import Pedido from "../pages/Pedido/Pedido";
import Producto from "../pages/Producto/Producto";
import Roles from "../pages/Roles/Roles";
import Usuarios from "../pages/Usuario/Usuario";
import Login from "../pages/login/login";
import ProductoUsuario from "../pages/Producto/ProductoUsuario";
import CatalogoUsuario from "../pages/Catalogo/CatalogoUsuario";
import Unauthorized from '../pages/AccesoNoAutorizado/Unauthorized';

const NavbarRoutes = () => {
  return (
    <Routes>

      {/* Rutas Sin Proteger */}

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/productos-usuario" element={<ProductoUsuario />} />
      <Route path="/catalogos-usuario" element={<CatalogoUsuario />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Rutas solo para el Rol de Administrador */}

      <Route
        path="/cliente"
        element={
          <ProtectedRoute allowedRoles={["Administrador"]}>
            <Cliente />
          </ProtectedRoute>
        }
      />
      <Route
        path="/empleado"
        element={
          <ProtectedRoute allowedRoles={["Administrador"]}>
            <Empleado />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <ProtectedRoute allowedRoles={["Administrador"]}>
            <Roles />
          </ProtectedRoute>
        }
      />


      {/* Rutas para el Rol de Administrador y empleado */}
      <Route
        path="/catalogo"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <Catalogo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categoria"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <Categoria />
          </ProtectedRoute>
        }
      />
      <Route
        path="/compania"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <Compania />
          </ProtectedRoute>
        }
      />
      <Route
        path="/DetalleFactura"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <DetalleFactura />
          </ProtectedRoute>
        }
      />
      <Route
        path="/DetallePedido"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <DetallePedido />
          </ProtectedRoute>
        }
      />
      <Route
        path="/devoluciones"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <Devoluciones />
          </ProtectedRoute>
        }
      />
      <Route
        path="/factura"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <Factura />
          </ProtectedRoute>
        }
      />
      <Route
        path="/HistorialPrecio"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <HistorialPrecio />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventario"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <Inventario />
          </ProtectedRoute>
        }
      />
      <Route
        path="/MetodoPago"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <MetodoPago />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movimiento"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <Movimiento />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pedido"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <Pedido />
          </ProtectedRoute>
        }
      />
      <Route
        path="/productos"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <Producto />
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute allowedRoles={["Administrador", "Empleado"]}>
            <Usuarios />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default NavbarRoutes;
