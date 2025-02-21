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
  FormControl,
  InputLabel,
  MenuItem,
  Dialog,
  Select,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
  Alert,
  Box,
  TablePagination,
  Switch
} from "@mui/material";
import { Edit, Delete, ArrowUpward, ArrowDownward, Info } from "@mui/icons-material";
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({ email: '', telefono: '', contraseña: '', username: '', roles: [], estado: true });
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
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${apiUrl}/usuario`);
      const data = await response.json();
      setUsuarios(data);
      setFilteredUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
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

  const crearUsuario = async () => {
    if (!usuario.email || !usuario.telefono || !usuario.contraseña || !usuario.username) {
      alert('Por favor, completa todos los campos del usuario.');
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/usuario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...usuario,
          roles: Array.isArray(usuario.roles) ? usuario.roles.map(id => id) : []
          
        }),
      }); 

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error:', errorText);
        throw new Error('Error al crear el usuario');
      }
      fetchUsuarios();
      resetUsuarioForm();
      setSnackbarMessage("Usuario creado");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
};

const actualizarUsuario = async () => {
    if (!usuario.email || !usuario.telefono || !usuario.contraseña || !usuario.username) {
      alert('Por favor, completa todos los campos del usuario.');
      return;
    }
    try {

      const rolesToSend = Array.isArray(usuario.roles) 
      ? usuario.roles.map(role => typeof role === 'object' ? role._id : role) 
      : [];

      const response = await fetch(`${apiUrl}/usuario/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: usuario.email,
          telefono: usuario.telefono,
          contraseña: usuario.contraseña,
          username: usuario.username,
          estado: usuario.estado,
           roles: rolesToSend
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error:', errorText);
        throw new Error('Error al actualizar el usuario');
      } 
      fetchUsuarios();
      resetUsuarioForm();
      setSnackbarMessage("Usuario actualizado");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
};

const eliminarUsuario = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/usuario/${id}`, { method: 'DELETE' });

    if (response.ok) {
      fetchUsuarios();
      setOpenDeleteDialog(false);
      setSnackbarMessage("Usuario eliminado");
      setOpenSnackbar(true);
    }
  } catch (error) {
    console.error('Error deleting usuario:', error);
    setSnackbarMessage("Error al eliminar el usuario");
    setOpenSnackbar(true);
  }
};

const resetUsuarioForm = () => {
setUsuario({ email: '', telefono: '', contraseña: '', username: '', roles: [], estado: true });

  setEditingId(null);
};
const mostrarMensaje = (mensaje) => {
  setSnackbarMessage(mensaje);
 setOpenSnackbar(true);
};

   const handleInputChange = (e) => setUsuario({ ...usuario, [e.target.name]: e.target.value });
   const handleToggleActivo = (e) => setUsuario({ ...usuario, estado: e.target.checked });
   const handleEditClick = (usuario) => { setUsuario({ ...usuario, roles: usuario.roles.map(role => role._id)  }); setEditingId(usuario._id); };
   const handleChangeRoles = (event) => {
    setUsuario({ ...usuario, roles: event.target.value });
  };
   const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setEditingId(null);
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
          width: "90%", 
          padding: "50px", 
          borderRadius: "30px", 
        }}>
        <Container>
          <h1>Gestión de Usuarios</h1>

          <form noValidate autoComplete="off">
            <TextField label="Email" name="email" value={usuario.email} onChange={handleInputChange} fullWidth margin="normal" required />
            <TextField label="Teléfono" name="telefono" value={usuario.telefono} onChange={handleInputChange} fullWidth margin="normal" />
            <TextField label="Contraseña" name="contraseña" value={usuario.contraseña} onChange={handleInputChange} fullWidth margin="normal" type="password" required />
            <TextField label="Nombre de usuario" name="username" value={usuario.username} onChange={handleInputChange} fullWidth margin="normal" required />
            <FormControl fullWidth margin="normal">
            <InputLabel>Roles</InputLabel>
            <Select multiple value={usuario.roles} onChange={handleChangeRoles}>
            {roles.map((rol) => (
              <MenuItem key={rol._id} value={rol._id}>
                {rol.nombre}
              </MenuItem>
            ))}
          </Select>
          </FormControl>

            <Box display="flex" alignItems="center" mt={2}>
              <Switch checked={usuario.estado} onChange={handleToggleActivo} />
              <span>{usuario.estado ? "Activo" : "Inactivo"}</span>
            </Box>
          </form>
            <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 2  }}>
             {!editingId ? (
           <Button
           variant="contained"
           color="primary"
           onClick={crearUsuario}
         >
          Crear Usuario
          </Button>
       ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={actualizarUsuario}
        >
          Actualizar Usuario
        </Button>
      )}
          <Button variant="outlined" color="secondary" onClick={resetUsuarioForm}>
            Cancelar
          </Button>
        </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
            <h2>Usuarios</h2>
            <TextField label="Buscar por nombre de usuario" variant="outlined" size="small" value={searchTerm} onChange={handleSearchChange} style={{ width: 250 }} />
          </Box>
          
          <TableContainer component={Paper} style={{ marginTop: 20, maxHeight: 500, overflowY: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort("username")}>
                      Nombre de Usuario
                      {sortBy === "username" && (sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Roles</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((usuario) => (
                  <TableRow key={usuario._id}>
                    <TableCell>{usuario.username}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>
                    {usuario.roles && usuario.roles.length > 0
                      ? usuario.roles.map((rol) => rol.nombre).join(", ")
                      : "Sin roles"}
                   </TableCell>
                    <TableCell>{usuario.estado ? "Activo" : "Inactivo"}</TableCell>

                    <TableCell>
                      <IconButton 
                      color="info"
                      onClick={() => handleOpenDetailDialog(usuario)}>
                        <Info />
                      </IconButton>
                      <IconButton
                      color="primary" 
                      onClick={() => handleEditClick(usuario)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        sx={{ color: "#d33" }}
                       onClick={() => eliminarUsuario(usuario._id)}>
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
            count={filteredUsuarios.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Eliminar Usuario</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas eliminar este usuario?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
              <Button onClick={eliminarUsuario} color="error">Eliminar</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog}>
            <DialogTitle>Detalles de Usuario</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <strong>Nombre de usuario:</strong> {selectedUsuario?.username}<br />
                <strong>Teléfono:</strong> {selectedUsuario?.telefono}<br />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailDialog}>Cerrar</Button>
            </DialogActions>
          </Dialog>

          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </Box>
  );
};

export default Usuarios;
