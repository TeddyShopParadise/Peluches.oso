import React, { useEffect, useState, useMemo } from 'react';

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
  Box,
  TablePagination,
  Typography,
  Tooltip,
  Chip,
  FormControlLabel,
  Switch,
  Snackbar, 
  Alert,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  Checkbox
   
} from '@mui/material';
import sortBy from 'lodash/sortBy';
import { Edit, Delete , ListAlt, ArrowUpward, ArrowDownward, Info, AddCircle, Save, Cancel, Add, Clear, Search  } from '@mui/icons-material';
import '../PagesStyle.css';
import Swal from 'sweetalert2';
import { getApiUrl } from '../../utils/apiConfig';
import useApiRequest from '../../hooks/useApiRequest';

const apiUrl = getApiUrl();

const Inventario = () => {
  const [inventarios, setInventarios] = useState([]);
  const [selectedInventario, setSelectedInventario] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [inventarioData, setInventarioData] = useState({
    stock: 0,
    stockMinimo: 0,
    stockMaximo: 0,
    precioVenta: '',  
    precioCompra: '', 
  });

  useEffect(() => {
    fetchInventarios();
  }, []);

  const fetchInventarios = async () => {
    try {
      const response = await fetch(`${apiUrl}/inventario`);
      if (!response.ok) throw new Error('Error al obtener los inventarios');
      const data = await response.json();
      setInventarios(data);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'No se pudieron cargar los inventarios', 'error');
    }
  };

  const handleEditClick = (inventario) => {
    console.log('Inventario seleccionado:', inventario); 
    
    const precioVenta = typeof inventario.precioVenta === 'object' 
      ? inventario.precioVenta.$numberDecimal 
      : inventario.precioVenta;
    
    const precioCompra = typeof inventario.precioCompra === 'object' 
      ? inventario.precioCompra.$numberDecimal 
      : inventario.precioCompra;
    
    setSelectedInventario(inventario);
    
    setInventarioData({
      stock: inventario.stock,
      stockMinimo: inventario.stockMinimo,
      stockMaximo: inventario.stockMaximo,
      precioVenta: precioVenta || '0',
      precioCompra: precioCompra || '0'
    });
    
    setOpenEditDialog(true);
  };


  const { makeRequest } = useApiRequest();

const actualizarInventario = async () => {
  if (!selectedInventario) {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No hay inventario seleccionado para actualizar',
      confirmButtonColor: '#d33'
    });
    return;
  }

  if (!selectedInventario.idProducto || !selectedInventario.idProducto._id) {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se encontró un ID de producto válido',
      confirmButtonColor: '#d33'
    });
    return;
  }

  const datosActualizados = {
    stock: Number(inventarioData.stock),
    stockMinimo: Number(inventarioData.stockMinimo),
    stockMaximo: Number(inventarioData.stockMaximo),
    precioVenta: parseFloat(inventarioData.precioVenta) || 0,
    precioCompra: parseFloat(inventarioData.precioCompra) || 0,
    idProducto: selectedInventario.idProducto._id
  };

  await makeRequest({
    url: `${apiUrl}/inventario/${selectedInventario._id}`,
    method: 'PUT',
    data: datosActualizados,
    headers: {
      'Content-Type': 'application/json',
    },
    success: {
      title: 'Éxito',
      text: 'Inventario actualizado correctamente',
      icon: 'success'
    },
    error: {
      title: 'Error',
      text: (error) => error.message || 'Error al actualizar el inventario',
      icon: 'error'
    },
    onSuccess: () => {
      fetchInventarios();
      setOpenEditDialog(false);
    }
  });
};

const eliminarInventario = async (id) => {
  await makeRequest({
    url: `${apiUrl}/inventario/${id}`,
    method: 'DELETE',
    confirm: {
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    },
    success: {
      title: 'Eliminado',
      text: 'El inventario ha sido eliminado correctamente.',
      icon: 'success'
    },
    error: {
      title: 'Error',
      text: (error) => error.message || 'Ocurrió un problema al eliminar el inventario.',
      icon: 'error'
    },
    onSuccess: fetchInventarios
  });
};

  const handleOpenDetailDialog = (inventario) => {
    setSelectedInventario(inventario);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const totalStock = useMemo(
  () => inventarios.reduce((sum, inv) => sum + (inv.stock || 0), 0),
  [inventarios]
);

const totalInventarios = useMemo(
  () => inventarios.length,
  [inventarios]
);

return (
  <Box className="BoxInicial">
    <Box
      className="Box"
      sx={{
        width: '90%',
        maxWidth: '900px',
        padding: { xs: '20px', md: '30px' },
        borderRadius: '30px',
        margin: '0 auto',
        backgroundColor: '#fffafc',
        boxShadow: '0 8px 24px rgba(248, 200, 220, 0.3)',
        border: '2px solid #f8c8dc',
      }}
    >
      <Container>
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: '30px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '25%',
              width: '50%',
              height: '4px',
              background: 'linear-gradient(90deg, #fce4ec 0%, #f8c8dc 50%, #fce4ec 100%)',
              borderRadius: '10px',
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#b04e6f',
              fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
            }}
          >
            Inventario
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            marginBottom: 4
          }}
        >
          <Paper
            elevation={3}
            sx={{
              flex: '1 1 200px',
              backgroundColor: '#fce4ec',
              border: '1px solid #f8c8dc',
              borderRadius: '20px',
              padding: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle1" color="#b04e6f" fontWeight="bold">
              Total Stock
            </Typography>
            <Typography variant="h5" color="#2e7d32" fontWeight="bold">
              {totalStock}
            </Typography>
          </Paper>

        

          <Paper
            elevation={3}
            sx={{
              flex: '1 1 200px',
              backgroundColor: '#fce4ec',
              border: '1px solid #f8c8dc',
              borderRadius: '20px',
              padding: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle1" color="#b04e6f" fontWeight="bold">
              Total Inventarios
            </Typography>
            <Typography variant="h5" color="#6a1b9a" fontWeight="bold">
              {totalInventarios}
            </Typography>
          </Paper>
        </Box>

        <Paper
          elevation={2}
          sx={{
            padding: '20px',
            borderRadius: '20px',
            marginBottom: '20px',
            backgroundColor: '#fff0f5',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '5px',
              background: 'linear-gradient(90deg, #f8c8dc 0%, #f8bbd0 50%, #f8c8dc 100%)',
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: '15px',
              color: '#b04e6f',
              fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <ListAlt fontSize="small" /> Lista de Inventarios
          </Typography>

          <TableContainer
            component={Paper}
            elevation={3}
            sx={{
              borderRadius: '15px',
              overflow: 'hidden',
              border: '1px solid #f8c8dc',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#ffeef3' }}>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Stock Actual</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Precio Venta</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Precio Compra</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventarios.map((inv) => (
                  <TableRow
                    key={inv._id}
                    sx={{ '&:hover': { backgroundColor: '#fff0f5' } }}
                  >
                    <TableCell align="center">{inv.stock}</TableCell>
                    <TableCell align="center">
                      {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
                        typeof inv.precioVenta === 'object'
                          ? parseFloat(inv.precioVenta.$numberDecimal || 0)
                          : parseFloat(inv.precioVenta || 0)
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
                        typeof inv.precioCompra === 'object'
                          ? parseFloat(inv.precioCompra.$numberDecimal || 0)
                          : parseFloat(inv.precioCompra || 0)
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleEditClick(inv)} sx={{ color: '#6c63ff', '&:hover': { backgroundColor: 'rgba(108, 99, 255, 0.1)' } }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => eliminarInventario(inv._id)} sx={{ color: '#e57373', '&:hover': { backgroundColor: 'rgba(229, 115, 115, 0.1)' } }}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleOpenDetailDialog(inv)} sx={{ color: '#9c27b0', '&:hover': { backgroundColor: 'rgba(156, 39, 176, 0.1)' } }}>
                        <Info />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog
          open={openDetailDialog}
          onClose={handleCloseDetailDialog}
          PaperProps={{
            sx: {
              borderRadius: '15px',
              border: '1px solid #f8c8dc',
              boxShadow: '0 8px 24px rgba(248, 200, 220, 0.3)',
              padding: '10px',
            }
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: '#ffeef3',
              color: '#b04e6f',
              fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
              borderBottom: '1px solid #f8c8dc',
            }}
          >
            Detalles del Inventario
          </DialogTitle>
          <DialogContent>
            {selectedInventario && (
              <Box sx={{ p: 2 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong style={{ color: '#b04e6f' }}>ID Inventario:</strong> {selectedInventario._id}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong style={{ color: '#b04e6f' }}>ID Producto:</strong> {selectedInventario.idProducto?._id}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong style={{ color: '#b04e6f' }}>Stock Mínimo:</strong> {selectedInventario.stockMinimo}
                </Typography>
                <Typography variant="body1">
                  <strong style={{ color: '#b04e6f' }}>Stock Máximo:</strong> {selectedInventario.stockMaximo}
                </Typography>
              </Box>
            )}
          </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailDialog} sx={{ borderRadius: '12px', color: '#f48fb1', textTransform: 'none', fontWeight: 'bold', '&:hover': { backgroundColor: 'rgba(244, 143, 177, 0.08)' } }}>
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
};

export default Inventario;