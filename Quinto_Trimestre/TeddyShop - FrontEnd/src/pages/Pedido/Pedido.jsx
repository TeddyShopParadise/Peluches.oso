import React, { useEffect, useState } from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingBag from '@mui/icons-material/ShoppingBag';

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
  Checkbox,
  Divider,
} from '@mui/material';

import sortBy from 'lodash/sortBy';
import { Edit ,Delete, CheckCircle , HourglassBottom,ListAlt, ArrowUpward, ArrowDownward, Info, AddCircle, Save, Cancel, Add, Clear, Search  } from '@mui/icons-material';
import '../PagesStyle.css';
import Swal from 'sweetalert2';
import { getApiUrl } from '../../utils/apiConfig'
import FacturaPDF from '../Factura/FacturaPDF';
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const Pedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [nuevoPedido, setNuevoPedido] = useState({
    nombreComprador: '',
    numeroComprador: '',
    nombreAgendador: '',
    numeroAgendador: '',
    localidad: '',
    direccion: '',
    barrio: '',
    cliente: '',
    detallesPedido: [],
    facturas: []
  });
  const [pedidoEdicion, setPedidoEdicion] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [page, setPage] = useState(0);
  const [detalles, setDetalles] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('nombreComprador');
  const [sortOrder, setSortOrder] = useState('asc');
  const [facturaDialogOpen, setFacturaDialogOpen] = useState(false);
  const [facturaGenerada, setFacturaGenerada] = useState(null);
  const [compania, setCompania] = useState([]);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);
  

  
  useEffect(() => {
    fetchPedidos();
    fetchCompania(); 
    fetchDetalles();

  }, []);


  const fetchCompania = async () => {
    try {
      const response = await fetch(`${apiUrl}/compania`);
      const data = await response.json();
      setCompania(data[0] || {});
    } catch (error) {
      console.error('Error obteniendo datos de compañía:', error);
    }
  };



  const fetchPedidos = async () => {
    try {
      const response = await fetch(`${apiUrl}/pedido`);
      if (!response.ok) throw new Error('Error al obtener los pedidos');
      const data = await response.json();
      setPedidos(data); 
    } catch (error) {
      console.error('Error fetching pedidos:', error);
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  };
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


  const crearPedido = async () => {
    try {
      const response = await fetch(`${apiUrl}/pedido`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPedido),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const newPedido = await response.json();
      setPedidos([...pedidos, newPedido]);
      setSnackbarMessage('Pedido creado con éxito');
      setOpenSnackbar(true);
      setNuevoPedido({
        nombreComprador: '',
        numeroComprador: '',
        nombreAgendador: '',
        numeroAgendador: '',
        localidad: '',
        direccion: '',
        barrio: '',
        cliente: '',
        detallesPedido: [],
        facturas: [],
      });
      
    } catch (error) {
      console.error('Error creando pedido:', error);
      setSnackbarMessage('Error al crear el pedido: ' + error.message);
      setOpenSnackbar(true);
    }
  };

  const actualizarPedido = async () => {
  if (!pedidoEdicion) return;

  const { _id, ...pedidoActualizar } = pedidoEdicion;
  console.log("Datos enviados para actualizar:", pedidoActualizar); // Debug

  try {
    const response = await fetch(`${apiUrl}/pedido/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedidoActualizar),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error de validación en el servidor:", errorData);
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const updatedPedido = await response.json();
    setPedidos(
      pedidos.map((pedido) =>
        pedido._id === updatedPedido._id ? updatedPedido : pedido
      )
    );
    setSnackbarMessage('Pedido actualizado con éxito');
    setOpenSnackbar(true);
    setPedidoEdicion(null);
  } catch (error) {
    console.error('Error actualizando el pedido:', error);
    setSnackbarMessage('Error al actualizar el pedido: ' + error.message);
    setOpenSnackbar(true);
  }
};

  const eliminarPedido = async () => {
    if (!currentId) return;

    try {
      await fetch(`${apiUrl}/pedido/${currentId}`, {
        method: 'DELETE',
      });
      setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido._id !== currentId));
      setSnackbarMessage('Pedido eliminado con éxito');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error eliminando el pedido:', error);
      setSnackbarMessage('Error al eliminar el pedido');
      setOpenSnackbar(true);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoPedido((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortBy(field);
  };

  const handleEditClick = (pedido) => {
    setPedidoEdicion(pedido);
  };

  const handleDetailClick = (pedido) => {
    setSelectedPedido(pedido);
    setOpenDetailDialog(true);
  };

  
  const handleEstadoChange = async (pedidoId, nuevoEstado) => {
    try {
      const response = await fetch(`${apiUrl}/pedido/estado/${pedidoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el estado');
      }
  
      const actualizado = await response.json();
      setPedidos(prev =>
        prev.map(p => (p._id === pedidoId ? actualizado : p))
      );
      setSnackbarMessage('Estado actualizado con éxito');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      setSnackbarMessage('Error al actualizar el estado: ' + error.message);
      setOpenSnackbar(true);
    }
  };
  

  if (loading) {
    return <div>Cargando...</div>;
  }

  const filteredPedidos = pedidos.filter((pedido) =>
    pedido.nombreComprador && pedido.nombreComprador.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPedidos = [...filteredPedidos].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  
  const handleGenerarFactura = async (pedidoId) => {
    try {
      const pedidoSeleccionado = pedidos.find(p => p._id === pedidoId);
  
      if (pedidoSeleccionado.estado !== 'realizado') {
        setSnackbarMessage('Solo puedes generar factura para pedidos realizados');
        setOpenSnackbar(true);
        return;
      }
  
      setSelectedPedido(pedidoSeleccionado);
  
      const response = await fetch(`${apiUrl}/factura/generar/${pedidoId}`, {
        method: 'POST'
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al generar factura");
      }
  
      const facturaData = await response.json();
      console.log('🧾 Factura data recibida:', facturaData);
      
      // Verificar estructura de datos
      if (facturaData.detallesFactura && facturaData.detallesFactura.length > 0) {
        console.log('🧾 Primer detalle de factura:', facturaData.detallesFactura[0]);
        console.log('🧾 Producto en primer detalle:', facturaData.detallesFactura[0].idProducto);
      }
  
      setFacturaGenerada(facturaData);
      setFacturaDialogOpen(true);
  
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage(error.message);
      setOpenSnackbar(true);
    }
  };
  
  const detallesFiltrados = detalles.filter(
    (detalle) => detalle.idPedido?._id === selectedPedido?._id
  );
  
  return (
    <Box className="BoxInicial">
      <Box
        className="Box"
        sx={{
          width: '90%',
          maxWidth: '900px',
          padding: '30px',
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
              Gestión de Pedidos
            </Typography>
          </Box>
          
          {/* Dashboard Section */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'center',
              mb: 4,
            }}
          >
            {/* Pedidos Totales */}
            <Paper
              elevation={2}
              sx={{
                borderRadius: '18px',
                padding: '20px',
                width: '220px',
                backgroundColor: '#fff0f5',
                border: '1px solid #f8c8dc',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(90deg, #fce4ec 0%, #f8c8dc 50%, #fce4ec 100%)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#b04e6f',
                      fontWeight: 'bold',
                    }}
                  >
                    Pedidos Totales
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#b04e6f',
                      fontWeight: 'bold',
                      mt: 1,
                    }}
                  >
                    {sortedPedidos.length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: 'rgba(244, 143, 177, 0.15)',
                    borderRadius: '12px',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShoppingBag sx={{ color: '#f48fb1', fontSize: '28px' }} />
                </Box>
              </Box>
            </Paper>
  
            {/* Pedidos Realizados */}
            <Paper
              elevation={2}
              sx={{
                borderRadius: '18px',
                padding: '20px',
                width: '220px',
                backgroundColor: '#f0f8ff',
                border: '1px solid #bbdefb',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(90deg, #bbdefb 0%, #90caf9 50%, #bbdefb 100%)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#1976d2',
                      fontWeight: 'bold',
                    }}
                  >
                    Realizados
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#1976d2',
                      fontWeight: 'bold',
                      mt: 1,
                    }}
                  >
                    {sortedPedidos.filter(p => p.estado === 'realizado').length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    borderRadius: '12px',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircle sx={{ color: '#1976d2', fontSize: '28px' }} />
                </Box>
              </Box>
            </Paper>
  
            {/* Pedidos En Proceso */}
            <Paper
              elevation={2}
              sx={{
                borderRadius: '18px',
                padding: '20px',
                width: '220px',
                backgroundColor: '#fffde7',
                border: '1px solid #fff59d',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(90deg, #fff59d 0%, #ffee58 50%, #fff59d 100%)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#f57f17',
                      fontWeight: 'bold',
                    }}
                  >
                    En Proceso
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#f57f17',
                      fontWeight: 'bold',
                      mt: 1,
                    }}
                  >
                    {sortedPedidos.filter(p => p.estado === 'en_proceso').length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: 'rgba(245, 127, 23, 0.1)',
                    borderRadius: '12px',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <HourglassBottom sx={{ color: '#f57f17', fontSize: '28px' }} />
                </Box>
              </Box>
            </Paper>
  
            {/* Pedidos Cancelados */}
            <Paper
              elevation={2}
              sx={{
                borderRadius: '18px',
                padding: '20px',
                width: '220px',
                backgroundColor: '#ffebee',
                border: '1px solid #ffcdd2',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(90deg, #ffcdd2 0%, #ef9a9a 50%, #ffcdd2 100%)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#c62828',
                      fontWeight: 'bold',
                    }}
                  >
                    Cancelados
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#c62828',
                      fontWeight: 'bold',
                      mt: 1,
                    }}
                  >
                    {sortedPedidos.filter(p => p.estado === 'pendiente').length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: 'rgba(198, 40, 40, 0.1)',
                    borderRadius: '12px',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Cancel sx={{ color: '#c62828', fontSize: '28px' }} />
                </Box>
              </Box>
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
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography
                variant="h6"
                sx={{
                  color: '#b04e6f',
                  fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                }}
              >
                Lista de Pedidos
              </Typography>
              <TextField
                label="Buscar por nombre"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                  width: 250,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&.Mui-focused fieldset': {
                      borderColor: '#f48fb1',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#666',
                    '&.Mui-focused': {
                      color: '#f48fb1',
                    },
                  },
                }}
              />
            </Box>
    
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{
                marginTop: 2,
                borderRadius: '15px',
                overflow: 'hidden',
                border: '1px solid #f8c8dc',
                overflowX: 'auto',
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#ffeef3' }}>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        onClick={() => handleSort('nombreComprador')}
                        sx={{ cursor: 'pointer' }}
                      >
                        Nombre del Comprador
                        {sortBy === 'nombreComprador' &&
                          (sortOrder === 'asc' ? (
                            <ArrowUpward fontSize="small" />
                          ) : (
                            <ArrowDownward fontSize="small" />
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        onClick={() => handleSort('tamañoOso')}
                        sx={{ cursor: 'pointer' }}
                      >
                        Tamaño del Oso
                        {sortBy === 'tamañoOso' &&
                          (sortOrder === 'asc' ? (
                            <ArrowUpward fontSize="small" />
                          ) : (
                            <ArrowDownward fontSize="small" />
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        onClick={() => handleSort('estado')}
                        sx={{ cursor: 'pointer' }}
                      >
                        Estado
                        {sortBy === 'estado' &&
                          (sortOrder === 'asc' ? (
                            <ArrowUpward fontSize="small" />
                          ) : (
                            <ArrowDownward fontSize="small" />
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedPedidos
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((pedido) => (
                      <TableRow
                        key={pedido._id}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#fff0f5',
                          },
                        }}
                      >
                        <TableCell>{pedido.nombreComprador}</TableCell>
                        <TableCell>
                          {pedido.detallesPedido.map(detalle => (
                            <div key={detalle._id}>
                              {detalle.idProducto?.tamañoProducto}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell>
                          <FormControl fullWidth size="small" sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '&.Mui-focused fieldset': {
                                borderColor: '#f48fb1',
                              },
                            }
                          }}>
                            <Select
                              value={pedido.estado || 'en_proceso'}
                              onChange={(e) => handleEstadoChange(pedido._id, e.target.value)}
                            >
                              <MenuItem value="pendiente">Cancelado</MenuItem>
                              <MenuItem value="en_proceso">En proceso</MenuItem>
                              <MenuItem value="realizado">Realizado</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleEditClick(pedido)}
                            sx={{
                              color: '#6c63ff',
                              '&:hover': {
                                backgroundColor: 'rgba(108, 99, 255, 0.1)',
                              },
                            }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setCurrentId(pedido._id);
                              setOpenDeleteDialog(true);
                            }}
                            sx={{
                              color: '#e57373',
                              '&:hover': {
                                backgroundColor: 'rgba(229, 115, 115, 0.1)',
                              },
                            }}
                          >
                            <Delete />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDetailClick(pedido)}
                            sx={{
                              color: '#42a5f5',
                              '&:hover': {
                                backgroundColor: 'rgba(66, 165, 245, 0.1)',
                              },
                            }}
                          >
                            <Info />
                          </IconButton>
                          <Button 
                            variant="contained"
                            disabled={pedido.estado !== 'realizado'}
                            onClick={() => handleGenerarFactura(pedido._id)}
                            startIcon={<ReceiptLongIcon />}
                            sx={{
                              ml: 1,
                              textTransform: 'none',
                              borderRadius: '12px',
                              backgroundColor: '#f48fb1',
                              '&:hover': {
                                backgroundColor: '#ec7096',
                              },
                              fontWeight: 'bold',
                              boxShadow: '0 4px 8px rgba(244, 143, 177, 0.3)',
                              '&:disabled': { 
                                backgroundColor: '#e0e0e0',
                                color: '#9e9e9e'
                              }
                            }}
                          >
                            Generar Factura
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
    
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sortedPedidos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
    
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
            <Alert onClose={() => setOpenSnackbar(false)} severity="success">
              {snackbarMessage}
            </Alert>
          </Snackbar>
    
          <Dialog 
            open={openDeleteDialog} 
            onClose={() => setOpenDeleteDialog(false)}
            PaperProps={{
              sx: {
                borderRadius: '15px',
                border: '1px solid #f8c8dc',
                boxShadow: '0 4px 20px rgba(244, 143, 177, 0.15)',
              }
            }}
          >
            <DialogTitle sx={{ 
              color: '#b04e6f',
              fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
            }}>
              Eliminar Pedido
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas eliminar este pedido?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => setOpenDeleteDialog(false)} 
                sx={{
                  borderRadius: '12px',
                  borderColor: '#f48fb1',
                  color: '#f48fb1',
                  '&:hover': {
                    borderColor: '#ec7096',
                    backgroundColor: 'rgba(244, 143, 177, 0.08)',
                  },
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                Cancelar
              </Button>
              <Button 
                onClick={eliminarPedido} 
                variant="contained"
                sx={{
                  borderRadius: '12px',
                  backgroundColor: '#f48fb1',
                  '&:hover': {
                    backgroundColor: '#ec7096',
                  },
                  textTransform: 'none',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 8px rgba(244, 143, 177, 0.3)',
                }}
              >
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>
    
          <Dialog 
            open={openDetailDialog} 
            onClose={() => setOpenDetailDialog(false)}
            PaperProps={{
              sx: {
                borderRadius: '15px',
                border: '1px solid #f8c8dc',
                boxShadow: '0 4px 20px rgba(244, 143, 177, 0.15)',
                padding: '10px',
              }
            }}
          >
            <DialogTitle sx={{ 
              color: '#b04e6f',
              fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
            }}>
              Detalles de Pedidos
            </DialogTitle>
            <DialogContent>
              {selectedPedido && (
                <Paper elevation={0} sx={{ 
                  padding: '15px', 
                  backgroundColor: '#fff5f7',  
                  borderRadius: '12px',
                  border: '1px solid #f8c8dc',
                }}>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Nombre del Comprador:</strong> {selectedPedido.nombreComprador}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Numero del Comprador:</strong> {selectedPedido.numeroComprador}</Typography>
                  <Divider sx={{ my: 2, backgroundColor: '#f8c8dc' }} />
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Nombre del Agendador:</strong> {selectedPedido.nombreAgendador}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Numero del Agendador:</strong> {selectedPedido.numeroAgendador}</Typography>
                  <Divider sx={{ my: 2, backgroundColor: '#f8c8dc' }} />
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Localidad:</strong> {selectedPedido.localidad}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Dirección:</strong> {selectedPedido.direccion}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Barrio:</strong> {selectedPedido.barrio}</Typography>
                </Paper>
              )}
            <Divider sx={{ my: 2, backgroundColor: '#f8c8dc' }} />
<Typography 
  variant="h6" 
  sx={{ 
    color: '#b04e6f',
    fontFamily: '"Baloo 2", cursive',
    mb: 1
  }}
>
  Productos del Pedido:
</Typography>

<Table size="small" sx={{ backgroundColor: '#fff0f4', borderRadius: '10px', overflow: 'hidden' }}>
  <TableHead>
    <TableRow sx={{ backgroundColor: '#ffe4ec' }}>
      <TableCell><strong>Producto</strong></TableCell>
      <TableCell><strong>Cantidad</strong></TableCell>
      <TableCell><strong> Precio</strong></TableCell>
      <TableCell><strong>Pedido</strong></TableCell>
    </TableRow>
  </TableHead>
  
  <TableBody>
  {detalles
    .filter((detalle) => detalle.idPedido?._id === selectedPedido?._id)
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((detalle) => (
      <TableRow key={detalle._id}>
        <TableCell>{detalle.idProducto?.tamañoProducto || 'Producto eliminado'}</TableCell>
        <TableCell>{detalle.cantidadDetallePedido}</TableCell>
        <TableCell>${detalle.precioDetallePedido.toFixed(2)}</TableCell>
        <TableCell>{detalle.idPedido?._id || 'Sin pedido'}</TableCell>
      </TableRow>
  ))}
</TableBody>
</Table>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => setOpenDetailDialog(false)}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: '#f48fb1',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#ec7096',
                  },
                  textTransform: 'none',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 8px rgba(244, 143, 177, 0.3)',
                }}
              >
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
          
          {facturaGenerada && selectedPedido && (
            <FacturaPDF 
              factura={facturaGenerada}
              pedido={selectedPedido} 
              compania={compania}
              open={facturaDialogOpen}
              onClose={() => setFacturaDialogOpen(false)}
            />
          )}
        </Container>
      </Box>
    </Box>
  );
};
  
  export default Pedido;