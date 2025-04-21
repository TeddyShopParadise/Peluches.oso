import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
  TablePagination,
  Switch,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { Edit, Delete, Info } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const DetallePedido = () => {
  const [detalles, setDetalles] = useState([]);
  const [detalle, setDetalle] = useState({
    precioDetallePedido: '',
    cantidadDetallePedido: '',
    idPedido: '',
    idProducto: '',
  });
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);

  // Función para obtener los detalles de pedido
  const fetchDetalles = async () => {
    try {
      const response = await fetch(`${apiUrl}/detallesPedido`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener los detalles de pedido');
      }
      const data = await response.json();
      setDetalles(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para obtener los pedidos
  const fetchPedidos = async () => {
    try {
      const response = await fetch(`${apiUrl}/pedido`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener los pedidos');
      }
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para obtener los productos
  const fetchProductos = async () => {
    try {
      const response = await fetch(`${apiUrl}/producto`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  // Efecto para cargar detalles, pedidos y productos al montar el componente
  useEffect(() => {
    fetchDetalles();
    fetchPedidos();
    fetchProductos();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setDetalle({ ...detalle, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario para crear o actualizar un detalle
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log para ver si estamos en modo edición o no
    console.log('Modo:', editingId ? 'Edición' : 'Nuevo');
    
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `${apiUrl}/detallesPedido/${editingId}`
      : `${apiUrl}/detallesPedido`;
  
    // Log para ver la URL y el método de la solicitud
    console.log('Método:', method);
    console.log('URL:', url);
  
    // Log para revisar el objeto detalle antes de enviarlo
    console.log('Datos a enviar:', detalle);
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detalle),
      });
  
      // Log para ver la respuesta del servidor
      console.log('Respuesta del servidor:', response);
  
      if (!response.ok) {
        throw new Error('Error al guardar el detalle de pedido');
      }
  
      // Llamada a fetchDetalles() para obtener los detalles actualizados
      fetchDetalles();
  
      // Log para confirmar que los campos han sido limpiados
      console.log('Campos limpiados después de la actualización');
      setDetalle({
        precioDetallePedido: '',
        cantidadDetallePedido: '',
        idPedido: '',
        idProducto: '',
      });
      setEditingId(null);
    } catch (error) {
      // Log para mostrar el error completo
      console.error('Error en la solicitud:', error);
    }
  };
  

  // Manejar la edición de un detalle
  const handleEdit = (detalle) => {
    setDetalle(detalle);
    setEditingId(detalle._id);
  };

  // Manejar la eliminación de un detalle
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/detallesPedido/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el detalle de pedido');
      }

      fetchDetalles();
    } catch (error) {
      console.error(error);
    }
  };

  // Función para abrir el diálogo de detalles
  const handleOpenDialog = (detalle) => {
    setDetalleSeleccionado(detalle);
    setOpenDialog(true);
  };

  // Función para cerrar el diálogo de detalles
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDetalleSeleccionado(null);
  };

  // Función para manejar la paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box className="BoxInicial">
      <Box className="Box"
        sx={{
          width: '90%',
          maxWidth: '100%',
          padding: { xs: '20px', md: '50px' },
          borderRadius: '30px',
        }}
      >
        <Container>
          <h1>Detalles de Pedido</h1>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
          </form>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Precio</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Producto</TableCell>
                  <TableCell>Pedido</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detalles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((detalle) => (
                  <TableRow key={detalle._id}>
                    <TableCell>{detalle.precioDetallePedido}</TableCell>
                    <TableCell>{detalle.cantidadDetallePedido}</TableCell>
                    <TableCell>{detalle.idProducto?._id || detalle.idProducto}</TableCell>
                    <TableCell>{detalle.idPedido?._id || detalle.idPedido}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(detalle)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(detalle._id)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleOpenDialog(detalle)}>
                        <Info />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={detalles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Detalles del Pedido</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Precio:</strong> {detalleSeleccionado?.precioDetallePedido}
          </DialogContentText>
          <DialogContentText>
            <strong>Cantidad:</strong> {detalleSeleccionado?.cantidadDetallePedido}
          </DialogContentText>
          <DialogContentText>
            <strong>Pedido:</strong> {detalleSeleccionado?.idPedido?._id || detalle.idPedido}
          </DialogContentText>
          <DialogContentText>
            <strong>Producto:</strong> {detalleSeleccionado?.idProducto?._id || detalle.idProducto}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DetallePedido;
