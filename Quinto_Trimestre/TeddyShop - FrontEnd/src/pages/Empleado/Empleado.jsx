import React, { useState, useEffect } from 'react';
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
  MenuItem
} from '@mui/material';
import { Edit, Delete, ArrowUpward, ArrowDownward, Info, AddCircle, Save, Cancel, Add, Clear, Search  } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig';
import Swal from 'sweetalert2';
import useApiRequest from '../../hooks/useApiRequest';


const apiUrl = getApiUrl();

const Empleado = () => {
  const [formData, setFormData] = useState({
    dniEmpleado: '',
    telefonoEmpleado: '',
    nombreEmpleado: '',
    compania: '',
  });
  const [empleados, setEmpleados] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [companias, setCompanias] = useState([]);
  const [filteredEmpleados, setFilteredEmpleados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('nombreEmpleado');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchEmpleados();
    fetchCompanias();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await fetch(`${apiUrl}/empleado`);
      if (!response.ok) throw new Error('Error al obtener los empleados');
      const data = await response.json();
      setEmpleados(data);
      setFilteredEmpleados(data);
    } catch (error) {
      console.error(error);
      setSnackbarMessage(error.message);
      setOpenSnackbar(true);
    }
  };

  const fetchCompanias = async () => {
    try {
      const response = await fetch(`${apiUrl}/Compania`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener las compañías');
      }
      const data = await response.json();
      setCompanias(data); 
    } catch (error) {
      console.error(error);
      setSnackbarMessage(error.message);
      setOpenSnackbar(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { makeRequest } = useApiRequest();

  // Crear un nuevo empleado
  const crearEmpleado = async () => {
    const { dniEmpleado, telefonoEmpleado, nombreEmpleado, compania } = formData;
    
    if (!dniEmpleado || !telefonoEmpleado || !nombreEmpleado || !compania) {
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
  
    console.log("Enviando datos:", JSON.stringify(formData));
  
    await makeRequest({
      url: `${apiUrl}/empleado`,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'application/json',
      },
      confirm: {
        title: 'Crear nuevo empleado',
        text: '¿Estás seguro de que deseas crear este empleado?',
        icon: 'question',
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      },
      loading: {
        title: 'Procesando...',
        html: 'Estamos creando el empleado',
        allowOutsideClick: false
      },
      success: {
        icon: 'success',
        title: '¡Empleado creado!',
        text: 'El empleado se ha creado correctamente',
        timer: 2000,
        timerProgressBar: true
      },
      error: {
        icon: 'error',
        title: 'Error al crear empleado',
        text: (error) => error.message || 'Ocurrió un error al crear el empleado',
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
      },
      onSuccess: () => {
        fetchEmpleados();
        resetForm();
      }
    });
  };
  
  const actualizarEmpleado = async () => {
    const { dniEmpleado, telefonoEmpleado, nombreEmpleado, compania } = formData;
    
    if (!editingId || !dniEmpleado || !telefonoEmpleado || !nombreEmpleado || !compania) {
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
  
    await makeRequest({
      url: `${apiUrl}/empleado/${editingId}`,
      method: 'PUT',
      data: formData,
      headers: {
        'Content-Type': 'application/json',
      },
      confirm: {
        title: 'Actualizar empleado',
        text: '¿Estás seguro de que deseas actualizar este empleado?',
        icon: 'question',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      },
      loading: {
        title: 'Procesando...',
        html: 'Estamos actualizando el empleado',
        allowOutsideClick: false
      },
      success: {
        icon: 'success',
        title: '¡Empleado actualizado!',
        text: 'El empleado se ha actualizado correctamente',
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
        fetchEmpleados();
        resetForm();
      }
    });
  };
  
  // Eliminar un empleado
  const eliminarEmpleado = async (id) => {
    await makeRequest({
      url: `${apiUrl}/empleado/${id}`,
      method: 'DELETE',
      confirm: {
        title: 'Eliminar empleado',
        text: '¿Estás seguro de que deseas eliminar este empleado? Esta acción no se puede deshacer.',
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
        html: 'Estamos eliminando el empleado',
        allowOutsideClick: false
      },
      success: {
        icon: 'success',
        title: '¡Empleado eliminado!',
        text: 'El empleado ha sido eliminado correctamente.',
        timer: 2000,
        timerProgressBar: true
      },
      error: {
        icon: 'error',
        title: 'Error al eliminar empleado',
        text: (error) => error.message || 'Ocurrió un error al eliminar el empleado',
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
      },
      onSuccess: fetchEmpleados
    });
  };
  
  const editarEmpleado = (empleado) => {
    setEditingId(empleado._id);
    setFormData({
      dniEmpleado: empleado.dniEmpleado || '',
      telefonoEmpleado: empleado.telefonoEmpleado || '',
      nombreEmpleado: empleado.nombreEmpleado || '',
      compania: empleado.compania || ''
    });
  };

  const verDetalles = (empleado) => {
    setSelectedEmpleado(empleado);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEmpleado(null);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  
    if (term.trim() === '') {
      setFilteredEmpleados(empleados);
    } else {
      const lowerCaseTerm = term.toLowerCase();
  
      const filtered = empleados.filter((empleado) => {
        
        const dni = empleado.dniEmpleado?.toString().toLowerCase() || '';
        return dni.includes(lowerCaseTerm);
      });
  
      setFilteredEmpleados(filtered);
    }
  };
  
  const handleSort = (field) => {
    const newSortOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortBy(field);
    
    const sorted = [...filteredEmpleados].sort((a, b) => {
      if (a[field] < b[field]) return newSortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return newSortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredEmpleados(sorted);
  };
  
  const resetForm = () => {
    setFormData({
      dniEmpleado: '',
      telefonoEmpleado: '',
      nombreEmpleado: '',
      compania: '',
    });
    setEditingId(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage('');
  };

  const paginatedEmpleados = filteredEmpleados.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
              Gestión de Empleados
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
              {editingId ? '✏️ Editar Empleado' : '✨ Nuevo Empleado'}
            </Typography>
  
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="DNI"
                name="dniEmpleado"
                value={formData.dniEmpleado || ''}
                onChange={handleInputChange}
                fullWidth
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
                label="Nombre"
                name="nombreEmpleado"
                value={formData.nombreEmpleado || ''}
                onChange={handleInputChange}
                fullWidth
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
                label="Teléfono"
                name="telefonoEmpleado"
                value={formData.telefonoEmpleado || ''}
                onChange={handleInputChange}
                fullWidth
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
              
              <FormControl fullWidth
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
              >
                <InputLabel>Compañía</InputLabel>
                <Select
                  name="compania"
                  value={formData.compania || ''}
                  onChange={(e) => setFormData({ ...formData, compania: e.target.value })}
                  displayEmpty
                >
                  <MenuItem value="" disabled>Selecciona una Compañía</MenuItem>
                  {companias.map((comp) => (
                    <MenuItem key={comp._id} value={comp._id}>
                      {comp.nombreEmpresa}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
  
              <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                {!editingId ? (
                  <Button
                    variant="contained"
                    onClick={crearEmpleado}
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
                    Crear Empleado
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={actualizarEmpleado}
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
                    Actualizar Empleado
                  </Button>
                )}
                <Button
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
              <Search fontSize="small" /> Lista de Empleados
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
                label="Buscar por DNI"
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
                onClick={() => handleSearchChange({ target: { value: searchTerm } })}
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
            
            {filteredEmpleados.length === 0 && (
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 2, 
                  color: '#b04e6f',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Typography variant="body1">No se encontraron empleados que coincidan con la búsqueda</Typography>
              </Box>
            )}
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
                      onClick={() => handleSort('dniEmpleado')}
                      sx={{ cursor: 'pointer' }}
                    >
                      DNI
                      {sortBy === 'dniEmpleado' && (
                        sortOrder === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      onClick={() => handleSort('nombreEmpleado')}
                      sx={{ cursor: 'pointer' }}
                    >
                      Nombre
                      {sortBy === 'nombreEmpleado' && (
                        sortOrder === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      onClick={() => handleSort('telefonoEmpleado')}
                      sx={{ cursor: 'pointer' }}
                    >
                      Teléfono
                      {sortBy === 'telefonoEmpleado' && (
                        sortOrder === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedEmpleados.map((empleado) => (
                  <TableRow
                    key={empleado._id}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#fff0f5',
                      },
                    }}
                  >
                    <TableCell>{empleado.dniEmpleado}</TableCell>
                    <TableCell>{empleado.nombreEmpleado}</TableCell>
                    <TableCell>{empleado.telefonoEmpleado}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => editarEmpleado(empleado)}
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
                        onClick={() => eliminarEmpleado(empleado._id)}
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
                        onClick={() => verDetalles(empleado)}
                        sx={{
                          color: '#9c27b0',
                          '&:hover': {
                            backgroundColor: 'rgba(156, 39, 176, 0.1)',
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
            count={filteredEmpleados.length}
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
  
          <Dialog 
            open={dialogOpen} 
            onClose={handleCloseDialog}
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
                color: '#b04e6f', 
                fontWeight: 'bold',
                fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
              }}
            >
              Detalles del Empleado
            </DialogTitle>
            <DialogContent>
              {selectedEmpleado && (
                <Box sx={{ color: '#666' }}>
                  <Typography sx={{ mb: 1 }}>
                    <strong style={{color: '#b04e6f'}}>Nombre:</strong> {selectedEmpleado.nombreEmpleado}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong style={{color: '#b04e6f'}}>DNI:</strong> {selectedEmpleado.dniEmpleado}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong style={{color: '#b04e6f'}}>Compañía:</strong> {selectedEmpleado.compania ? selectedEmpleado.compania.nombreEmpresa : 'No disponible'}
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseDialog}
                sx={{
                  borderRadius: '12px',
                  color: '#f48fb1',
                  '&:hover': {
                    backgroundColor: 'rgba(244, 143, 177, 0.08)',
                  },
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
          
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{
                width: '100%',
                backgroundColor: '#f8bbd0',
                color: '#b04e6f',
                fontWeight: 'bold',
                borderRadius: '10px',
              }}  
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </Box>
  );
};

export default Empleado;