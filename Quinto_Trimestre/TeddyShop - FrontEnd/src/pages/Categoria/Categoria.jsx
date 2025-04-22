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
console.log("Url almacenada: ", apiUrl);


const CategoriaComponent = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCategoria, setSelectedCategoria] = useState(null);


  const fetchProductos = async () => {
    try {
      const response = await fetch(`${apiUrl}/producto`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const { makeRequest } = useApiRequest();

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${apiUrl}/categorias`);
      if (!response.ok) throw new Error('Error al obtener las categorías');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const resetForm = () => {
    setNombreCategoria('');
    setDescripcionCategoria('');
    setEditingId(null);
  };

  const crearCategoria = async () => {
    if (!nombreCategoria || !descripcionCategoria) {
      return Swal.fire('Campos incompletos', 'Completa todos los campos.', 'warning');
    }

    await makeRequest({
      url: `${apiUrl}/categorias`,
      method: 'POST',
      data: { nombreCategoria, descripcionCategoria },
      confirm: {
        title: 'Crear categoría',
        text: '¿Deseas crear esta categoría?',
      },
      loading: {
        title: 'Creando categoría...',
        html: 'Procesando solicitud',
      },
      success: {
        title: '¡Categoría creada!',
        text: 'La categoría se ha guardado correctamente.',
      },
      onSuccess: () => {
        fetchCategorias();
        resetForm();
      },
    });
  };

  const actualizarCategoria = async () => {
    if (!nombreCategoria || !descripcionCategoria) {
      return Swal.fire('Campos incompletos', 'Completa todos los campos.', 'warning');
    }

    await makeRequest({
      url: `${apiUrl}/categorias/${editingId}`,
      method: 'PUT',
      data: { nombreCategoria, descripcionCategoria },
      confirm: {
        title: 'Actualizar categoría',
        text: '¿Deseas actualizar esta categoría?',
      },
      loading: {
        title: 'Actualizando...',
        html: 'Estamos actualizando la categoría.',
      },
      success: {
        title: '¡Categoría actualizada!',
        text: 'Se actualizó correctamente.',
      },
      onSuccess: () => {
        fetchCategorias();
        resetForm();
      },
      error: {
        title: 'Error al actualizar',
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>',
      },
    });
  };

  const eliminarCategoria = async (id) => {
    await makeRequest({
      url: `${apiUrl}/categorias/${id}`,
      method: 'DELETE',
      confirm: {
        title: '¿Eliminar categoría?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      },
      loading: {
        title: 'Eliminando...',
        html: 'Estamos eliminando la categoría.',
      },
      success: {
        title: '¡Categoría eliminada!',
        text: 'La categoría ha sido eliminada correctamente.',
      },
      onSuccess: () => {
        fetchCategorias();
      },
      error: {
        title: 'Error al eliminar',
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>',
      },
    });
  };

  const editarCategoria = (categoria) => {
    setEditingId(categoria._id);
    setNombreCategoria(categoria.nombreCategoria);
    setDescripcionCategoria(categoria.descripcionCategoria);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  useEffect(() => {
    fetchCategorias();
    fetchProductos();
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
              Gestión de Categorías
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
              {editingId ? '✏️ Editar Categoría' : '✨ Nueva Categoría'}
            </Typography>
  
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editingId ? actualizarCategoria() : crearCategoria();
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                type="text"
                placeholder="Nombre de la categoría"
                value={nombreCategoria}
                onChange={(e) => setNombreCategoria(e.target.value)}
                fullWidth
                margin="normal"
                required
                variant="outlined"
                label="Nombre de la categoría"
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
                placeholder="Descripción de la categoría"
                value={descripcionCategoria}
                onChange={(e) => setDescripcionCategoria(e.target.value)}
                fullWidth
                margin="normal"
                required
                variant="outlined"
                label="Descripción de la categoría"
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
                {!editingId ? (
                  <Button
                    variant="contained"
                    onClick={crearCategoria}
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
                    Crear Categoría
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={actualizarCategoria}
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
                    Actualizar Categoría
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
              <ListAlt fontSize="small" /> Lista de Categorías
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
                    <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categorias.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((categoria) => (
                    <TableRow
                      key={categoria._id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#fff0f5',
                        },
                      }}
                    >
                      <TableCell>{categoria.nombreCategoria}</TableCell>
                      <TableCell>{categoria.descripcionCategoria}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => editarCategoria(categoria)}
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
                          onClick={() => eliminarCategoria(categoria._id)}
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
  
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={categorias.length}
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
    </Box>
  );
};

export default CategoriaComponent;
