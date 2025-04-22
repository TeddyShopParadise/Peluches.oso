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
import Swal from 'sweetalert2';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig';
import useApiRequest from '../../hooks/useApiRequest';


const apiUrl = getApiUrl();
console.log("Url almacenada: ", apiUrl);

const CatalogoComponent = () => {
  const [catalogos, setCatalogos] = useState([]);
  const [companias, setCompanias] = useState([]);
  const [nombreCatalogo, setNombreCatalogo] = useState('');
  const [descripcionCatalogo, setDescripcionCatalogo] = useState('');
  const [disponibilidadCatalogo, setDisponibilidadCatalogo] = useState(true);
  const [imagenCatalogo, setImagenCatalogo] = useState(null);
  const [companiaSeleccionada, setCompaniaSeleccionada] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCatalogo, setSelectedCatalogo] = useState(null);

  const fetchCatalogos = async () => {
    try {
      const response = await fetch(`${apiUrl}/catalogos/activos`);
      if (!response.ok) {
        throw new Error('Error al obtener los catálogos');
      }
      const data = await response.json();
      setCatalogos(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const fetchCompanias = async () => {
    try {
      const response = await fetch(`${apiUrl}/Compania`);
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
  const { makeRequest } = useApiRequest();

  const crearCatalogo = async () => {
    if (!nombreCatalogo || !companiaSeleccionada) {
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
  
    const catalogoData = {
      nombreCatalogo,
      descripcionCatalogo,
      disponibilidadCatalogo,
      compania: companiaSeleccionada,
      imagen: imagenCatalogo
    };
  
    await makeRequest({
      url: `${apiUrl}/catalogos`,
      method: 'POST',
      data: catalogoData,
      confirm: {
        title: 'Crear nuevo catálogo',
        text: '¿Estás seguro de que deseas crear este catálogo?',
        icon: 'question',
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        reverseButtons: true
      },
      loading: {
        title: 'Procesando...',
        html: 'Estamos creando tu catálogo',
        allowOutsideClick: false
      },
      success: {
        icon: 'success',
        title: '¡Catálogo creado!',
        text: 'El catálogo se ha creado correctamente',
        confirmButtonColor: '#28a745',
        timer: 2000,
        timerProgressBar: true
      },
      error: {
        icon: 'error',
        title: 'Error',
        text: (error) => error.message || 'Ocurrió un error al crear el catálogo',
        confirmButtonColor: '#d33',
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
      },
      onSuccess: () => {
        fetchCatalogos();
        resetForm();
      }
    });
  };
  
  const actualizarCatalogo = async () => {
    if (!editingId || !nombreCatalogo || !companiaSeleccionada) {
      await Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos obligatorios.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
  
    const requestBody = {
      nombreCatalogo,
      descripcionCatalogo: descripcionCatalogo || undefined,
      disponibilidadCatalogo,
      compania: companiaSeleccionada,
      imagen: imagenCatalogo || undefined
    };
  
    Object.keys(requestBody).forEach(key => 
      requestBody[key] === undefined && delete requestBody[key]
    );
  
    await makeRequest({
      url: `${apiUrl}/catalogos/${editingId}`,
      method: 'PUT',
      data: requestBody,
      confirm: {
        title: '¿Confirmar cambios?',
        text: '¿Estás seguro de que deseas actualizar este catálogo?',
        icon: 'question',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      },
      loading: {
        title: 'Actualizando...',
        allowOutsideClick: false
      },
      success: {
        icon: 'success',
        title: '¡Actualizado!',
        text: 'El catálogo ha sido actualizado correctamente.',
        confirmButtonColor: '#3085d6'
      },
      error: {
        icon: 'error',
        title: 'Error',
        text: (error) => error.message || 'Ocurrió un error al actualizar el catálogo',
        confirmButtonColor: '#3085d6'
      },
      onSuccess: () => {
        fetchCatalogos();
        resetForm();
      }
    });
  };
  
  const eliminarCatalogo = async (id) => {
    await makeRequest({
      url: `${apiUrl}/catalogos/${id}/desactivar`,
      method: 'PATCH',
      confirm: {
        title: '¿Estás seguro?',
        text: '¿Estás seguro de que deseas eliminar este catálogo?',
        icon: 'warning',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      },
      success: {
        title: 'Eliminado!',
        text: 'El catálogo ha sido eliminado.',
        icon: 'success'
      },
      error: {
        title: 'Error',
        text: (error) => error.message || 'Ocurrió un error al eliminar el catálogo',
        icon: 'error'
      },
      onSuccess: fetchCatalogos
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "peluches"); 
  
        const response = await fetch("https://api.cloudinary.com/v1_1/peluches/image/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Error al subir la imagen");
        }
  
        const data = await response.json();
        setImagenCatalogo(data.secure_url); 
      } catch (error) {
        console.error(error);
        alert("Error al cargar la imagen");
      }
    }
  };

  const editarCatalogo = (catalogo) => {
    setEditingId(catalogo._id); 
    setNombreCatalogo(catalogo.nombreCatalogo);
    setDescripcionCatalogo(catalogo.descripcionCatalogo || '');
    setDisponibilidadCatalogo(catalogo.disponibilidadCatalogo);
    setCompaniaSeleccionada(catalogo.compania._id || catalogo.compania);
    setImagenCatalogo(catalogo.imagen || null);
  };

  const resetForm = () => {
    setNombreCatalogo('');
    setDescripcionCatalogo('');
    setDisponibilidadCatalogo(true);
    setCompaniaSeleccionada('');
    setImagenCatalogo(null);
    setEditingId(null);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const openDetailsDialog = (catalogo) => {
    setSelectedCatalogo(catalogo);
  };

  const closeDetailsDialog = () => {
    setSelectedCatalogo(null);
  };

  useEffect(() => {
    fetchCatalogos();
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
          {/* Encabezado */}
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
              Gestión de Catálogos
            </Typography>
          </Box>
  
          {/* Formulario */}
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
              {editingId ? '✏️ Editar Catálogo' : '✨ Nuevo Catálogo'}
            </Typography>
  
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editingId ? actualizarCatalogo() : crearCatalogo();
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                type="text"
                placeholder="Nombre del catálogo"
                value={nombreCatalogo}
                onChange={(e) => setNombreCatalogo(e.target.value)}
                fullWidth
                margin="normal"
                required
                variant="outlined"
                label="Nombre del catálogo"
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
                type="text"
                placeholder="Descripción del catálogo"
                value={descripcionCatalogo}
                onChange={(e) => setDescripcionCatalogo(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                label="Descripción del catálogo"
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
  
              <FormControl 
                fullWidth 
                margin="normal" 
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
              >
                <InputLabel>Compañía</InputLabel>
                <Select
                  value={companiaSeleccionada}
                  onChange={(e) => setCompaniaSeleccionada(e.target.value)}
                  label="Compañía"
                >
                  {companias.map((comp) => (
                    <MenuItem key={comp._id} value={comp._id}>
                      {comp.nombreEmpresa}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
  
              <TextField
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={handleImageChange}
                fullWidth
                margin="normal"
                label="Imagen del Catálogo"
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
  
              {imagenCatalogo && (
                <Box mt={2} display="flex" justifyContent="center">
                  <img 
                    src={imagenCatalogo} 
                    alt="Vista previa de imagen" 
                    style={{  
                      width: '180px',
                      height: 'auto',
                      objectFit: "cover", 
                      borderRadius: "12px", 
                      border: "2px solid #f8c8dc", 
                      boxShadow: "0 4px 12px rgba(248, 200, 220, 0.4)",
                    }}  
                  />
                </Box>
              )}
  
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
  
          {/* Lista de Catálogos */}
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
              <ListAlt fontSize="small" /> Lista de Catálogos
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
                    <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Compañía</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {catalogos.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((catalogo) => (
                    <TableRow
                      key={catalogo._id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#fff0f5',
                        },
                      }}
                    >
                      <TableCell>{catalogo.nombreCatalogo}</TableCell>
                      <TableCell>{catalogo.compania?.nombreEmpresa || 'Sin compañía'}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => editarCatalogo(catalogo)}
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
                          onClick={() => eliminarCatalogo(catalogo._id)}
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
                          onClick={() => openDetailsDialog(catalogo)}
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
              count={catalogos.length}
              rowsPerPage={rowsPerPage}
              page={currentPage}
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
        </Container>
      </Box>
  
      {/* Diálogo de detalles */}
      {selectedCatalogo && (
        <Dialog
          open={true}
          onClose={closeDetailsDialog}
          PaperProps={{
            sx: {
              borderRadius: '20px',
              backgroundColor: '#fff5f7',
              border: '1px solid #f8c8dc',
              maxWidth: '500px',
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
            Detalles del Catálogo
          </DialogTitle>
          <DialogContent>
            <Box sx={{ p: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong style={{color: '#b04e6f'}}>Nombre:</strong> {selectedCatalogo.nombreCatalogo}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong style={{color: '#b04e6f'}}>Compañía:</strong> {selectedCatalogo.compania?.nombreEmpresa || 'Sin compañía'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong style={{color: '#b04e6f'}}>Descripción:</strong> {selectedCatalogo.descripcionCatalogo || 'Sin descripción'}
              </Typography>
              
              {selectedCatalogo.imagen && (
                <Box mt={2} display="flex" justifyContent="center">
                  <img 
                    src={selectedCatalogo.imagen} 
                    alt="Imagen del catálogo" 
                    style={{  
                      width: '100%',
                      maxHeight: '300px',
                      objectFit: "contain", 
                      borderRadius: "12px", 
                      border: "2px solid #f8c8dc", 
                      boxShadow: "0 4px 12px rgba(248, 200, 220, 0.4)",
                    }}  
                  />
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              backgroundColor: '#ffeef3',
              borderTop: '1px solid #f8c8dc',
            }}
          >
            <Button
              onClick={closeDetailsDialog}
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
    </Box>
  );
};

export default CatalogoComponent;