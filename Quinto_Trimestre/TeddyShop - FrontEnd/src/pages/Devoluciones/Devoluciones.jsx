
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
  Box,
  TablePagination,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Card,
  CardContent,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Edit,
  Delete,
  ArrowUpward,
  ArrowDownward,
  Add,
  Clear,
  Search,
  Remove,
  AddCircle,
  AssignmentReturn,
  Inventory,
  Visibility,
  Close,
  Info,
  Save,
  Cancel
} from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig';
import useApiRequest from '../../hooks/useApiRequest';
import Swal from 'sweetalert2';

const apiUrl = getApiUrl();

const Devoluciones = () => {
  const [devoluciones, setDevoluciones] = useState([]);
  const [inventarios, setInventarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedInventario, setSelectedInventario] = useState(null);
  
  const [formData, setFormData] = useState({
    fecha: '',
    motivo: '',
    items: [{ inventario: '', cantidad: 1 }]
  });
  
  const [editarDevolucion, setEditarDevolucion] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('fecha');
  const [openDetalles, setOpenDetalles] = useState(false);
  const [devolucionSeleccionada, setDevolucionSeleccionada] = useState(null);
  const { makeRequest } = useApiRequest();
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchData = async () => {
    try {
      const [devolucionesRes, inventariosRes, productosRes] = await Promise.all([
        fetch(`${apiUrl}/devoluciones`),
        fetch(`${apiUrl}/inventario`),
        fetch(`${apiUrl}/producto`)
      ]);
      
      const devolucionesData = await devolucionesRes.json();
      const inventariosData = await inventariosRes.json();
      const productosData = await productosRes.json();
      
      setDevoluciones(devolucionesData);
      setInventarios(inventariosData);
      setProductos(productosData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validarFormulario = () => {
    if (!formData.motivo?.trim()) {
      setError('El motivo de la devolución es requerido');
      return false;
    }

    if (!formData.fecha) {
      setError('La fecha de devolución es requerida');
      return false;
    }

    const itemsValidos = formData.items.every(item => 
      item.inventario && item.cantidad > 0
    );

    if (!itemsValidos) {
      setError('Todos los items deben tener un inventario seleccionado y cantidad mayor a 0');
      return false;
    }

    return true;
  };
  
  const actualizarDevolucion = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
    if (!editarDevolucion || !validarFormulario()) return;

    await makeRequest({
      url: `${apiUrl}/devoluciones/${editarDevolucion._id}`,
      method: 'PUT',
      data: formData,
      confirm: {
        title: 'Actualizar devolución',
        text: '¿Estás seguro de que deseas actualizar esta devolución?',
        icon: 'question',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar'
      },
      loading: {
        title: 'Procesando...',
        html: 'Estamos actualizando la devolución'
      },
      success: {
        title: '¡Devolución actualizada!',
        text: 'Devolución actualizada con éxito',
        timer: 2000,
        timerProgressBar: true
      },
      error: {
        title: 'Error',
        text: (error) => `Error al actualizar la devolución: ${error.message}`,
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
      },
      onSuccess: (updatedDevolucion) => {
        setDevoluciones(devoluciones.map((dev) =>
          dev._id === updatedDevolucion._id ? updatedDevolucion : dev
        ));
        resetDevolucionForm();
        setSuccessMessage('Devolución actualizada exitosamente!');
      }
    });
  };

  const eliminarDevolucion = async (id) => {
    await makeRequest({
      url: `${apiUrl}/devoluciones/${id}`,
      method: 'DELETE',
      confirm: {
        title: 'Eliminar devolución',
        text: '¿Estás seguro de que deseas eliminar esta devolución? Esta acción no se puede deshacer',
        icon: 'warning',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        backdrop: `
          rgba(0,0,0,0.7)
          url("/images/warning.gif")
          center top
          no-repeat
        `
      },
      loading: {
        title: 'Eliminando...',
        html: 'Estamos eliminando la devolución'
      },
      success: {
        title: '¡Devolución eliminada!',
        text: 'Devolución eliminada con éxito',
        timer: 2000,
        timerProgressBar: true
      },
      error: {
        title: 'Error',
        text: 'Error al eliminar la devolución',
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
      },
      onSuccess: () => {
        setDevoluciones(prevDevoluciones => 
          prevDevoluciones.filter(dev => dev._id !== id)
        );
        setSuccessMessage('Devolución eliminada exitosamente!');
      }
    });
  };

  const resetDevolucionForm = () => {
    setFormData({
      fecha: '',
      motivo: '',
      items: [{ inventario: '', cantidad: 1 }]
    });
    setEditarDevolucion(null);
    setIsEditing(false);
    setShowForm(false);
    setError('');
  };

 const handleEditClick = (devolucion) => {
  setEditarDevolucion(devolucion);
  setFormData({
    fecha: devolucion.fecha?.split('T')[0] || '',
    motivo: devolucion.motivo || '',
    items: devolucion.items.map(item => ({
      inventario: item.inventario._id || item.inventario,
      cantidad: item.cantidad
    })),
    pedido: devolucion.pedido._id || devolucion.pedido 
  });
  setIsEditing(true);
  setShowForm(true);
  setError('');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Limpiar error cuando el usuario empiece a escribir
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData(prev => ({ ...prev, items: newItems }));
    setError(''); // Limpiar error cuando el usuario haga cambios
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { inventario: '', cantidad: 1 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, items: newItems }));
    }
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

  const getEstiloProductoFromInventarioId = (inventarioId) => {
    const inv = inventarios.find(i => i._id === inventarioId);
    if (!inv) return 'Inventario no encontrado';

    const prodId = typeof inv.idProducto === 'object' 
      ? inv.idProducto._id 
      : inv.idProducto;

    const prod = productos.find(p => p._id === prodId);
    return prod?.estiloProducto ?? 'Sin estilo';
  };

  const getInventarioDetails = (inventarioId) => {
    const inv = inventarios.find(i => i._id === inventarioId);
    if (!inv) return null;

    const prodId = typeof inv.idProducto === 'object' 
      ? inv.idProducto._id 
      : inv.idProducto;
    const prod = productos.find(p => p._id === prodId);

    return {
      inventario: inv,
      producto: prod || null,
      estiloProducto: prod?.estiloProducto ?? 'No especificado'
    };
  };

  const handleDetallesClick = (devolucion) => {
    setDevolucionSeleccionada(devolucion);
    setOpenDetalles(true);
  };

  const handleCloseDetalles = () => {
    setOpenDetalles(false);
    setDevolucionSeleccionada(null);
  };

  const filteredDevoluciones = devoluciones.filter((devolucion) =>
    devolucion?.motivo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDevoluciones = [...filteredDevoluciones].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Box className="BoxInicial">
        <Box className="Box"
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
              🔄 Gestión de Devoluciones
            </Typography>
          </Box>

          {successMessage && (
            <Alert 
              severity="success" 
              sx={{ 
                mt: 2, 
                mb: 3,
                borderRadius: '10px',
                backgroundColor: '#e8f5e9',
                color: '#2e7d32',
                border: '1px solid #a5d6a7',
                '& .MuiAlert-icon': {
                  color: '#2e7d32'
                }
              }}
              onClose={() => setSuccessMessage('')}
            >
              {successMessage}
            </Alert>
          )}
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mt: 2, 
                mb: 3,
                borderRadius: '10px',
                backgroundColor: '#ffebee',
                color: '#c62828',
                border: '1px solid #ef9a9a',
                '& .MuiAlert-icon': {
                  color: '#c62828'
                }
              }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          {showForm && isEditing && (
            <Paper
              elevation={3}
              sx={{
                padding: '25px',
                borderRadius: '20px',
                marginBottom: '25px',
                backgroundColor: '#fff0f5',
                border: '1px solid #f8c8dc',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  marginBottom: '20px',
                  color: '#b04e6f',
                  fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Edit fontSize="small" />
                Editar Devolución
              </Typography>

              <form onSubmit={actualizarDevolucion}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Fecha de Devolución"
                      type="date"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleChange}
                      required
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '&.Mui-focused fieldset': {
                            borderColor: '#f48fb1',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          '&.Mui-focused': {
                            color: '#f48fb1',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Motivo de la Devolución"
                      name="motivo"
                      value={formData.motivo}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '&.Mui-focused fieldset': {
                            borderColor: '#f48fb1',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          '&.Mui-focused': {
                            color: '#f48fb1',
                          },
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#b04e6f' }}>
                      Items Devueltos
                    </Typography>
                    
                    {formData.items.map((item, index) => (
                      <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
                        <Grid item xs={7} sm={5}>
                          <FormControl fullWidth>
                            <InputLabel>Inventario</InputLabel>
                            <Select
                              value={item.inventario}
                              onChange={(e) => handleItemChange(index, 'inventario', e.target.value)}
                              label="Inventario"
                              required
                              sx={{ borderRadius: '12px' }}
                            >
                              {inventarios.map(inv => (
                                <MenuItem key={inv._id} value={inv._id}>
                                  {getEstiloProductoFromInventarioId(inv._id)}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        
                        <Grid item xs={3} sm={2}>
                          <TextField
                            fullWidth
                            label="Cantidad"
                            type="number"
                            value={item.cantidad}
                            onChange={(e) => handleItemChange(index, 'cantidad', parseInt(e.target.value) || 1)}
                            required
                            inputProps={{ min: 1 }}
                            sx={{ borderRadius: '12px' }}
                          />
                        </Grid>
                        
                        <Grid item xs={2} sm={1}>
                          <IconButton 
                            onClick={() => removeItem(index)}
                            disabled={formData.items.length <= 1}
                            sx={{ 
                              color: '#ff4081',
                              '&:hover': { backgroundColor: 'rgba(255, 64, 129, 0.1)' }
                            }}
                          >
                            <Remove />
                          </IconButton>
                        </Grid>
                        
                        {index === formData.items.length - 1 && (
                          <Grid item xs={12} sm={4}>
                            <Button
                              variant="outlined"
                              startIcon={<AddCircle />}
                              onClick={addItem}
                              type="button"
                              sx={{
                                borderRadius: '12px',
                                borderColor: '#f48fb1',
                                color: '#f48fb1',
                                '&:hover': {
                                  backgroundColor: 'rgba(244, 143, 177, 0.08)',
                                  borderColor: '#ec7096',
                                }
                              }}
                            >
                              Agregar Item
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                  <Button
                    type="button"
                    onClick={resetDevolucionForm}
                    sx={{
                      borderRadius: '12px',
                      color: '#666',
                      border: '1px solid #ddd',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 3,
                    }}
                    startIcon={<Cancel />}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#f48fb1',
                      '&:hover': {
                        backgroundColor: '#ec7096',
                      },
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 3,
                      boxShadow: '0 4px 12px rgba(244, 143, 177, 0.3)',
                    }}
                    startIcon={<Save />}
                  >
                    Actualizar Devolución
                  </Button>
                </Box>
              </form>
            </Paper>
          )}

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  color: '#b04e6f',
                  fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Search fontSize="small" /> Lista de Devoluciones
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: 2,
                padding: '8px 16px',
                borderRadius: '15px',
                border: '1px solid #f8c8dc',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                backgroundColor: 'white',
                maxWidth: '500px',
                width: '100%',
              }}
            >
              <TextField
                label="Buscar devolución"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                  width: '100%',
                  marginRight: 2,
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
              <IconButton
                sx={{
                  p: 1,
                  borderRadius: '50%',
                  backgroundColor: '#f48fb1',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#ec7096',
                  },
                  boxShadow: '0 2px 5px rgba(244, 143, 177, 0.3)',
                }}
              >
                <Search />
              </IconButton>
            </Box>
          </Paper>

          <TableContainer
            component={Paper}
            elevation={3}
            sx={{
              marginTop: 3,
              borderRadius: '15px',
              overflow: 'hidden',
              border: '1px solid #f8c8dc',
              overflowX: 'auto',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#ffeef3' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      onClick={() => handleSort('motivo')}
                      sx={{ cursor: 'pointer' }}
                    >
                      Detalle
                      {sortBy === 'motivo' &&
                        (sortOrder === 'asc' ? (
                          <ArrowUpward fontSize="small" />
                        ) : (
                          <ArrowDownward fontSize="small" />
                        ))}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      onClick={() => handleSort('fecha')}
                      sx={{ cursor: 'pointer' }}
                    >
                      Fecha
                      {sortBy === 'fecha' &&
                        (sortOrder === 'asc' ? (
                          <ArrowUpward fontSize="small" />
                        ) : (
                          <ArrowDownward fontSize="small" />
                        ))}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Items</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedDevoluciones
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((devolucion) => (
                    <TableRow
                      key={devolucion._id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#fff0f5',
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ maxWidth: 200 }}>
                          {devolucion.motivo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {new Date(devolucion.fecha).toLocaleDateString('es-ES')}
                      </TableCell>
                     <TableCell>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {devolucion.items.map((item, idx) => {
                        const invId = typeof item.inventario === 'string' 
                          ? item.inventario 
                          : item.inventario._id;

                        const estilo = getEstiloProductoFromInventarioId(invId);
                            
                          return (
                          <Chip
                            key={idx}
                            label={`${estilo} (${item.cantidad})`}
                            size="small"
                            sx={{
                              backgroundColor: '#fce4ec',
                              color: '#b04e6f',
                              fontSize: '0.75rem',
                            }}
                          />
                        );
                      })}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Ver detalles de la devolución">
                          <IconButton
                            onClick={() => handleDetallesClick(devolucion)}
                            sx={{
                              color: '#9c27b0',
                              '&:hover': {
                                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                              },
                            }}
                          >
                            <Info />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar devolución">
                          <IconButton
                            onClick={() => handleEditClick(devolucion)}
                            sx={{
                              color: '#6c63ff',
                              '&:hover': {
                              backgroundColor: 'rgba(76, 175, 80, 0.1)',
                              },
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar devolución">
                          <IconButton
                            onClick={() => eliminarDevolucion(devolucion._id)}
                            sx={{
                              color: '#e57373',
                              '&:hover': {
                                backgroundColor: 'rgba(229, 115, 115, 0.1)',
                              },
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={sortedDevoluciones.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
            }
            sx={{
              '& .MuiTablePagination-toolbar': {
                color: '#b04e6f',
              },
              '& .MuiTablePagination-selectIcon': {
                color: '#b04e6f',
              },
            }}
          />
        </Container>
      </Box>

      <Dialog
        open={openDetalles}
        onClose={handleCloseDetalles}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '20px',
            overflow: 'hidden',
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#ffeef3',
            color: '#b04e6f',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Inventory />
            Detalles del Inventario - Devolución
          </Box>
          <IconButton
            onClick={handleCloseDetalles}
            sx={{
              color: '#b04e6f',
              '&:hover': {
                backgroundColor: 'rgba(176, 78, 111, 0.1)',
              },
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ padding: '24px' }}>
          {devolucionSeleccionada && (
            <Box>
              <Typography
                variant="h6"
                sx={{
                  marginBottom: '16px',
                  color: '#b04e6f',
                  fontWeight: 'bold',
                }}
              >
                Información de la Devolución
              </Typography>
              
              <Box sx={{ marginBottom: '20px' }}>
                <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                  <strong>Motivo:</strong> {devolucionSeleccionada.motivo}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                  <strong>Fecha:</strong> {new Date(devolucionSeleccionada.fecha).toLocaleDateString('es-ES')}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                  <strong>ID Devolución:</strong> {devolucionSeleccionada._id}
                </Typography>
              </Box>

              <Divider sx={{ margin: '20px 0' }} />

              <Typography
                variant="h6"
                sx={{
                  marginBottom: '16px',
                  color: '#b04e6f',
                  fontWeight: 'bold',
                }}
              >
                Items Devueltos
              </Typography>

              <List>
                {devolucionSeleccionada.items?.map((item, index) => {
                  const inventarioId = typeof item.inventario === 'string' 
                    ? item.inventario 
                    : item.inventario._id;
                  
                  const estiloProducto = getEstiloProductoFromInventarioId(inventarioId);
                  
                  return (
                    <React.Fragment key={index}>
                      <ListItem
                        sx={{
                          backgroundColor: '#fff0f5',
                          borderRadius: '10px',
                          marginBottom: '12px',
                          padding: '16px',
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box>
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  fontWeight: 'bold',
                                  color: '#b04e6f',
                                  marginBottom: '8px',
                                }}
                              >
                                Item #{index + 1}
                              </Typography>
                              
                              <Box sx={{ marginLeft: '16px' }}>
                                <Typography variant="body2" sx={{ marginBottom: '4px' }}>
                                  <strong>Estilo del Producto:</strong> {estiloProducto}
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: '4px' }}>
                                  <strong>Cantidad Devuelta:</strong> {item.cantidad}
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: '4px' }}>
                                  <strong>ID del Inventario:</strong> {inventarioId}
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < devolucionSeleccionada.items.length - 1 && (
                        <Divider sx={{ margin: '8px 0' }} />
                      )}
                    </React.Fragment>
                  );
                })}
              </List>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ padding: '20px 24px', backgroundColor: '#fafafa' }}>
          <Button
            onClick={handleCloseDetalles}
            variant="contained"
            sx={{
              backgroundColor: '#b04e6f',
              color: 'white',
              borderRadius: '10px',
              padding: '8px 24px',
              '&:hover': {
                backgroundColor: '#9c3d5a',
              },
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};


export default Devoluciones;