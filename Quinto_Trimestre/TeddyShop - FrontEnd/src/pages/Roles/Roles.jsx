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
  Alert 
} from '@mui/material';
import { Edit, Delete, ArrowUpward, ArrowDownward, Info, AddCircle, Save, Cancel, Add, Clear, Search, SentimentDissatisfied   } from '@mui/icons-material';
import '../PagesStyle.css';
import Swal from 'sweetalert2';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);
import useApiRequest from '../../hooks/useApiRequest';


const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [role, setRole] = useState({ nombre: "", estado: true });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nombre");
  const [sortOrder, setSortOrder] = useState("asc");
  const { makeRequest } = useApiRequest();
  
  

  const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    return token;
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${apiUrl}/roles`);
      if (!response.ok) {
        throw new Error('Error al obtener los roles');
      } 
      const data = await response.json();
      setRoles(data);
      setFilteredRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setSnackbarMessage("Error al obtener los roles");
      setOpenSnackbar(true);
    }
  };

const crearRol = async () => {
  if (!role.nombre) {
    await Swal.fire({
      icon: 'error',
      title: 'Campo incompleto',
      text: 'Por favor, ingresa el nombre del rol',
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
    url: `${apiUrl}/roles`,
    method: 'POST',
    data: role,
    confirm: {
      title: 'Crear nuevo rol',
      text: '¿Estás seguro de que deseas crear este rol?',
      icon: 'question',
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar'
    },
    loading: {
      title: 'Procesando...',
      html: 'Estamos creando el rol'
    },
    success: {
      title: '¡Rol creado!',
      text: 'El rol se ha creado correctamente',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      title: 'Error',
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: () => {
      fetchRoles();
      setRole({ nombre: '', estado: true });
    }
  });
};

const actualizarRol = async () => {
  if (!currentId) return;

  await makeRequest({
    url: `${apiUrl}/roles/${currentId}`,
    method: 'PUT',
    data: role,
    confirm: {
      title: 'Actualizar rol',
      text: '¿Estás seguro de que deseas actualizar este rol?',
      icon: 'question',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    },
    loading: {
      title: 'Procesando...',
      html: 'Estamos actualizando el rol'
    },
    success: {
      title: '¡Rol actualizado!',
      text: 'El rol se ha actualizado correctamente',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      title: 'Error',
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: () => {
      fetchRoles();
      setRole({ nombre: '', estado: true });
      setIsEditing(false);
      setCurrentId(null);
    }
  });
};

const EliminarRol = async (id) => {
  await makeRequest({
    url: `${apiUrl}/roles/${id}`,
    method: 'DELETE',
    confirm: {
      title: 'Eliminar rol',
      text: '¿Estás seguro de que deseas eliminar este rol? Esta acción no se puede deshacer',
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
      html: 'Estamos eliminando el rol'
    },
    success: {
      title: '¡Rol eliminado!',
      text: 'El rol se ha eliminado correctamente',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      title: 'Error',
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: fetchRoles
  });
};

  const resetRoleForm = () => {
    setRole({ nombre: "", estado: true });
    setIsEditing(false);
    setCurrentId(null);
  };
  
  const handleSaveRole = () => {
    isEditing ? actualizarRol() : crearRol();
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setRole(prevRole => ({
      ...prevRole,
      [name]: name === "estado" ? Boolean(value) : value  
    }));
  };
  
    const handleEstadoChange = (event) => {
      setRole({ ...role, estado: Boolean(event.target.checked) });
    };

  const handleEditClick = (role) => {
    setRole({ nombre: role.nombre, estado: role.estado });
    setIsEditing(true);
    setCurrentId(role._id);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setFilteredRoles(
      roles.filter((role) =>
        role.nombre.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (field) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortBy(field);
    setFilteredRoles(
      [...filteredRoles].sort((a, b) => {
        if (a[field] < b[field]) return newSortOrder === "asc" ? -1 : 1;
        if (a[field] > b[field]) return newSortOrder === "asc" ? 1 : -1;
        return 0;
      })
    );
  };
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
              Gestión de Roles
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
              {isEditing ? '✏️ Editar Rol' : '✨ Nuevo Rol'}
            </Typography>
  
            <TextField
              label="Nombre del Rol"
              name="nombre"
              value={role.nombre}
              onChange={handleInputChange}
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
  
            <FormControlLabel
              control={<Switch checked={role.estado} onChange={handleEstadoChange} />}
              label={role.estado ? 'Activo' : 'Inactivo'}
              sx={{
                color: '#b04e6f',
                fontWeight: 'bold',
                marginTop: '10px',
              }}
            />
  
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="contained"
                onClick={handleSaveRole}
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
                {isEditing ? 'Actualizar Rol' : 'Crear Rol'}
              </Button>
              <Button
                variant="outlined"
                onClick={resetRoleForm}
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
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography
                variant="h6"
                sx={{
                  color: '#b04e6f',
                  fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                }}
              >
                Lista de Roles
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
                        onClick={() => handleSort('nombre')}
                        sx={{ cursor: 'pointer' }}
                      >
                        Nombre
                        {sortBy === 'nombre' &&
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
                  {filteredRoles
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((r) => (
                      <TableRow
                        key={r._id}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#fff0f5',
                          },
                        }}
                      >
                        <TableCell>{r.nombre}</TableCell>
                         <TableCell>
                        <Chip 
                          label={r.estado ? 'Activo' : 'Inactivo'} 
                          sx={{
                            backgroundColor: r.estado ? '#e8f5e9' : '#ffebee',
                            color: r.estado ? '#2e7d32' : '#c62828',
                            fontWeight: 'bold'
                          }}
                        />
                      </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleEditClick(r)}
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
                            onClick={() => EliminarRol(r._id)}
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
              rowsPerPageOptions={[10]}
              component="div"
              count={filteredRoles.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
  
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </Box>
  );
};

export default Roles;
