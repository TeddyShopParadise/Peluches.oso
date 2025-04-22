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
    MenuItem
  } from '@mui/material';
  import sortBy from 'lodash/sortBy';
  import { Edit, Delete, ListAlt, ArrowUpward, ArrowDownward, Info, AddCircle, Save, Cancel, Add, Clear, Search  } from '@mui/icons-material';
  import '../PagesStyle.css';
  import Swal from 'sweetalert2';
  import { getApiUrl } from '../../utils/apiConfig'
  import useApiRequest from '../../hooks/useApiRequest';
  const apiUrl = getApiUrl();
  console.log("Url almacenada: ",apiUrl);

  const Compania = () => {
    const [companias, setCompanias] = useState([]);
    const [NIT, setNIT] = useState('');
    const [telefonoEmpresa, setTelefonoEmpresa] = useState('');
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [direccionEmpresa, setDireccionEmpresa] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [sortedBy, setSortedBy] = useState('nombreEmpresa');
    const [sortOrder, setSortOrder] = useState('asc');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCompania, setSelectedCompania] = useState(null);
    const { makeRequest } = useApiRequest();
    

    /*const getAuthToken = () => {
      const token = localStorage.getItem('authToken');
      return token;
    };
  */

    const fetchCompanias = async () => {
      try {
        //const token = getAuthToken();
        const response = await fetch(`${apiUrl}/Compania`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
             //'Authorization': `Bearer ${token}`, 
          },
        });
    
        if (!response.ok) {
          throw new Error('Error al obtener las compañías');
        }
    
        const data = await response.json();
        setCompanias(data);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };

    const sortCompanias = (field) => {
      const order = sortedBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
      setSortedBy(field);
      setSortOrder(order);

      const sortedData = [...companias].sort((a, b) => {
        if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
        return 0;
      });
      setCompanias(sortedData);
    };

    // Crear nueva compañía
    const crearCompania = async () => {
      if (!NIT || !telefonoEmpresa || !nombreEmpresa || !direccionEmpresa) {
        await Swal.fire({
          icon: 'error',
          title: 'Campos incompletos',
          text: 'Por favor, completa todos los campos obligatorios.',
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
    
      const companiaData = { NIT, telefonoEmpresa, nombreEmpresa, direccionEmpresa };
    
      await makeRequest({
        url: `${apiUrl}/compania`,
        method: 'POST',
        data: companiaData,
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Token comentado por ahora
        },
        confirm: {
          title: 'Crear nueva compañía',
          text: '¿Estás seguro de que deseas crear esta compañía?',
          icon: 'question',
          confirmButtonText: 'Sí, crear',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        },
        loading: {
          title: 'Procesando...',
          html: 'Estamos creando la compañía',
          allowOutsideClick: false
        },
        success: {
          icon: 'success',
          title: '¡Compañía creada!',
          text: 'La compañía se ha creado correctamente',
          timer: 2000,
          timerProgressBar: true
        },
        error: {
          icon: 'error',
          title: 'Error al crear compañía',
          text: (error) => error.message || 'Ocurrió un error al crear la compañía',
          footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
        },
        onSuccess: () => {
          fetchCompanias();
          resetForm();
        }
      });
    };
    
    const actualizarCompania = async () => {
      if (!editingId || !NIT || !telefonoEmpresa || !nombreEmpresa || !direccionEmpresa) {
        await Swal.fire({
          icon: 'error',
          title: 'Campos incompletos',
          text: 'Por favor, completa todos los campos obligatorios.',
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
    
      const companiaData = { NIT, telefonoEmpresa, nombreEmpresa, direccionEmpresa };
    
      await makeRequest({
        url: `${apiUrl}/compania/${editingId}`,
        method: 'PUT',
        data: companiaData,
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Token comentado por ahora
        },
        confirm: {
          title: 'Actualizar compañía',
          text: '¿Estás seguro de que deseas actualizar esta compañía?',
          icon: 'question',
          confirmButtonText: 'Sí, actualizar',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        },
        loading: {
          title: 'Procesando...',
          html: 'Estamos actualizando la compañía',
          allowOutsideClick: false
        },
        success: {
          icon: 'success',
          title: '¡Compañía actualizada!',
          text: 'La compañía se ha actualizado correctamente',
          timer: 2000,
          timerProgressBar: true
        },
        error: {
          icon: 'error',
          title: 'Error al actualizar compañía',
          text: (error) => error.message || 'Ocurrió un error al actualizar la compañía',
          footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
        },
        onSuccess: () => {
          fetchCompanias();
          resetForm();
        }
      });
    };
    
    const eliminarCompania = async (id) => {
      await makeRequest({
        url: `${apiUrl}/compania/${id}`,
        method: 'DELETE',
        headers: {
          // 'Authorization': `Bearer ${token}`, // Token comentado por ahora
        },
        confirm: {
          title: 'Eliminar compañía',
          text: '¿Estás seguro de que deseas eliminar esta compañía? Esta acción no se puede deshacer',
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
          html: 'Estamos eliminando la compañía',
          allowOutsideClick: false
        },
        success: {
          icon: 'success',
          title: '¡Compañía eliminada!',
          text: 'La compañía se ha eliminado correctamente',
          timer: 2000,
          timerProgressBar: true
        },
        error: {
          icon: 'error',
          title: 'Error al eliminar compañía',
          text: (error) => error.message || 'Ocurrió un problema al eliminar la compañía',
          footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
        },
        onSuccess: fetchCompanias
      });
    };

    const editarCompania = (compania) => {
      setEditingId(compania._id);
      setNIT(compania.NIT);
      setTelefonoEmpresa(compania.telefonoEmpresa);
      setNombreEmpresa(compania.nombreEmpresa);
      setDireccionEmpresa(compania.direccionEmpresa);
    };

    const verDetalles = (compania) => {
      setSelectedCompania(compania);
      setDialogOpen(true);
    };

    const handleCloseDialog = () => {
      setDialogOpen(false);
      setSelectedCompania(null);
    };

    const resetForm = () => {
      setNIT('');
      setTelefonoEmpresa('');
      setNombreEmpresa('');
      setDireccionEmpresa('');
      setEditingId(null);
    };

    useEffect(() => {
      fetchCompanias();
    }, []);

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
                Gestión de Compañías
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
                {editingId ? '✏️ Editar Compañía' : '✨ Nueva Compañía'}
              </Typography>
    
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editingId ? actualizarCompania() : crearCompania();
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  type="number"
                  label="NIT"
                  value={NIT}
                  onChange={(e) => setNIT(e.target.value)}
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
                      fontSize: '1rem',
                      '&.Mui-focused': {
                        color: '#f48fb1',
                      },
                    },
                    '& .MuiInputBase-input': { fontSize: '1rem' },
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                      '-webkit-appearance': 'none',
                      margin: 0
                    },
                    '& input[type=number]': {
                      '-moz-appearance': 'textfield'
                    }
                  }}
                />
    
                <TextField
                  type="text"
                  label="Teléfono de la Empresa"
                  value={telefonoEmpresa}
                  onChange={(e) => setTelefonoEmpresa(e.target.value)}
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
                      fontSize: '1rem',
                      '&.Mui-focused': {
                        color: '#f48fb1',
                      },
                    },
                    '& .MuiInputBase-input': { fontSize: '1rem' },
                  }}
                />
    
                <TextField
                  type="text"
                  label="Nombre de la Empresa"
                  value={nombreEmpresa}
                  onChange={(e) => setNombreEmpresa(e.target.value)}
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
                      fontSize: '1rem',
                      '&.Mui-focused': {
                        color: '#f48fb1',
                      },
                    },
                    '& .MuiInputBase-input': { fontSize: '1rem' },
                  }}
                />
    
                <TextField
                  type="text"
                  label="Dirección de la Empresa"
                  value={direccionEmpresa}
                  onChange={(e) => setDireccionEmpresa(e.target.value)}
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
                      fontSize: '1rem',
                      '&.Mui-focused': {
                        color: '#f48fb1',
                      },
                    },
                    '& .MuiInputBase-input': { fontSize: '1rem' },
                  }}
                />
    
                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                  {editingId ? (
                    <Button
                      variant="contained"
                      onClick={actualizarCompania}
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
                      onClick={crearCompania}
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
                <ListAlt fontSize="small" /> Lista de Compañías
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
                      <TableCell sx={{ fontWeight: 'bold' }}>NIT</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                          onClick={() => sortCompanias('nombreEmpresa')}
                          sx={{ cursor: 'pointer' }}
                        >
                          Nombre
                          {sortBy === 'nombreEmpresa' &&
                            (sortOrder === 'asc' ? (
                              <ArrowUpward fontSize="small" />
                            ) : (
                              <ArrowDownward fontSize="small" />
                            ))}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {companias.map((comp) => (
                      <TableRow
                        key={comp._id}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#fff0f5',
                          },
                        }}
                      >
                        <TableCell>{comp.NIT}</TableCell>
                        <TableCell>{comp.nombreEmpresa}</TableCell>
                        <TableCell>{comp.direccionEmpresa}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => verDetalles(comp)}
                            sx={{
                              color: '#6c63ff',
                              '&:hover': {
                                backgroundColor: 'rgba(108, 99, 255, 0.1)',
                              },
                            }}
                          >
                            <Info />
                          </IconButton>
                          <IconButton
                            onClick={() => editarCompania(comp)}
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
                            onClick={() => eliminarCompania(comp._id)}
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
            </Paper>
    
            {selectedCompania && (
              <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
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
                  Detalles de la Compañía
                </DialogTitle>
                <DialogContent>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>NIT:</strong> {selectedCompania.NIT}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>Nombre:</strong> {selectedCompania.nombreEmpresa}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>Dirección:</strong> {selectedCompania.direccionEmpresa}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Teléfono:</strong> {selectedCompania.telefonoEmpresa}
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
                    onClick={handleCloseDialog}
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

  export default Compania;
