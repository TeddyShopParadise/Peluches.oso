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
  TablePagination
} from '@mui/material';
import { Edit, Delete, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
import useApiRequest from '../../hooks/useApiRequest';

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
  
  const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    return token;
  };
  const token = getAuthToken();

  const fetchMetodosPago = async () => {
    try {
      const response = await fetch(`${apiUrl}/metodoPago`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Agrega el token aquí
        },
      });
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
      headers: {
        'Authorization': `Bearer ${token}`, 
      },  
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
      headers: {
        'Authorization': `Bearer ${token}`, 
      },  
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
      headers: {
        'Authorization': `Bearer ${token}`, 
      },  
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
                maxWidth: '100%',
                padding: '50px',
                borderRadius: '30px',
              }}
            >
              <Container>
                <h1>Métodos de Pago</h1>
                <Box mb={4}>
                  <TextField
                    label="Nombre del Método de Pago"
                    value={nuevoMetodo.nombreMetodoPago}
                    onChange={(e) => setNuevoMetodo({ ...nuevoMetodo, nombreMetodoPago: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    {editarMetodo ? (
                      <Button variant="contained" onClick={actualizarMetodoPago}>
                        Actualizar
                      </Button>
                    ) : (
                      <Button variant="contained" onClick={crearMetodoPago}>
                        Crear
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={resetMetodoPagoForm}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </Box>
                          <div style={{ marginTop: 32 }}>
            <h2 style={{ margin: 0 }}>Lista de Métodos de Pago</h2>

            <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 2,
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fafafa',
              maxWidth: '500px',  
              width: '100%',  
              margin: '0 auto',  
            }}
          >
            <TextField
              label="Buscar por nombre"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                width: '100%', 
                marginRight: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
                '& .MuiInputLabel-root': {
                  color: '#666',
                },
              }}
            />
            <IconButton
              sx={{
                p: 1,
                borderRadius: '50%',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5L20.5 19l-5-5zM10 14a4 4 0 110-8 4 4 0 010 8z" />
              </svg>
            </IconButton>
          </Box>
          </div>
          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort('nombreMetodoPago')}>
                      Nombre del Método de Pago
                      {sortBy === 'nombreMetodoPago' && (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedMetodosPago.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((metodo) => (
                  <TableRow key={metodo._id}>
                    <TableCell>{metodo.nombreMetodoPago}</TableCell>
                    <TableCell>
                      <IconButton color='primary' onClick={() => handleEditClick(metodo)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => eliminarMetodoPago(metodo._id)} sx={{ color: "red", "&:hover": { color: "darkred" } }}>
                        <Delete />
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
            count={filteredMetodosPago.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default MetodoPago;
