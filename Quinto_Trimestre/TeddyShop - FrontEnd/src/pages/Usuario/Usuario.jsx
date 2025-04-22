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
import { Edit, Delete, ArrowUpward, ArrowDownward, Info, AddCircle, Save, Cancel, Add, Clear, Search, SentimentDissatisfied   } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
import Swal from 'sweetalert2';
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);
import useApiRequest from '../../hooks/useApiRequest';


const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({ email: '', contraseña: '', username: '', roles: [], empleados: [], estado: true });
  const [roles, setRoles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);


  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
    fetchEmpleados();
  }, []);

  const { makeRequest } = useApiRequest();

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${apiUrl}/usuario`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en la respuesta del servidor:", response.status, errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      setUsuarios(data);
      setFilteredUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setSnackbarMessage(`Error al obtener usuarios: ${error.message}`);
      setOpenSnackbar(true);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${apiUrl}/roles`);
      if (!response.ok) {
        throw new Error('Error al obtener los roles');
      } 
      const data = await response.json();
      setRoles(data);
      
    } catch (error) {
      console.error('Error fetching roles:', error);
      setSnackbarMessage("Error al obtener los roles");
      setOpenSnackbar(true);
    }
  };

  const fetchEmpleados = async () => {
    try {
      const response = await fetch(`${apiUrl}/empleado`);
      if (!response.ok) {
        throw new Error('Error al obtener los empleados');
      }
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error(error);
      setSnackbarMessage(error.message);
    }
  };

const crearUsuario = async () => {
  if (!usuario.email || !usuario.contraseña || !usuario.username) {
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

  const usuarioData = {
    ...usuario,
    roles: Array.isArray(usuario.roles) ? usuario.roles.map(id => id) : [],
    empleados: Array.isArray(usuario.empleados) ? usuario.empleados.map(id => id) : []
  };

  await makeRequest({
    url: `${apiUrl}/usuario`,
    method: 'POST',
    data: usuarioData,
    confirm: {
      title: 'Crear nuevo usuario',
      text: '¿Estás seguro de que deseas crear este usuario?',
      icon: 'question',
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    },
    loading: {
      title: 'Procesando...',
      html: 'Estamos creando el usuario',
      allowOutsideClick: false
    },
    success: {
      icon: 'success',
      title: '¡Usuario creado!',
      text: 'El usuario se ha registrado correctamente',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      icon: 'error',
      title: 'Error al crear usuario',
      html: (error) => `<div style="text-align:left;">
        <p>${error.message}</p>
        <small>Verifica los datos e intenta nuevamente</small>
      </div>`,
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: () => {
      fetchUsuarios();
      resetUsuarioForm();
    }
  });
};

const actualizarUsuario = async () => {
  if (!usuario.email || !usuario.contraseña || !usuario.username) {
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

  const usuarioData = {
    email: usuario.email,
    contraseña: usuario.contraseña,
    username: usuario.username,
    estado: usuario.estado,
    roles: Array.isArray(usuario.roles) 
      ? usuario.roles.map(role => typeof role === 'object' ? role._id : role) 
      : [],
    empleados: Array.isArray(usuario.empleados) 
      ? usuario.empleados.map(empleado => typeof empleado === 'object' ? empleado._id : empleado) 
      : []
  };

  await makeRequest({
    url: `${apiUrl}/usuario/${editingId}`,
    method: 'PUT',
    data: usuarioData,
    confirm: {
      title: 'Actualizar usuario',
      text: '¿Estás seguro de que deseas actualizar este usuario?',
      icon: 'question',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    },
    loading: {
      title: 'Procesando...',
      html: 'Estamos actualizando el usuario',
      allowOutsideClick: false
    },
    success: {
      icon: 'success',
      title: '¡Usuario actualizado!',
      text: 'El usuario se ha actualizado correctamente',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      icon: 'error',
      title: 'Error al actualizar usuario',
      text: (error) => error.message || 'Ocurrió un error al actualizar el usuario',
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: () => {
      fetchUsuarios();
      resetUsuarioForm();
    }
  });
};

const eliminarUsuario = async (id) => {
  await makeRequest({
    url: `${apiUrl}/usuario/${id}`,
    method: 'DELETE',
    confirm: {
      title: 'Eliminar usuario',
      text: '¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer',
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
      html: 'Estamos eliminando el usuario',
      allowOutsideClick: false
    },
    success: {
      icon: 'success',
      title: '¡Usuario eliminado!',
      text: 'El usuario se ha eliminado correctamente',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      icon: 'error',
      title: 'Error al eliminar usuario',
      text: (error) => error.message || 'Ocurrió un problema al eliminar el usuario',
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: () => {
      fetchUsuarios();
    }
  });
};

const resetUsuarioForm = () => {
setUsuario({ email: '', contraseña: '', username: '', roles: [], empleados: [], estado: true });

  setEditingId(null);
};


   const handleInputChange = (e) => setUsuario({ ...usuario, [e.target.name]: e.target.value });
   const handleToggleActivo = (e) => setUsuario({ ...usuario, estado: e.target.checked });
   const handleEditClick = (usuario) => { 
    setUsuario({ 
      ...usuario, 
      roles: Array.isArray(usuario.roles) ? usuario.roles.map(role => role._id) : [], 
      empleados: Array.isArray(usuario.empleados) ? usuario.empleados.map(empleado => empleado._id) : []  
    }); 
    setEditingId(usuario._id); 
  };
   const handleChangeRoles = (event) => {
    setUsuario({ ...usuario, roles: event.target.value });
  };
  const handleChangeEmpleados = (event) => {
    setUsuario({ ...usuario, empleados: event.target.value });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
  };

  const handleOpenDetailDialog = (usuario) => {
    setSelectedUsuario(usuario);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedUsuario(null);
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
    setFilteredUsuarios(
      usuarios.filter((usuario) =>
        usuario.username.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (field) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortBy(field);
    setFilteredUsuarios(
      [...filteredUsuarios].sort((a, b) => {
        if (a[field] < b[field]) return newSortOrder === "asc" ? -1 : 1;
        if (a[field] > b[field]) return newSortOrder === "asc" ? 1 : -1;
        return 0;
      })
    );
  };
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
              Gestión de Usuarios
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
              {editingId ? '✏️ Editar Usuario' : '✨ Nuevo Usuario'}
            </Typography>
  
            <TextField
              label="Email"
              name="email"
              value={usuario.email}
              onChange={handleInputChange}
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
            />
  
            <TextField
              label="Contraseña"
              name="contraseña"
              value={usuario.contraseña}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              type="password"
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
  
            <TextField
              label="Nombre de usuario"
              name="username"
              value={usuario.username}
              onChange={handleInputChange}
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
            />
  
            <FormControl fullWidth margin="normal"
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
              <InputLabel>Roles</InputLabel>
              <Select 
                multiple 
                value={usuario.roles || []} 
                onChange={handleChangeRoles}
              >
                {roles.map((rol) => (
                  <MenuItem key={rol._id} value={rol._id}>
                    {rol.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <FormControl fullWidth margin="normal"
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
              <InputLabel>Empleados</InputLabel>
              <Select 
                multiple 
                value={usuario.empleados || []} 
                onChange={handleChangeEmpleados}
              >
                {empleados.map((empleado) => (
                  <MenuItem key={empleado._id} value={empleado._id}>
                    {empleado.nombreEmpleado}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <Box display="flex" alignItems="center" mt={2}
              sx={{
                color: '#b04e6f',
              }}
            >
              <Switch 
                checked={usuario.estado} 
                onChange={handleToggleActivo}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#f48fb1',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#f48fb1',
                  },
                }}
              />
              <span>{usuario.estado ? "Activo" : "Inactivo"}</span>
            </Box>
  
            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              {!editingId ? (
                <Button
                  variant="contained"
                  onClick={crearUsuario}
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
                  Crear Usuario
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={actualizarUsuario}
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
                  Actualizar Usuario
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={resetUsuarioForm}
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
              <Search fontSize="small" /> Lista de Usuarios
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
                label="Buscar usuario"
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
              maxHeight: 500,
              overflowX: 'auto',

            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#ffeef3' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      onClick={() => handleSort('username')}
                      sx={{ cursor: 'pointer' }}
                    >
                      Nombre de Usuario
                      {sortBy === 'username' &&
                        (sortOrder === 'asc' ? (
                          <ArrowUpward fontSize="small" />
                        ) : (
                          <ArrowDownward fontSize="small" />
                        ))}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(filteredUsuarios) &&
                  filteredUsuarios
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((usuario) => (
                      <TableRow
                        key={usuario._id}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#fff0f5',
                          },
                        }}
                      >
                        <TableCell>{usuario.username}</TableCell>
                        <TableCell>{usuario.email}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleOpenDetailDialog(usuario)}
                            sx={{
                              color: '#9c27b0',
                              '&:hover': {
                                backgroundColor: 'rgba(156, 39, 176, 0.1)',
                              },
                            }}
                          >
                            <Info />
                          </IconButton>
                          <IconButton
                            onClick={() => handleEditClick(usuario)}
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
                            onClick={() => eliminarUsuario(usuario._id)}
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
            count={filteredUsuarios?.length ?? 0}
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
            open={openDetailDialog} 
            onClose={handleCloseDetailDialog}
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
              Detalles de Usuario
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ color: '#666' }}>
                <strong style={{color: '#b04e6f'}}>Empleado asociado:</strong>{" "}
                {selectedUsuario?.empleados && selectedUsuario.empleados.length > 0
                  ? selectedUsuario.empleados.map((empleado) => empleado.nombreEmpleado).join(", ")
                  : "Sin Empleado"}
                <br />
                <strong style={{color: '#b04e6f'}}>Rol Asociado:</strong>{" "}
                {selectedUsuario?.roles && selectedUsuario.roles.length > 0
                  ? selectedUsuario.roles.map((rol) => rol.nombre).join(", ")
                  : "Sin roles"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseDetailDialog}
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
              severity="success"
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

  
export default Usuarios;



