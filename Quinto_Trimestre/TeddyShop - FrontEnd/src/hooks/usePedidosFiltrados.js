import { useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

const usePedidosFiltrados = (pedidos) => {
  const pedidosFiltrados = useMemo(() => {
    try {
      // Obtener el token del localStorage
      const token = localStorage.getItem('token');
      if (!token) return [];

      // Decodificar el token para obtener la información del usuario
      const decoded = jwtDecode(token);
      
      // Obtener la información del usuario del token
      const usuario = decoded.usuario;
      
      if (!usuario) {
        console.error('No se encontró información del usuario en el token');
        return [];
      }

      // Verificar si es administrador
      const esAdministrador = usuario.roles?.some(rol => 
        rol.nombre === "Administrador"
      );

      // Si es administrador, devolver todos los pedidos
      if (esAdministrador) {
        return pedidos;
      }

      // Si es empleado, filtrar solo sus pedidos
      const empleadoIds = usuario.empleados?.map(emp => emp._id) || [];
            
      const pedidosFiltrados = pedidos.filter(pedido => {
        const vendedorId = pedido.vendedor?._id || pedido.vendedor;
        return empleadoIds.includes(vendedorId);
      });
      
      return pedidosFiltrados;

    } catch (error) {
      console.error('Error al filtrar pedidos:', error);
      return [];
    }
  }, [pedidos]);

  return pedidosFiltrados;
};

export default usePedidosFiltrados;