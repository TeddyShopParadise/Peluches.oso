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
  Tooltip
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
  Inventory
} from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig';
import useApiRequest from '../../hooks/useApiRequest';
import Swal from 'sweetalert2';

const apiUrl = getApiUrl();

const Devoluciones = () => {
  const [devoluciones, setDevoluciones] = useState([]);
  const [inventarios, setInventarios] = useState([]);
  const [nuevaDevolucion, setNuevaDevolucion] = useState({
    fecha: '',
    items: [{ inventario: '', cantidad: 1 }]
  });
  const [editarDevolucion, setEditarDevolucion] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const { makeRequest } = useApiRequest();
const [sortBy, setSortBy] = useState('fecha'); 

  const fetchData = async () => {
    try {
      const [devolucionesRes, inventariosRes] = await Promise.all([
        fetch(`${apiUrl}/devoluciones`),
        fetch(`${apiUrl}/inventario`)
      ]);
      
      const devolucionesData = await devolucionesRes.json();
      const inventariosData = await inventariosRes.json();
      
      setDevoluciones(devolucionesData);
      setInventarios(inventariosData);
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
    if (!nuevaDevolucion.motivo.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Campo incompleto',
        text: 'Por favor, ingresa el detalle de la devolución',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3085d6'
      });
      return false;
    }

    if (!nuevaDevolucion.fecha) {
      Swal.fire({
        icon: 'error',
        title: 'Campo incompleto',
        text: 'Por favor, selecciona la fecha de devolución',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3085d6'
      });
      return false;
    }

    const itemsValidos = nuevaDevolucion.items.every(item => 
      item.inventario && item.cantidad > 0
    );

    if (!itemsValidos) {
      Swal.fire({
        icon: 'error',
        title: 'Items incompletos',
        text: 'Por favor, completa todos los items de la devolución',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3085d6'
      });
      return false;
    }

    return true;
  };

  const crearDevolucion = async () => {
    if (!validarFormulario()) return;

    await makeRequest({
      url: `${apiUrl}/devoluciones`,
      method: 'POST',
      data: nuevaDevolucion,
      confirm: {
        title: 'Crear nueva devolución',
        text: '¿Estás seguro de que deseas crear esta devolución?',
        icon: 'question',
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'Cancelar'
      },
      loading: {
        title: 'Procesando...',
        html: 'Estamos creando la devolución'
      },
      success: {
        title: '¡Devolución creada!',
        text: 'La devolución se ha creado correctamente',
        timer: 2000,
        timerProgressBar: true
      },
      error: {
        title: 'Error',
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
      },
      onSuccess: (newDevolucion) => {
        setDevoluciones([...devoluciones, newDevolucion]);
        resetDevolucionForm();
      }
    });
  };

  const actualizarDevolucion = async () => {
    if (!editarDevolucion || !validarFormulario()) return;

    await makeRequest({
      url: `${apiUrl}/devoluciones/${editarDevolucion._id}`,
      method: 'PUT',
      data: nuevaDevolucion,
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
      }
    });
  };

  const resetDevolucionForm = () => {
    setNuevaDevolucion({
      fecha: '',
      items: [{ inventario: '', cantidad: 1 }]
    });
    setEditarDevolucion(null);
  };

  const handleEditClick = (devolucion) => {
    setEditarDevolucion(devolucion);
    setNuevaDevolucion({
      fecha: devolucion.fecha?.split('T')[0] || '',
      items: devolucion.items.map(item => ({
        inventario: item.inventario._id || item.inventario,
        cantidad: item.cantidad
      }))
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...nuevaDevolucion.items];
    newItems[index][field] = value;
    setNuevaDevolucion({ ...nuevaDevolucion, items: newItems });
  };

  const addItem = () => {
    setNuevaDevolucion({
      ...nuevaDevolucion,
      items: [...nuevaDevolucion.items, { inventario: '', cantidad: 1 }]
    });
  };

  const removeItem = (index) => {
    if (nuevaDevolucion.items.length > 1) {
      const newItems = nuevaDevolucion.items.filter((_, i) => i !== index);
      setNuevaDevolucion({ ...nuevaDevolucion, items: newItems });
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

  const getInventarioName = (inventarioId) => {
    const inventario = inventarios.find(inv => inv._id === inventarioId);
    return inventario ? inventario.nombre : 'Producto no encontrado';
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
              🔄 Gestión de Devoluciones
            </Typography>
          </Box>

          <Paper
            elevation={3}
            sx={{
              padding: '20px',
              borderRadius: '20px',
              backgroundColor: '#fff5f7',
              marginBottom: '30px',
              border: '1px solid #f8c8dc',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: '15px',
                color: '#b04e6f',
                fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
              }}
            >
              {editarDevolucion ? '✏️ Editar Devolución' : '✨ Nueva Devolución'}
            </Typography>
    

            <TextField
              label="Fecha de Devolución"
              type="date"
              value={nuevaDevolucion.fecha}
              onChange={(e) =>
                setNuevaDevolucion({ ...nuevaDevolucion, fecha: e.target.value })
              }
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
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

            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  color: '#b04e6f',
                  fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Inventory /> Items a Devolver
              </Typography>

              {nuevaDevolucion.items.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    mb: 2,
                    p: 2,
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    border: '1px solid #f8c8dc',
                  }}
                >
                  <FormControl
                    sx={{
                      flex: 2,
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
                  >
                    <InputLabel>Producto</InputLabel>
                    <Select
                      value={item.inventario}
                      onChange={(e) => handleItemChange(index, 'inventario', e.target.value)}
                      label="Producto"
                    >
                      {inventarios.map((inventario) => (
                        <MenuItem key={inventario._id} value={inventario._id}>
                          {inventario.stock}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Cantidad"
                    type="number"
                    value={item.cantidad}
                    onChange={(e) => handleItemChange(index, 'cantidad', parseInt(e.target.value) || 1)}
                    sx={{
                      flex: 1,
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
                    inputProps={{ min: 1 }}
                  />

                  <IconButton
                    onClick={() => removeItem(index)}
                    disabled={nuevaDevolucion.items.length === 1}
                    sx={{
                      color: '#e57373',
                      '&:hover': {
                        backgroundColor: 'rgba(229, 115, 115, 0.1)',
                      },
                      '&:disabled': {
                        color: '#ccc',
                      },
                    }}
                  >
                    <Remove />
                  </IconButton>
                </Box>
              ))}

              <Button
                onClick={addItem}
                startIcon={<AddCircle />}
                sx={{
                  color: '#f48fb1',
                  '&:hover': {
                    backgroundColor: 'rgba(244, 143, 177, 0.08)',
                  },
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                Agregar Item
              </Button>
            </Box>

            <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
              {editarDevolucion ? (
                <Button
                  variant="contained"
                  onClick={actualizarDevolucion}
                  startIcon={<Edit />}
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
                  Actualizar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={crearDevolucion}
                  startIcon={<Add />}
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
                  Crear
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={resetDevolucionForm}
                startIcon={<Clear />}
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
            </Box>
          </Paper>

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
              <Search fontSize="small" /> Lista de Devoluciones
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 2,
                padding: '8px 16px',
                borderRadius: '15px',
                border: '1px solid #f8c8dc',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                backgroundColor: 'white',
                maxWidth: '500px',
                width: '100%',
                margin: '0 auto',
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
                          {devolucion.items && devolucion.items.map((item, index) => (
                            <Chip
                              key={index}
                              label={`${getInventarioName(item.inventario._id || item.inventario)} (${item.cantidad})`}
                              size="small"
                              sx={{
                                backgroundColor: '#fce4ec',
                                color: '#b04e6f',
                                fontSize: '0.75rem',
                              }}
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Editar devolución">
                          <IconButton
                            onClick={() => handleEditClick(devolucion)}
                            sx={{
                              color: '#6c63ff',
                              '&:hover': {
                                backgroundColor: 'rgba(108, 99, 255, 0.1)',
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
    </Box>
  );
};

export default Devoluciones;