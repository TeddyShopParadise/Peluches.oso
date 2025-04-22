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
import { Edit, Delete, ListAlt, ArrowUpward, ArrowDownward, Info, AddCircle, Save, Cancel, Add, Clear, Search  } from '@mui/icons-material';
import '../PagesStyle.css';
import Swal from 'sweetalert2';
import { getApiUrl } from '../../utils/apiConfig'
import useApiRequest from '../../hooks/useApiRequest';
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

  /*const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    return token;
  };*/
  

const HistorialPrecios = () => {
  const [historialPrecios, setHistorialPrecios] = useState([]);
  const [nuevoHistorial, setNuevoHistorial] = useState({
    precio: '',
    fechaInicio: '',
    fechaFin: '',
    estadoPrecio: true
  });
  const [editingId, setEditingId] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedHistorial, setSelectedHistorial] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  // Obtener historial de precios
  const fetchHistorialPrecios = async () => {
    try {
      //const token = getAuthToken();
      const response = await fetch(`${apiUrl}/historialPrecio`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          //'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      setHistorialPrecios(data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchHistorialPrecios();
  }, []);


const { makeRequest } = useApiRequest();
// Crear nuevo historial de precio
const crearHistorialPrecio = async (e) => {
  e.preventDefault();

  const { precio, fechaInicio, fechaFin } = nuevoHistorial;

  if (!precio || !fechaInicio || !fechaFin) {
    await Swal.fire({
      icon: 'error',
      title: 'Campos incompletos',
      text: 'Por favor, completa todos los campos requeridos.',
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
    url: `${apiUrl}/historialPrecio`,
    method: 'POST',
    data: nuevoHistorial,
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,
    },
    confirm: {
      title: 'Crear nuevo historial',
      text: '¿Estás seguro de que deseas crear este historial de precio?',
      icon: 'question',
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    },
    loading: {
      title: 'Procesando...',
      html: 'Estamos creando el historial de precio',
      allowOutsideClick: false
    },
    success: {
      icon: 'success',
      title: '¡Historial creado!',
      text: 'El historial de precio se ha creado correctamente.',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      icon: 'error',
      title: 'Error al crear historial',
      text: (error) => error.message || 'Ocurrió un error al conectar con el servidor.',
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: () => {
      fetchHistorialPrecios();
      resetForm();
      setNuevoHistorial({ precio: '', fechaInicio: '', fechaFin: '', estadoPrecio: true });
    }
  });
};

// Actualizar historial de precio
const actualizarHistorialPrecio = async (e) => {
  e.preventDefault();

  const { precio, fechaInicio, fechaFin } = nuevoHistorial;

  if (!editingId || !precio || !fechaInicio || !fechaFin) {
    await Swal.fire({
      icon: 'error',
      title: 'Campos incompletos',
      text: 'Por favor, completa todos los campos requeridos.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#3085d6',
      backdrop: `
        rgba(0,0,0,0.7)
        url("/images/empty-field.gif")
        center top
        no-repeat
      `,
      background: '#f8f9fa'
    });
    return;
  }

  const data = {
    precio: parseFloat(nuevoHistorial.precio),
    fechaInicio: nuevoHistorial.fechaInicio,
    fechaFin: nuevoHistorial.fechaFin,
    estadoPrecio: nuevoHistorial.estadoPrecio,
  };

  await makeRequest({
    url: `${apiUrl}/historialPrecio/${editingId}`,
    method: 'PUT',
    data: data,
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,
    },
    confirm: {
      title: 'Actualizar historial',
      text: '¿Estás seguro de que deseas actualizar este historial de precio?',
      icon: 'question',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    },
    loading: {
      title: 'Procesando...',
      html: 'Estamos actualizando el historial de precio',
      allowOutsideClick: false
    },
    success: {
      icon: 'success',
      title: '¡Historial actualizado!',
      text: 'El historial de precio se ha actualizado correctamente.',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    },
    error: {
      icon: 'error',
      title: 'Error en la actualización',
      html: (error) => `<div style="text-align:left;">
             <p>${error.message}</p>
             <small>Si el problema persiste, contacte al administrador</small>
           </div>`,
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: () => {
      fetchHistorialPrecios();
      resetForm();
      setNuevoHistorial({ precio: '', fechaInicio: '', fechaFin: '', estadoPrecio: true });
      setEditingId(null);
    }
  });
};

// Eliminar historial de precio
const eliminarHistorialPrecio = async (id) => {
  await makeRequest({
    url: `${apiUrl}/historialPrecio/${id}`,
    method: 'DELETE',
    // headers: { 'Authorization': `Bearer ${token}` },
    confirm: {
      title: 'Eliminar historial',
      text: '¿Estás seguro de que deseas eliminar este historial? Esta acción no se puede deshacer.',
      icon: 'warning',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      backdrop: `
        rgba(0,0,0,0.7)
        url("/images/warning.gif")
        center top
        no-repeat
      `
    },
    loading: {
      title: 'Eliminando...',
      html: 'Estamos eliminando el historial de precio',
      allowOutsideClick: false
    },
    success: {
      icon: 'success',
      title: '¡Historial eliminado!',
      text: 'El historial ha sido eliminado correctamente.',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      icon: 'error',
      title: 'Error al eliminar historial',
      text: (error) => error.message || 'Hubo un problema al eliminar el historial.',
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: fetchHistorialPrecios
  });
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoHistorial((prev) => ({ ...prev, [name]: value }));
  };

  const iniciarEdicion = (historial) => {
    setNuevoHistorial(historial);
    setEditingId(historial._id);
  };

  const resetForm = () => {
   
    setNuevoHistorial({ precio: '', fechaInicio: '', fechaFin: '', estadoPrecio: true });
    setEditingId(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDetails = (historial) => {
    setSelectedHistorial(historial);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetails = () => {
    setOpenDetailsDialog(false);
    setSelectedHistorial(null);
  };

  return (
    <Box className="BoxInicial">
      <Box className="Box"
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
              Historial de Precios
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
              {editingId ? '✏️ Editar Historial' : '✨ Nuevo Historial'}
            </Typography>
  
            <form onSubmit={editingId ? actualizarHistorialPrecio : crearHistorialPrecio} noValidate autoComplete="off">
              <TextField
                type="number"
                name="precio"
                label="Precio"
                value={nuevoHistorial.precio}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
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
  
              <TextField
                type="date"
                name="fechaInicio"
                label="Fecha de Inicio"
                value={nuevoHistorial.fechaInicio}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
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
  
              <TextField
                type="date"
                name="fechaFin"
                label="Fecha de Fin"
                value={nuevoHistorial.fechaFin}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
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
  
              <FormControlLabel
                control={
                  <Checkbox
                    name="estadoPrecio"
                    checked={nuevoHistorial.estadoPrecio}
                    onChange={(e) => setNuevoHistorial({ ...nuevoHistorial, estadoPrecio: e.target.checked })}
                    sx={{
                      color: '#f48fb1',
                      '&.Mui-checked': {
                        color: '#f48fb1',
                      },
                    }}
                  />
                }
                label="Estado Precio"
                sx={{
                  '& .MuiTypography-root': { 
                    fontSize: '1rem',
                    color: '#b04e6f',
                  },
                }}
              />
              
              <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={editingId ? <Edit /> : <Add />}
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
                  {editingId ? 'Actualizar' : 'Crear'}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={resetForm}
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
            </form>
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
              <ListAlt fontSize="small" /> Lista de Historial de Precios
            </Typography>
  
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{
                borderRadius: '15px',
                overflow: 'hidden',
                border: '1px solid #f8c8dc',
                overflowX: 'auto',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#ffeef3' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Fecha Inicio</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Fecha Fin</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historialPrecios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((historial) => (
                    <TableRow
                      key={historial._id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#fff0f5',
                        },
                      }}
                    >
                      <TableCell>
                        {new Intl.NumberFormat('es-CO', { 
                          style: 'currency', 
                          currency: 'COP' 
                        }).format(historial.precio)}
                      </TableCell>
                      <TableCell>
                        {new Date(historial.fechaInicio).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(historial.fechaFin).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={historial.estadoPrecio ? 'Activo' : 'Inactivo'} 
                          sx={{
                            backgroundColor: historial.estadoPrecio ? '#e8f5e9' : '#ffebee',
                            color: historial.estadoPrecio ? '#2e7d32' : '#c62828',
                            fontWeight: 'bold'
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => iniciarEdicion(historial)}
                          sx={{
                            color: '#4caf50',
                            '&:hover': {
                              backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            },
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => eliminarHistorialPrecio(historial._id)}
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
                          onClick={() => handleOpenDetails(historial)}
                          sx={{
                            color: '#6c63ff',
                            '&:hover': {
                              backgroundColor: 'rgba(108, 99, 255, 0.1)',
                            },
                          }}
                        >
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
              count={historialPrecios.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                color: '#b04e6f',
                '& .MuiTablePagination-selectIcon': {
                  color: '#f48fb1',
                },
              }}
            />
          </Paper>
  
          {selectedHistorial && (
            <Dialog
              open={openDetailsDialog}
              onClose={handleCloseDetails}
              PaperProps={{
                sx: {
                  borderRadius: '20px',
                  backgroundColor: '#fff5f7',
                  border: '1px solid #f8c8dc',
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
                Detalles del Historial
              </DialogTitle>
              <DialogContent>
                <Box sx={{ p: 2 }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong style={{color: '#b04e6f'}}>Precio:</strong> {new Intl.NumberFormat('es-CO', { 
                      style: 'currency', 
                      currency: 'COP' 
                    }).format(selectedHistorial.precio)}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong style={{color: '#b04e6f'}}>Fecha Inicio:</strong> {new Date(selectedHistorial.fechaInicio).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong style={{color: '#b04e6f'}}>Fecha Fin:</strong> {new Date(selectedHistorial.fechaFin).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    <strong style={{color: '#b04e6f'}}>Estado:</strong> 
                    <Chip 
                      label={selectedHistorial.estadoPrecio ? 'Activo' : 'Inactivo'} 
                      sx={{
                        ml: 1,
                        backgroundColor: selectedHistorial.estadoPrecio ? '#e8f5e9' : '#ffebee',
                        color: selectedHistorial.estadoPrecio ? '#2e7d32' : '#c62828',
                        fontWeight: 'bold'
                      }}
                    />
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions
                sx={{
                  backgroundColor: '#ffeef3',
                  borderTop: '1px solid #f8c8dc',
                }}
              >
                <Button
                  onClick={handleCloseDetails}
                  sx={{
                    color: '#f48fb1',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: 'rgba(244, 143, 177, 0.1)',
                    },
                  }}
                >
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default HistorialPrecios ;
