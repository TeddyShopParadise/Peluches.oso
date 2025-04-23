import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Catalogo from "../pages/Catalogo/Catalogo";
import Categoria from "../pages/Categoria/Categoria";
import Cliente from "../pages/Cliente/Cliente";
import Compania from "../pages/Compañia/Compañia";
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
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/categoria" element={<Categoria />} />
      <Route path="/cliente" element={<Cliente />} />
      <Route path="/compania" element={<Compania />} />
      <Route path="/devoluciones" element={<Devoluciones />} />
      <Route path="/empleado" element={<Empleado />} />
      <Route path="/factura" element={<Factura />} />
      <Route path="/HistorialPrecio" element={<HistorialPrecio />} />
      <Route path="/inventario" element={<Inventario />} />
      <Route path="/MetodoPago" element={<MetodoPago />} />
      <Route path="/movimiento" element={<Movimiento />} />
      <Route path="/pedido" element={<Pedido />} />
      <Route path="/productos" element={<Producto />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/login" element={<Login />} />
      <Route path="/productos-usuario" element={<ProductoUsuario />} />
      <Route path="/catalogos-usuario" element={<CatalogoUsuario />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default NavbarRoutes;
