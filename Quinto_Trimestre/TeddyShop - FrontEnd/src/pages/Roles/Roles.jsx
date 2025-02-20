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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Box,
  Select,
  MenuItem,
  FormControl,
  TablePagination
} from "@mui/material";
import { Edit, Delete, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [role, setRole] = useState({ nombre: "", estado: true });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Set maximum rows per page
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nombre");
  const [sortOrder, setSortOrder] = useState("asc");

  const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    return token;
  };

  const token = getAuthToken();

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${apiUrl}/roles`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Añadir el token al encabezado
      },
    });
      const data = await response.json();
      setRoles(data);
      setFilteredRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setSnackbarMessage("Error al obtener los roles");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleInputChange = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value });
  };

  const handleEstadoChange = (event) => {
    setRole({ ...role, estado: event.target.value });
  };

  const handleSaveRole = async () => {
    const url = isEditing ? `${apiUrl}/roles/${currentId}` : `${apiUrl}/roles`;
    const method = isEditing ? 'PUT' : 'POST';
    const token = getAuthToken();  // Obtener el token
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Añadir el token al encabezado
        },
        body: JSON.stringify(role),
      });
  
      if (response.ok) {
        fetchRoles();
        setRole({ nombre: '', estado: true });
        setIsEditing(false);
        setCurrentId(null);
        setSnackbarMessage(isEditing ? "Rol actualizado" : "Rol creado");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error(isEditing ? 'Error updating role:' : 'Error creating role:', error);
      setSnackbarMessage("Error al guardar el rol");
      setOpenSnackbar(true);
    }
  };

  const handleEditClick = (role) => {
    setRole({ nombre: role.nombre, estado: role.estado });
    setIsEditing(true);
    setCurrentId(role._id);
  };

  const handleDeleteClick = (id) => {
    setCurrentId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteRole = async () => {
    const token = getAuthToken();  // Obtener el token
  
    try {
      const response = await fetch(`${apiUrl}/roles/${currentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,  // Añadir el token al encabezado
        },
      });
  
      if (response.ok) {
        fetchRoles();
        setOpenDeleteDialog(false);
        setSnackbarMessage("Rol eliminado");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error deleting role:', error);
      setSnackbarMessage("Error al eliminar el rol");
      setOpenSnackbar(true);
    }
  };
  

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentId(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
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
      <Box className="Box"
        sx={{ 
          width: "90%", 
          maxWidth: "100%", 
          padding: { xs: "20px", md: "50px" }, 
          borderRadius: "30px", 
        }}>
        <Container>
          <h1>Gestión de Roles</h1>
          <form noValidate autoComplete="off">
            <TextField label="Nombre del Rol" name="nombre" value={role.nombre} onChange={handleInputChange} fullWidth margin="normal" required />
            <FormControl fullWidth margin="normal">
              <p>Estado</p>
              <Select name="estado" value={role.estado} onChange={handleEstadoChange}>
                <MenuItem value={true}>Activo</MenuItem>
                <MenuItem value={false}>Inactivo</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleSaveRole} style={{ marginTop: 16 }}>{isEditing ? "Actualizar Rol" : "Crear Rol"}</Button>
          </form>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
            <h2>Roles</h2>
            <TextField label="Buscar por nombre" variant="outlined" size="small" value={searchTerm} onChange={handleSearchChange} style={{ width: 250 }} />
          </Box>

          <TableContainer component={Paper} style={{ marginTop: 20, maxHeight: 500, overflowY: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort("nombre")}>
                      Nombre
                      {sortBy === "nombre" && (sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort("estado")}>
                      Estado
                      {sortBy === "estado" && (sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRoles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r) => (
                  <TableRow key={r._id}>
                    <TableCell>{r.nombre}</TableCell>
                    <TableCell>{r.estado ? "Activo" : "Inactivo"}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(r)}><Edit /></IconButton>
                      <IconButton onClick={() => handleDeleteClick(r._id)}><Delete /></IconButton>
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
        </Container>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">{snackbarMessage}</Alert>
      </Snackbar>

      {/* Delete confirmation dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>¿Estás seguro de que quieres eliminar este rol?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">Cancelar</Button>
          <Button onClick={handleDeleteRole} color="secondary">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Roles;
