import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Swal from 'sweetalert2';
import { Edit, Delete, Info } from '@mui/icons-material';
import { getApiUrl } from '../../utils/apiConfig';
import useApiRequest from '../../hooks/useApiRequest';
import '../PagesStyle.css';

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

  const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    return token;
  };
  const token = getAuthToken();

  const fetchInventarios = async () => {
    try {
      const response = await fetch(`${apiUrl}/inventario`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
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
      'Authorization': `Bearer ${token}`,
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
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
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

  return (
    <Box className="BoxInicial">
      <Box className="Box" sx={{ width: '90%', maxWidth: '100%', padding: { xs: '20px', md: '50px' }, borderRadius: '30px' }}>
        <Container>
          <h1>Inventario</h1>
          <h2>Lista de Inventarios</h2>
          
          <Box mt={2}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Stock Actual</TableCell>
                    <TableCell align="center">Precio Venta</TableCell>
                    <TableCell align="center">Precio Compra</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                {inventarios.map((inventario) => (
                  <TableRow key={inventario._id}>
                    <TableCell align="center">{inventario.stock}</TableCell>
                   <TableCell align="center">
                    {new Intl.NumberFormat('es-CO', { 
                    style: 'currency', 
                    currency: 'COP' 
                    }).format(
                    typeof inventario.precioVenta === 'object' 
                      ? parseFloat(inventario.precioVenta.$numberDecimal || 0)
                      : parseFloat(inventario.precioVenta || 0)
                    )}
                    </TableCell>
                    <TableCell align="center">
                    {new Intl.NumberFormat('es-CO', { 
                    style: 'currency', 
                    currency: 'COP' 
                    }).format(
                    typeof inventario.precioCompra === 'object' 
                      ? parseFloat(inventario.precioCompra.$numberDecimal || 0)
                      : parseFloat(inventario.precioCompra || 0)
                    )}
                    </TableCell>
                    <TableCell align="center">
                        <IconButton onClick={() => handleEditClick(inventario)}
                           color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => eliminarInventario(inventario._id)}
                          sx={{ color: "red", "&:hover": { color: "darkred" } }}>
                          <Delete />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDetailDialog(inventario)}
                           color="info">
                          <Info />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

                  <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Editar Inventario</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Stock Actual"
                type="number"
                fullWidth
                margin="normal"
                value={inventarioData.stock || ''}
                onChange={(e) => setInventarioData({
                  ...inventarioData,
                  stock: e.target.value === '' ? null : Math.max(0, parseInt(e.target.value))
                })}
                InputProps={{
                  inputProps: { 
                    min: 0,
                    placeholder: 'Ej: 100'
                  },
                  sx: {
                    '& input::placeholder': {
                      color: 'rgba(0, 0, 0, 0.38)',
                      opacity: 1
                    }
                  }
                }}
              />
              <TextField
                label="Stock Mínimo"
                type="number"
                fullWidth
                margin="normal"
                value={inventarioData.stockMinimo || ''}
                onChange={(e) => setInventarioData({
                  ...inventarioData,
                  stockMinimo: e.target.value === '' ? null : Math.max(0, parseInt(e.target.value))
                })}
                InputProps={{
                  inputProps: { 
                    min: 0,
                    placeholder: 'Ej: 10'
                  },
                  sx: {
                    '& input::placeholder': {
                      color: 'rgba(0, 0, 0, 0.38)',
                      opacity: 1
                    }
                  }
                }}
              />
              <TextField
                label="Stock Máximo"
                type="number"
                fullWidth
                margin="normal"
                value={inventarioData.stockMaximo || ''}
                onChange={(e) => setInventarioData({
                  ...inventarioData,
                  stockMaximo: e.target.value === '' ? null : Math.max(0, parseInt(e.target.value))
                })}
                InputProps={{
                  inputProps: { 
                    min: 0,
                    placeholder: 'Ej: 200'
                  },
                  sx: {
                    '& input::placeholder': {
                      color: 'rgba(0, 0, 0, 0.38)',
                      opacity: 1
                    }
                  }
                }}
              />
             <TextField
            label="Precio de Venta"
            type="number"
            fullWidth
            margin="normal"
            value={inventarioData.precioVenta}
            onChange={(e) => setInventarioData({
              ...inventarioData,
              precioVenta: e.target.value
            })}
            InputProps={{
              inputProps: { 
                min: 0, 
                step: "0.01",
                placeholder: 'Ej: 19.99'
              }
            }}
          />

          <TextField
            label="Precio de Compra"
            type="number"
            fullWidth
            margin="normal"
            value={inventarioData.precioCompra}
            onChange={(e) => setInventarioData({
              ...inventarioData,
              precioCompra: e.target.value
            })}
            InputProps={{
              inputProps: { 
                min: 0, 
                step: "0.01",
                placeholder: 'Ej: 15.50'
              }
            }}
          />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="secondary">
              Cancelar
            </Button>
            <Button 
              onClick={actualizarInventario}
              variant="contained" 
              color="primary"
            >
              Actualizar Inventario
            </Button>
          </DialogActions>
        </Dialog>

          <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog}>
            <DialogTitle>Detalles del Inventario</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <strong>ID Inventario:</strong> {selectedInventario?._id}<br />
                <strong>ID Producto:</strong> {selectedInventario?.idProducto?._id }<br />
                <strong>Stock Mínimo:</strong> {selectedInventario?.stockMinimo}<br />
                <strong>Stock Máximo:</strong> {selectedInventario?.stockMaximo}<br />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailDialog} color="primary">
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