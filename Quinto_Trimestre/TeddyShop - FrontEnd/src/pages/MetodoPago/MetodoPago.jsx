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
  Tooltip,
  Chip
} from '@mui/material';
  
import { Edit, Delete, ArrowUpward, ArrowDownward, Info, AddCircle, Save, Cancel, Add, Clear, Search, SentimentDissatisfied   } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
import useApiRequest from '../../hooks/useApiRequest';
import Swal from 'sweetalert2';


const apiUrl = getApiUrl();

const MetodoPago = () => {
  const [metodosPago, setMetodosPago] = useState([]);
  const [nuevoMetodo, setNuevoMetodo] = useState({ nombreMetodoPago: '' });
  const [editarMetodo, setEditarMetodo] = useState(null);
  const [selectedMetodo, setSelectedMetodo] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('nombreMetodoPago');
  const [sortOrder, setSortOrder] = useState('asc');
  const { makeRequest } = useApiRequest();
  

  const fetchMetodosPago = async () => {
    try {
      const response = await fetch(`${apiUrl}/metodoPago`);
      const data = await response.json();
      setMetodosPago(data);
    } catch (error) {
      console.error('Error fetching métodos de pago:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetodosPago();
  }, []);

  const crearMetodoPago = async () => {
    if (!nuevoMetodo.nombreMetodoPago) {
      await Swal.fire({
        icon: 'error',
        title: 'Campo incompleto',
        text: 'Por favor, ingresa el nombre del método de pago',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3085d6',
        backdrop: `
          rgba(0,0,0,0.7)
          url("/images/empty-field.gif")
          center top
          no-repeat
        `
      });
      return;
    }
  
    await makeRequest({
      url: `${apiUrl}/metodoPago`,
      method: 'POST',
      data: nuevoMetodo,
      confirm: {
        title: 'Crear nuevo método de pago',
        text: '¿Estás seguro de que deseas crear este método de pago?',
        icon: 'question',
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'Cancelar'
      },
      loading: {
        title: 'Procesando...',
        html: 'Estamos creando el método de pago'
      },
      success: {
        title: '¡Método creado!',
        text: 'El método de pago se ha creado correctamente',
        timer: 2000,
        timerProgressBar: true
      },
      error: {
        title: 'Error',
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
      },
      onSuccess: (newMetodo) => {
        setMetodosPago([...metodosPago, newMetodo]);
        setNuevoMetodo({ nombreMetodoPago: '' });
      }
    });
  };
  
  const actualizarMetodoPago = async () => {
    if (!editarMetodo) return;
  
    const metodoActualizar = {
      nombreMetodoPago: nuevoMetodo.nombreMetodoPago
    };
  
    await makeRequest({
      url: `${apiUrl}/metodoPago/${editarMetodo._id}`,
      method: 'PUT',
      data: metodoActualizar,
      confirm: {
        title: 'Actualizar método de pago',
        text: '¿Estás seguro de que deseas actualizar este método de pago?',
        icon: 'question',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar'
      },
      loading: {
        title: 'Procesando...',
        html: 'Estamos actualizando el método de pago'
      },
      success: {
        title: '¡Método actualizado!',
        text: 'Método de pago actualizado con éxito',
        timer: 2000,
        timerProgressBar: true
      },
      error: {
        title: 'Error',
        text: (error) => `Error al actualizar el método de pago: ${error.message}`,
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
      },
      onSuccess: (updatedMetodo) => {
        setMetodosPago(metodosPago.map((metodo) =>
          metodo._id === updatedMetodo._id ? updatedMetodo : metodo
        ));
        setEditarMetodo(null);
        setNuevoMetodo({ nombreMetodoPago: '' });
      }
    });
  };
  
  const eliminarMetodoPago = async (id) => {
    await makeRequest({
      url: `${apiUrl}/metodoPago/${id}`,
      method: 'DELETE',
      confirm: {
        title: 'Eliminar método de pago',
        text: '¿Estás seguro de que deseas eliminar este método de pago? Esta acción no se puede deshacer',
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
        html: 'Estamos eliminando el método de pago'
      },
      success: {
        title: '¡Método eliminado!',
        text: 'Método de pago eliminado con éxito',
        timer: 2000,
        timerProgressBar: true
      },
      error: {
        title: 'Error',
        text: 'Error al eliminar el método de pago',
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
      },
      onSuccess: () => {
        setMetodosPago(prevMetodos => prevMetodos.filter(metodo => metodo._id !== id));
      }
    });
  };

  const resetMetodoPagoForm = () => {
    setNuevoMetodo({ nombreMetodoPago: '' });
    setEditarMetodo(null);
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

  const handleEditClick = (metodo) => {
    setEditarMetodo(metodo);
    setNuevoMetodo({ nombreMetodoPago: metodo.nombreMetodoPago });
  };


  if (loading) {
    return <div>Cargando...</div>;
  }

  const filteredMetodosPago = metodosPago.filter((metodo) =>
    metodo.nombreMetodoPago && metodo.nombreMetodoPago.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMetodosPago = [...filteredMetodosPago].sort((a, b) => {
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
             Métodos de Pago para Tus Peluches
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
            {editarMetodo ? '✏️ Editar Método de Pago' : '✨ Nuevo Método de Pago'}
          </Typography>
  
          <TextField
            label="Nombre del Método de Pago"
            value={nuevoMetodo.nombreMetodoPago}
            onChange={(e) =>
              setNuevoMetodo({ ...nuevoMetodo, nombreMetodoPago: e.target.value })
            }
            fullWidth
            margin="normal"
            variant="outlined"
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
  
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            {editarMetodo ? (
              <Button
                variant="contained"
                onClick={actualizarMetodoPago}
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
                onClick={crearMetodoPago}
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
              onClick={resetMetodoPagoForm}
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
            <Search fontSize="small" /> Lista de Métodos de Pago
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
              label="Buscar método de pago"
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
                    onClick={() => handleSort('nombreMetodoPago')}
                    sx={{ cursor: 'pointer' }}
                  >
                    Nombre del Método de Pago
                    {sortBy === 'nombreMetodoPago' &&
                      (sortOrder === 'asc' ? (
                        <ArrowUpward fontSize="small" />
                      ) : (
                        <ArrowDownward fontSize="small" />
                      ))}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedMetodosPago
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((metodo) => (
                  <TableRow
                    key={metodo._id}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#fff0f5',
                      },
                    }}
                  >
                    <TableCell>{metodo.nombreMetodoPago}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleEditClick(metodo)}
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
                        onClick={() => eliminarMetodoPago(metodo._id)}
                        sx={{
                          color: '#e57373',
                          '&:hover': {
                            backgroundColor: 'rgba(229, 115, 115, 0.1)',
                          },
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
    </Box>
  );
};

export default MetodoPago;
